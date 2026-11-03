# Casa Nido — Tienda de muebles y decoración

Proyecto 2 · EIF-511 Arquitectura de Información · Universidad Nacional
Josué Solórzano

**Sitio publicado:** https://casa-nido-tienda-muebles.netlify.app

Tienda en línea hecha con **Nuxt 4** y **Nuxt Content**. El catálogo se genera a partir de
documentos JSON: 36 artículos en 6 categorías (sala, comedor, dormitorio, oficina,
iluminación y decoración).

## Funcionalidades

- **Categorías:** lista de categorías → artículos de la categoría → detalle del artículo.
- **Búsqueda:** por nombre, descripción, marca, material, color o categoría, desde el encabezado.
- **Paginación:** en las categorías y en el catálogo completo.
- **Carrito y pago:** con Snipcart; hay botón de compra en cada artículo y acceso al carrito en el menú.
- **Comentarios:** de los usuarios en cada artículo, con Utterances.

## Ejecución local

```bash
npm install
npm run dev
```

Requiere Node 22.5 o superior. Copie `.env.example` a `.env` y coloque la clave pública de Snipcart.

## Publicación

```bash
npm run generate
```

En Netlify se definen las variables `NUXT_PUBLIC_SNIPCART_API_KEY` y `NUXT_PUBLIC_SITE_URL`.

Las fotografías tienen licencia Creative Commons; los créditos están en `CREDITOS.md`.
