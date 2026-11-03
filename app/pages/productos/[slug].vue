<script setup>
const route = useRoute()
const slug = route.params.slug

const { data: producto } = await useAsyncData(`producto-${slug}`, () => {
  return queryCollection('productos').where('slug', '=', slug).first()
})

if (!producto.value) {
  throw createError({ statusCode: 404, statusMessage: 'Producto no encontrado', fatal: true })
}

const { data: categoria } = await useAsyncData(`producto-${slug}-categoria`, () => {
  return queryCollection('categorias').where('slug', '=', producto.value.categoria).first()
})

const { data: relacionados } = await useAsyncData(`producto-${slug}-relacionados`, () => {
  return queryCollection('productos')
    .where('categoria', '=', producto.value.categoria)
    .where('slug', '<>', slug)
    .order('num', 'ASC')
    .limit(4)
    .all()
})

const { commentsRepo } = useRuntimeConfig().public

useSeoMeta({
  title: producto.value.nombre,
  description: producto.value.descripcion
})
</script>

<template>
  <div>
    <BreadCrumbs
      :ruta="[
        { texto: 'Inicio', to: '/' },
        { texto: 'Categorías', to: '/categorias' },
        { texto: categoria?.nombre, to: `/categorias/${producto.categoria}` },
        { texto: producto.nombre }
      ]"
    />

    <article class="detalle">
      <img class="detalle-imagen" :src="producto.imagen" :alt="producto.nombre">
      <div>
        <p class="tenue">{{ producto.marca }}</p>
        <h1>{{ producto.nombre }}</h1>
        <p class="precio grande">{{ precio(producto.precio) }}</p>
        <p>{{ producto.descripcion }}</p>
        <dl class="ficha">
          <dt>Categoría</dt>
          <dd><NuxtLink :to="`/categorias/${producto.categoria}`">{{ categoria?.nombre }}</NuxtLink></dd>
          <dt>Material</dt>
          <dd>{{ producto.material }}</dd>
          <dt>Color</dt>
          <dd>{{ producto.color }}</dd>
          <dt>Dimensiones</dt>
          <dd>{{ producto.dimensiones }}</dd>
          <dt>Código</dt>
          <dd>CN-{{ String(producto.num).padStart(3, '0') }}</dd>
        </dl>
        <BotonComprar :producto="producto" />
      </div>
    </article>

    <section v-if="relacionados?.length">
      <h2>También en {{ categoria?.nombre }}</h2>
      <ListaProductos :productos="relacionados" />
    </section>

    <section class="comentarios">
      <h2>Comentarios</h2>
      <CommentsUtterances :repo="commentsRepo" />
    </section>
  </div>
</template>
