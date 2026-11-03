<script setup>
useSeoMeta({ title: 'Categorías' })

const { data: categorias } = await useCategorias()

const { data: productos } = await useAsyncData('conteo-categorias', () => {
  return queryCollection('productos').select('categoria').all()
})

function total(slug) {
  return (productos.value ?? []).filter(p => p.categoria === slug).length
}
</script>

<template>
  <div>
    <BreadCrumbs :ruta="[{ texto: 'Inicio', to: '/' }, { texto: 'Categorías' }]" />
    <h1>Categorías</h1>
    <div class="lista-categorias">
      <NuxtLink
        v-for="categoria in categorias"
        :key="categoria.slug"
        :to="`/categorias/${categoria.slug}`"
        class="fila-categoria"
      >
        <img :src="categoria.imagen" :alt="categoria.nombre" loading="lazy">
        <div>
          <h3>{{ categoria.nombre }}</h3>
          <p>{{ categoria.descripcion }}</p>
          <p class="tenue">{{ cuenta(total(categoria.slug), 'artículo', 'artículos') }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
