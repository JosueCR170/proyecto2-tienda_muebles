import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const leerSlugs = (carpeta: string) =>
  readdirSync(fileURLToPath(new URL(`./content/${carpeta}`, import.meta.url)))
    .filter(archivo => archivo.endsWith('.json'))
    .map(archivo => archivo.replace(/\.json$/, ''))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/content'],
  devtools: { enabled: true },
  content: {
    experimental: { sqliteConnector: 'native' }
  },
  runtimeConfig: {
    public: {
      snipcartApiKey: 'OWY1MTEzNjktN2QwNC00YTVmLWJhNGEtMTQ4MzMxODMzOGMwNjM5MjkyNjQ4NDAyNDYyMDA5',
      siteUrl: 'http://localhost:3000',
      commentsRepo: 'JosueCR170/proyecto2-tienda_muebles'
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/categorias',
        '/catalogo',
        '/buscar',
        ...leerSlugs('categorias').map(slug => `/categorias/${slug}`),
        ...leerSlugs('productos').map(slug => `/productos/${slug}`)
      ]
    }
  },
  app: {
    head: {
      titleTemplate: '%s - Casa Nido, muebles y decoración',
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Tienda en línea de muebles y decoración construida con Nuxt Content y Snipcart' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap' },
        { rel: 'stylesheet', href: '/css/estilos.css' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://app.snipcart.com' },
        { rel: 'preconnect', href: 'https://cdn.snipcart.com' }
      ]
    }
  }
})
