import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Producto, FiltrosBusqueda } from '../../modelos/producto';
import { ProductosService } from '../../services/productos-service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class InicioComponent implements OnInit {
  productos = signal<Producto[]>([]);
  productosFiltrados = signal<Producto[]>([]);
  busquedaTerm = signal<string>('');
  cargando = signal<boolean>(false);
  mostrarFiltros = signal<boolean>(false);
  ordenamiento = signal<'precio-asc' | 'precio-desc' | 'puntuacion' | 'descuento'>('precio-asc');
  
  filtrosForm!: FormGroup;
  filtrosActivos = signal<FiltrosBusqueda>({});

  // Exponer Math al template
  Math = Math;

  sitiosDisponibles: string[] = ['Amazon', 'Newegg', 'BestBuy', 'Lenovo', 'Dell', 'ASUS', 'HP'];
  procesadoresDisponibles: string[] = ['Intel Core i7', 'Intel Core i9', 'AMD Ryzen', 'Apple M3'];
  ramDisponible: number[] = [8, 16, 32, 64];
  almacenamientoDisponible: number[] = [256, 512, 1024, 2048];

  constructor(
    private productosService: ProductosService,
    private fb: FormBuilder
  ) {
    this.inicializarFormulario();
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  inicializarFormulario(): void {
    this.filtrosForm = this.fb.group({
      procesador: [''],
      ram: [''],
      almacenamiento: [''],
      precioMin: [''],
      precioMax: [''],
      sitio: [''],
      disponibilidad: ['']
    });
  }

  cargarProductos(): void {
    this.cargando.set(true);
    this.productosService.productos$.subscribe(productos => {
      this.productos.set(productos);
      this.productosFiltrados.set(productos);
      this.cargando.set(false);
    });
  }

  buscar(): void {
    const termino = this.busquedaTerm();
    if (termino.trim()) {
      this.cargando.set(true);
      this.productosService.buscarProductos(termino).subscribe(resultado => {
        this.productosFiltrados.set(resultado);
        this.cargando.set(false);
      });
    }
  }

  limpiarBusqueda(): void {
    this.busquedaTerm.set('');
    this.productosFiltrados.set(this.productos());
  }

  aplicarFiltros(): void {
    const filtros: FiltrosBusqueda = {
      procesador: this.filtrosForm.get('procesador')?.value || undefined,
      ram: this.filtrosForm.get('ram')?.value ? parseInt(this.filtrosForm.get('ram')?.value) : undefined,
      almacenamiento: this.filtrosForm.get('almacenamiento')?.value ? parseInt(this.filtrosForm.get('almacenamiento')?.value) : undefined,
      precioMin: this.filtrosForm.get('precioMin')?.value ? parseInt(this.filtrosForm.get('precioMin')?.value) : undefined,
      precioMax: this.filtrosForm.get('precioMax')?.value ? parseInt(this.filtrosForm.get('precioMax')?.value) : undefined,
      sitio: this.filtrosForm.get('sitio')?.value || undefined,
      disponibilidad: this.filtrosForm.get('disponibilidad')?.value || undefined
    };

    this.filtrosActivos.set(filtros);
    this.cargando.set(true);

    this.productosService.filtrarProductos(filtros).subscribe(resultado => {
      this.aplicarOrdenamiento(resultado);
      this.cargando.set(false);
    });
  }

  limpiarFiltros(): void {
    this.filtrosForm.reset();
    this.filtrosActivos.set({});
    this.cargando.set(true);
    this.productosService.productos$.subscribe(productos => {
      this.aplicarOrdenamiento(productos);
      this.cargando.set(false);
    });
  }

  cambiarOrdenamiento(event?: Event): void {
    if (event) {
      const valor = (event.target as any).value as 'precio-asc' | 'precio-desc' | 'puntuacion' | 'descuento';
      this.ordenamiento.set(valor);
    }
    
    const orden = this.ordenamiento();
    this.cargando.set(true);

    let subscripcion;
    if (orden === 'precio-asc') {
      subscripcion = this.productosService.obtenerProductosPorPrecio('asc');
    } else if (orden === 'precio-desc') {
      subscripcion = this.productosService.obtenerProductosPorPrecio('desc');
    } else if (orden === 'puntuacion') {
      subscripcion = this.productosService.obtenerProductosPorPuntuacion();
    } else {
      subscripcion = this.productosService.obtenerProductosConDescuento();
    }

    subscripcion.subscribe(resultado => {
      this.productosFiltrados.set(resultado);
      this.cargando.set(false);
    });
  }

  private aplicarOrdenamiento(productos: Producto[]): void {
    const orden = this.ordenamiento();
    const productosOrdenados = [...productos];

    if (orden === 'precio-asc') {
      productosOrdenados.sort((a, b) => a.precio - b.precio);
    } else if (orden === 'precio-desc') {
      productosOrdenados.sort((a, b) => b.precio - a.precio);
    } else if (orden === 'puntuacion') {
      productosOrdenados.sort((a, b) => (b.puntuacion || 0) - (a.puntuacion || 0));
    } else if (orden === 'descuento') {
      productosOrdenados.sort((a, b) => (b.descuento || 0) - (a.descuento || 0));
    }

    this.productosFiltrados.set(productosOrdenados);
  }

  toggleFiltros(): void {
    this.mostrarFiltros.set(!this.mostrarFiltros());
  }

  obtenerEtiquetaDisponibilidad(disponibilidad: string): string {
    const clases: { [key: string]: string } = {
      'En stock': 'disponible',
      'Pocas unidades': 'pocas',
      'Agotado': 'agotado'
    };
    return clases[disponibilidad] || 'disponible';
  }

  abrirProducto(producto: Producto): void {
    window.open(producto.enlace, '_blank');
  }
}
