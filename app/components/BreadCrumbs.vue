<script setup>
defineProps({
  ruta: { type: Array, required: true }
})
</script>

<template>
  <nav class="migas" aria-label="Ruta de navegación">
    <template v-for="(paso, i) in ruta" :key="i">
      <span v-if="i > 0" aria-hidden="true">›</span>
      <NuxtLink v-if="paso.to" :to="paso.to">{{ paso.texto }}</NuxtLink>
      <span v-else aria-current="page">{{ paso.texto }}</span>
    </template>
  </nav>
</template>
