<script setup>
defineProps({
  producto: { type: Object, required: true }
})
</script>

<template>
  <article class="tarjeta">
    <NuxtLink :to="`/productos/${producto.slug}`" class="tarjeta-imagen">
      <img :src="producto.imagen" :alt="producto.nombre" loading="lazy">
    </NuxtLink>
    <div class="tarjeta-cuerpo">
      <p class="tenue">{{ producto.marca }}</p>
      <h3>
        <NuxtLink :to="`/productos/${producto.slug}`">{{ producto.nombre }}</NuxtLink>
      </h3>
      <p class="precio">{{ precio(producto.precio) }}</p>
      <BotonComprar :producto="producto" />
    </div>
  </article>
</template>
