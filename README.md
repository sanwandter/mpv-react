# Planificador de Menú Semanal

MVP de un servicio de planificación de menús integrado a una plataforma de supermercado en línea.

## Metas de Usuario Implementadas

### Meta 1: Planificar menú semanal
**Flujo:**
1. Usuario accede al "Catálogo de Recetas"
2. Explora recetas disponibles con filtros por tipo de comida
3. Selecciona una receta y ve sus detalles (ingredientes, porciones, costo)
4. Añade la receta a un día y horario específico de la semana
5. Repite el proceso para completar su semana

### Meta 2: Identificar ingredientes que ya posee
**Flujo:**
1. Usuario completa su planificador semanal
2. Genera la lista de compras desde "Mi Semana"
3. Ve todos los ingredientes necesarios agrupados por categoría
4. Marca con checkbox los ingredientes que ya tiene en casa
5. El sistema calcula automáticamente qué ingredientes faltan comprar

### Meta 3: Comprar ingredientes faltantes
**Flujo:**
1. Desde la lista de compras, ve los ingredientes marcados como necesarios
2. Añade todos los ingredientes faltantes al carrito con un click
3. Revisa el carrito con resumen de productos y precios
4. Ajusta cantidades si es necesario
5. Finaliza la compra (simulada) con confirmación

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

```

## 📱 Navegación

- **📖 Recetas**: Catálogo de recetas disponibles
- **📅 Mi Semana**: Planificador semanal de comidas
- **📝 Lista de Compras**: Ingredientes necesarios con opción de marcar disponibles
- **🛒 Carrito**: Checkout para comprar ingredientes faltantes
