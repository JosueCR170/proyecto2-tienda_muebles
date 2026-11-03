<script setup>
const POR_PAGINA = 8

const route = useRoute()
const pagina = Number(route.params.pagina || 1)

const { data: productos } = await useAsyncData('catalogo', () => {
  return queryCollection('productos').order('num', 'ASC').all()
})

const totalPaginas = Math.max(1, Math.ceil(productos.value.length / POR_PAGINA))

if (!Number.isInteger(pagina) || pagina < 1 || pagina > totalPaginas) {
  throw createError({ statusCode: 404, statusMessage: 'Página no encontrada', fatal: true })
}

const visibles = computed(() => paginar(productos.value, pagina, POR_PAGINA))

useSeoMeta({ title: pagina > 1 ? `Catálogo (página ${pagina})` : 'Catálogo' })
</script>

<template>
  <div>
    <BreadCrumbs :ruta="[{ texto: 'Inicio', to: '/' }, { texto: 'Catálogo' }]" />
    <h1>Catálogo completo</h1>
    <p class="tenue">
      {{ cuenta(productos.length, 'artículo', 'artículos') }} — página {{ pagina }} de {{ totalPaginas }}
    </p>
    <ListaProductos :productos="visibles" />
    <PaginationView :pagina="pagina" :total="totalPaginas" base="/catalogo" />
  </div>
</template>
