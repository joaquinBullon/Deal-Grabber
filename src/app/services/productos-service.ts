import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Producto, FiltrosBusqueda } from '../modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  public productos$ = this.productosSubject.asObservable();

  private productosDemo: Producto[] = [
    {
      id: '1',
      nombre: 'Dell XPS 13 Plus',
      procesador: 'Intel Core i7-1360P',
      ram: '16GB',
      almacenamiento: '512GB SSD',
      gpu: 'Intel Iris Xe',
      pantalla: '13.4" QHD+',
      precio: 1099,
      precioOriginal: 1299,
      sitio: 'Dell',
      descuento: 15,
      enlace: 'https://dell.com',
      imagen: '/images/dell-xps-13.svg',
      puntuacion: 4.8,
      resenias: 245,
      disponibilidad: 'En stock',
      especificaciones: {
        bateria: '55 Wh',
        peso: '1.2 kg',
        resolucion: '1920x1200',
        tipoPantalla: 'OLED'
      }
    },
    {
      id: '2',
      nombre: 'ASUS ROG Zephyrus G16',
      procesador: 'Intel Core i9-13980HX',
      ram: '32GB',
      almacenamiento: '1TB SSD',
      gpu: 'NVIDIA RTX 4090',
      pantalla: '16" 240Hz',
      precio: 2499,
      precioOriginal: 2799,
      sitio: 'ASUS',
      descuento: 11,
      enlace: 'https://asus.com',
      imagen: '/images/asus-rog-zephyrus.svg',
      puntuacion: 4.9,
      resenias: 567,
      disponibilidad: 'En stock',
      especificaciones: {
        bateria: '90 Wh',
        peso: '2.1 kg',
        resolucion: '2560x1600',
        refrescamiento: '240Hz',
        tipoPantalla: 'IPS'
      }
    },
    {
      id: '3',
      nombre: 'MacBook Pro 16"',
      procesador: 'Apple M3 Max',
      ram: '18GB',
      almacenamiento: '512GB SSD',
      gpu: 'Apple GPU 40-core',
      pantalla: '16" Liquid Retina XDR',
      precio: 3199,
      precioOriginal: 3499,
      sitio: 'Amazon',
      descuento: 9,
      enlace: 'https://amazon.com',
      imagen: '/images/macbook-pro-16.svg',
      puntuacion: 4.7,
      resenias: 892,
      disponibilidad: 'En stock'
    },
    {
      id: '4',
      nombre: 'Lenovo ThinkPad X1 Carbon',
      procesador: 'Intel Core i7-1365U',
      ram: '16GB',
      almacenamiento: '512GB SSD',
      gpu: 'Intel Iris Xe',
      pantalla: '14" 2.8K',
      precio: 1199,
      precioOriginal: 1499,
      sitio: 'Lenovo',
      descuento: 20,
      enlace: 'https://lenovo.com',
      imagen: '/images/thinkpad-x1.svg',
      puntuacion: 4.6,
      resenias: 340,
      disponibilidad: 'Pocas unidades'
    },
    {
      id: '5',
      nombre: 'HP Spectre x360 16',
      procesador: 'Intel Core i7-13700H',
      ram: '32GB',
      almacenamiento: '1TB SSD',
      gpu: 'NVIDIA RTX 4070',
      pantalla: '16" 4K OLED',
      precio: 1899,
      precioOriginal: 2199,
      sitio: 'HP',
      descuento: 14,
      enlace: 'https://hp.com',
      imagen: '/images/hp-spectre.svg',
      puntuacion: 4.8,
      resenias: 456,
      disponibilidad: 'En stock'
    },
    {
      id: '6',
      nombre: 'BenQ SwiftKey Gaming Laptop',
      procesador: 'AMD Ryzen 9 7950X3D',
      ram: '64GB',
      almacenamiento: '2TB SSD',
      gpu: 'NVIDIA RTX 4080',
      pantalla: '17.3" 144Hz',
      precio: 3299,
      precioOriginal: 3899,
      sitio: 'Newegg',
      descuento: 15,
      enlace: 'https://newegg.com',
      imagen: '/images/benq-swiftkey.svg',
      puntuacion: 4.7,
      resenias: 234,
      disponibilidad: 'En stock'
    }
  ];

  constructor() {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosSubject.next(this.productosDemo);
  }

  buscarProductos(termino: string): Observable<Producto[]> {
    const terminoLower = termino.toLowerCase();
    return of(
      this.productosDemo.filter(p =>
        p.nombre.toLowerCase().includes(terminoLower) ||
        p.procesador.toLowerCase().includes(terminoLower) ||
        p.sitio.toLowerCase().includes(terminoLower)
      )
    ).pipe(delay(300));
  }

  filtrarProductos(filtros: FiltrosBusqueda): Observable<Producto[]> {
    return of(
      this.productosDemo.filter(p => {
        if (filtros.procesador && !p.procesador.toLowerCase().includes(filtros.procesador.toLowerCase())) {
          return false;
        }
        if (filtros.ram && p.ram !== `${filtros.ram}GB`) {
          return false;
        }
        if (filtros.precioMin && p.precio < filtros.precioMin) {
          return false;
        }
        if (filtros.precioMax && p.precio > filtros.precioMax) {
          return false;
        }
        if (filtros.sitio && p.sitio !== filtros.sitio) {
          return false;
        }
        if (filtros.disponibilidad && p.disponibilidad !== filtros.disponibilidad) {
          return false;
        }
        return true;
      })
    ).pipe(delay(300));
  }

  obtenerProductosPorPrecio(orden: 'asc' | 'desc' = 'asc'): Observable<Producto[]> {
    const productos = [...this.productosDemo].sort((a, b) =>
      orden === 'asc' ? a.precio - b.precio : b.precio - a.precio
    );
    return of(productos).pipe(delay(300));
  }

  obtenerProductosPorPuntuacion(): Observable<Producto[]> {
    const productos = [...this.productosDemo].sort((a, b) =>
      (b.puntuacion || 0) - (a.puntuacion || 0)
    );
    return of(productos).pipe(delay(300));
  }

  obtenerProductosConDescuento(): Observable<Producto[]> {
    const productos = this.productosDemo
      .filter(p => p.descuento && p.descuento > 0)
      .sort((a, b) => (b.descuento || 0) - (a.descuento || 0));
    return of(productos).pipe(delay(300));
  }
}
