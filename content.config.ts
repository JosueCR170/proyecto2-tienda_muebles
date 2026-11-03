import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const CATEGORIAS = ['sala', 'comedor', 'dormitorio', 'oficina', 'iluminacion', 'decoracion'] as const

export default defineContentConfig({
  collections: {
    // Un archivo JSON por categoría en content/categorias/
    categorias: defineCollection({
      type: 'data',
      source: 'categorias/**.json',
      schema: z.object({
        slug: z.enum(CATEGORIAS),
        nombre: z.string(),
        descripcion: z.string(),
        imagen: z.string(),
        orden: z.number()
      })
    }),
    // Un archivo JSON por artículo en content/productos/
    productos: defineCollection({
      type: 'data',
      source: 'productos/**.json',
      schema: z.object({
        num: z.number(),
        slug: z.string(),
        nombre: z.string(),
        descripcion: z.string(),
        categoria: z.enum(CATEGORIAS),
        imagen: z.string(),
        precio: z.number(),
        marca: z.string(),
        material: z.string(),
        color: z.string(),
        dimensiones: z.string(),
        destacado: z.boolean()
      })
    })
  }
})
