export interface Producto {
  id: string;
  nombre: string;
  procesador: string;
  ram: string;
  almacenamiento: string;
  gpu?: string;
  pantalla: string;
  precio: number;
  precioOriginal?: number;
  sitio: 'Amazon' | 'Newegg' | 'BestBuy' | 'Lenovo' | 'Dell' | 'ASUS' | 'HP';
  descuento?: number;
  enlace: string;
  imagen: string;
  puntuacion?: number;
  resenias?: number;
  disponibilidad: 'En stock' | 'Agotado' | 'Pocas unidades';
  especificaciones?: {
    bateria?: string;
    peso?: string;
    resolucion?: string;
    refrescamiento?: string;
    tipoPantalla?: string;
  };
}

export interface FiltrosBusqueda {
  procesador?: string;
  ram?: number;
  almacenamiento?: number;
  precioMin?: number;
  precioMax?: number;
  sitio?: string;
  disponibilidad?: string;
}
