# 💰 DealGrabber - Comparador de Precios de Ordenadores

Una aplicación web moderna construida con **Angular 19** que permite buscar, filtrar y comparar precios de ordenadores entre varios sitios web.

## 🚀 Características Principales

### ✨ Funcionalidades
- **Búsqueda en tiempo real** - Busca ordenadores por nombre, procesador o marca
- **Filtros avanzados** - Filtra por:
  - Procesador (Intel Core i7/i9, AMD Ryzen, Apple M3)
  - RAM (8GB, 16GB, 32GB, 64GB)
  - Almacenamiento (256GB, 512GB, 1TB, 2TB)
  - Rango de precios (mínimo y máximo)
  - Sitio de venta
  - Disponibilidad (En stock, Pocas unidades, Agotado)

- **Ordenamiento flexible** - Organiza resultados por:
  - 💲 Menor precio
  - 💲 Mayor precio
  - ⭐ Mejor puntuados
  - 🎉 Mayor descuento

### 🎨 Diseño
- Interfaz moderna con gradientes púrpura y azul
- Totalmente responsivo (Mobile, Tablet, Desktop)
- Tarjetas de productos con:
  - Imagen del producto
  - Especificaciones técnicas
  - Puntuación y reseñas
  - Precio y descuento
  - Estado de disponibilidad
  - Sitio de venta

## 📁 Estructura del Proyecto

```
dealgrabber/
├── src/
│   ├── app/
│   │   ├── modelos/
│   │   │   └── producto.ts          # Interfaces de productos y filtros
│   │   ├── services/
│   │   │   └── productos-service.ts # Servicio de gestión de productos
│   │   ├── components/
│   │   │   └── inicio/
│   │   │       ├── inicio.ts        # Componente principal
│   │   │       ├── inicio.html      # Template
│   │   │       └── inicio.css       # Estilos
│   │   ├── app.ts                  # Componente raíz
│   │   ├── app.html                # Template raíz
│   │   ├── app.css                 # Estilos raíz
│   │   └── app.routes.ts           # Rutas de la aplicación
│   └── index.html
├── package.json
└── angular.json
```

## 🛠️ Tecnologías Utilizadas

- **Angular 19** - Framework moderno con Signals
- **TypeScript** - Lenguaje tipado
- **RxJS** - Programación reactiva
- **Reactive Forms** - Gestión de formularios
- **CSS3** - Estilos modernos con gradientes y animaciones

## 🚀 Cómo Ejecutar

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
ng serve

# Abrir en navegador
http://localhost:4200
```

## 📊 Datos de Ejemplo

La aplicación incluye 6 productos de ejemplo con:
- **Dell XPS 13 Plus** - €1,099 (15% descuento)
- **ASUS ROG Zephyrus G16** - €2,499 (11% descuento)
- **MacBook Pro 16"** - €3,199 (9% descuento)
- **Lenovo ThinkPad X1 Carbon** - €1,199 (20% descuento)
- **HP Spectre x360 16** - €1,899 (14% descuento)
- **BenQ SwiftKey Gaming Laptop** - €3,299 (15% descuento)

## 🎯 Próximas Mejoras

- [ ] Integración con APIs reales de tiendas
- [ ] Historial de precios
- [ ] Notificaciones de cambios de precio
- [ ] Exportar comparativas a PDF
- [ ] Sistema de favoritos
- [ ] Login y recomendaciones personalizadas
- [ ] Integración con carritos de compra

## 📝 Licencia

Proyecto educativo - Uso libre para aprender Angular

---

**DealGrabber** - Encuentra los mejores precios de ordenadores 💻✨
