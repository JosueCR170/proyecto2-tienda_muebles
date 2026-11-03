<script setup>
useSeoMeta({ title: 'Inicio' })

const { data: categorias } = await useCategorias()

const { data: destacados } = await useAsyncData('destacados', () => {
  return queryCollection('productos')
    .where('destacado', '=', true)
    .order('num', 'ASC')
    .all()
})
</script>

<template>
  <div>
    <section class="portada">
      <div class="portada-texto">
        <p class="etiqueta">Muebles y decoración</p>
        <h1>Espacios que se sienten como casa</h1>
        <p>
          Muebles de madera, lámparas y accesorios elegidos para cada habitación.
          Explore por categoría, busque lo que necesita y compre en línea.
        </p>
        <div class="acciones">
          <NuxtLink to="/catalogo" class="boton">Ver el catálogo</NuxtLink>
          <NuxtLink to="/categorias" class="boton secundario">Categorías</NuxtLink>
        </div>
      </div>
      <img class="portada-imagen" src="/images/portada.jpg" alt="Sala amueblada con sofá y chimenea">
    </section>

    <div class="titulo-seccion">
      <h2>Categorías</h2>
      <NuxtLink to="/categorias">Ver todas</NuxtLink>
    </div>
    <div class="grilla-categorias">
      <NuxtLink
        v-for="categoria in categorias"
        :key="categoria.slug"
        :to="`/categorias/${categoria.slug}`"
        class="categoria"
      >
        <img :src="categoria.imagen" :alt="categoria.nombre" loading="lazy">
        <span>{{ categoria.nombre }}</span>
      </NuxtLink>
    </div>

    <div class="titulo-seccion">
      <h2>Destacados</h2>
      <NuxtLink to="/catalogo">Ver todo</NuxtLink>
    </div>
    <ListaProductos :productos="destacados" />
  </div>
</template>
