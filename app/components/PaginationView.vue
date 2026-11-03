<script setup>
const props = defineProps({
  pagina: { type: Number, required: true },
  total: { type: Number, required: true },
  base: { type: String, default: '' }
})

const route = useRoute()

function destino(n) {
  if (props.base) {
    return n === 1 ? props.base : `${props.base}/${n}`
  }
  return { query: { ...route.query, pagina: n === 1 ? undefined : String(n) } }
}

const numeros = computed(() => Array.from({ length: props.total }, (_, i) => i + 1))
</script>

<template>
  <nav v-if="total > 1" class="paginacion" aria-label="Paginación">
    <NuxtLink v-if="pagina > 1" :to="destino(pagina - 1)" rel="prev">« Anterior</NuxtLink>
    <span v-else class="deshabilitado">« Anterior</span>

    <template v-for="n in numeros" :key="n">
      <span v-if="n === pagina" class="actual" aria-current="page">{{ n }}</span>
      <NuxtLink v-else :to="destino(n)">{{ n }}</NuxtLink>
    </template>

    <NuxtLink v-if="pagina < total" :to="destino(pagina + 1)" rel="next">Siguiente »</NuxtLink>
    <span v-else class="deshabilitado">Siguiente »</span>
  </nav>
</template>
