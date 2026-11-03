# Proyecto 2 — Casa Nido, tienda de muebles y decoración

EIF-511 Arquitectura de Información, Universidad Nacional — Josué Solórzano (tema 21).

Tienda en línea construida con Nuxt 4 y Nuxt Content, con carrito y pago mediante Snipcart
y comentarios por artículo con Utterances.

## Catálogo

Los datos del sitio son documentos JSON en `content/`:

- `content/categorias/*.json`: 6 categorías (sala, comedor, dormitorio, oficina, iluminación, decoración).
- `content/productos/*.json`: 36 artículos. Cada uno guarda información genérica (nombre,
  descripción, categoría, imagen) y específica (precio, marca, material, color, dimensiones).

Ambas son colecciones de tipo `data` declaradas en `content.config.ts`.

## Páginas

| Ruta | Contenido |
|------|-----------|
| `/` | Portada con las categorías y los artículos destacados |
| `/categorias` | Lista de categorías con su descripción y cantidad de artículos |
| `/categorias/[slug]`, `/categorias/[slug]/2` | Artículos de una categoría, 4 por página |
| `/catalogo`, `/catalogo/2`… | Todos los artículos, 8 por página |
| `/productos/[slug]` | Detalle del artículo, botón de compra, relacionados y comentarios |
| `/buscar?q=` | Resultados de la búsqueda (nombre, descripción, marca, material, color o categoría), paginados |

Cada página de la paginación de categorías y catálogo es una ruta propia, por lo que se
pre-renderiza con `nuxt generate`.

## Comercio electrónico (Snipcart)

- `app/plugins/snipcart.client.ts` carga Snipcart en el navegador y mantiene el contador del carrito.
- `app/components/BotonComprar.vue` es el botón `snipcart-add-item` que aparece en cada tarjeta y en el detalle.
  Su `data-item-url` siempre apunta a la página de detalle para que Snipcart valide el precio.
- El botón `snipcart-checkout` del encabezado abre el carrito.

## Comentarios (Utterances)

`app/components/CommentsUtterances.vue` se muestra en el detalle de cada artículo; cada ruta tiene su
propio issue. El repositorio se configura en `runtimeConfig.public.commentsRepo` (`nuxt.config.ts`):
debe ser público y tener instalada la app [utterances](https://github.com/apps/utterances).

## Ejecución

```bash
npm install
npm run dev
```

Requiere Node 22.5 o superior (Nuxt Content usa el módulo `node:sqlite`).
Copie `.env.example` a `.env` y coloque la clave pública de Snipcart.

## Publicación en Netlify

`netlify.toml` ya define `npm run generate` y el directorio `dist`. En *Site configuration →
Environment variables* defina:

1. `NUXT_PUBLIC_SNIPCART_API_KEY`: clave pública de Snipcart.
2. `NUXT_PUBLIC_SITE_URL`: dirección pública del sitio, p. ej. `https://casa-nido.netlify.app`.

Luego registre ese dominio en el panel de Snipcart (Domains & URLs).
