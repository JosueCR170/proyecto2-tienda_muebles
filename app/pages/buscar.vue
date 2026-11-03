<script setup>
const POR_PAGINA = 8

const route = useRoute()

useSeoMeta({ title: 'Búsqueda' })

const { data: categorias } = await useCategorias()

const { data: productos } = await useAsyncData('busqueda', () => {
  return queryCollection('productos').order('num', 'ASC').all()
})

const consulta = computed(() => String(route.query.q ?? '').trim())

const resultados = computed(() => {
  const nombres = Object.fromEntries((categorias.value ?? []).map(c => [c.slug, c.nombre]))
  return (productos.value ?? []).filter(p => coincide(p, nombres[p.categoria], consulta.value))
})

const totalPaginas = computed(() => Math.max(1, Math.ceil(resultados.value.length / POR_PAGINA)))
const pagina = computed(() => Math.min(Math.max(1, Number(route.query.pagina) || 1), totalPaginas.value))
const visibles = computed(() => paginar(resultados.value, pagina.value, POR_PAGINA))
</script>

<template>
  <div>
    <BreadCrumbs :ruta="[{ texto: 'Inicio', to: '/' }, { texto: 'Búsqueda' }]" />
    <ClientOnly>
      <template v-if="consulta">
        <h1>Resultados para «{{ consulta }}»</h1>
        <p class="tenue">{{ cuenta(resultados.length, 'artículo encontrado', 'artículos encontrados') }}</p>
        <template v-if="resultados.length">
          <ListaProductos :productos="visibles" />
          <PaginationView :pagina="pagina" :total="totalPaginas" />
        </template>
        <p v-else>
          No hay artículos que coincidan. Pruebe con otra palabra o
          <NuxtLink to="/categorias">explore las categorías</NuxtLink>.
        </p>
      </template>
      <template v-else>
        <h1>Búsqueda</h1>
        <p>Escriba en el buscador de arriba el nombre, material, color o marca de un artículo.</p>
      </template>
      <template #fallback>
        <h1>Búsqueda</h1>
        <p class="tenue">Cargando resultados…</p>
      </template>
    </ClientOnly>
  </div>
</template>
