<script setup>
const POR_PAGINA = 4

const route = useRoute()
const slug = route.params.slug
const pagina = Number(route.params.pagina || 1)

const { data: categoria } = await useAsyncData(`categoria-${slug}`, () => {
  return queryCollection('categorias').where('slug', '=', slug).first()
})

if (!categoria.value) {
  throw createError({ statusCode: 404, statusMessage: 'Categoría no encontrada', fatal: true })
}

const { data: productos } = await useAsyncData(`productos-${slug}`, () => {
  return queryCollection('productos')
    .where('categoria', '=', slug)
    .order('num', 'ASC')
    .all()
})

const totalPaginas = Math.max(1, Math.ceil(productos.value.length / POR_PAGINA))

if (!Number.isInteger(pagina) || pagina < 1 || pagina > totalPaginas) {
  throw createError({ statusCode: 404, statusMessage: 'Página no encontrada', fatal: true })
}

const visibles = computed(() => paginar(productos.value, pagina, POR_PAGINA))

useSeoMeta({
  title: pagina > 1 ? `${categoria.value.nombre} (página ${pagina})` : categoria.value.nombre,
  description: categoria.value.descripcion
})
</script>

<template>
  <div>
    <BreadCrumbs
      :ruta="[
        { texto: 'Inicio', to: '/' },
        { texto: 'Categorías', to: '/categorias' },
        { texto: categoria.nombre }
      ]"
    />
    <h1>{{ categoria.nombre }}</h1>
    <p>{{ categoria.descripcion }}</p>
    <p class="tenue">
      {{ cuenta(productos.length, 'artículo', 'artículos') }} — página {{ pagina }} de {{ totalPaginas }}
    </p>
    <ListaProductos :productos="visibles" />
    <PaginationView :pagina="pagina" :total="totalPaginas" :base="`/categorias/${slug}`" />
  </div>
</template>
