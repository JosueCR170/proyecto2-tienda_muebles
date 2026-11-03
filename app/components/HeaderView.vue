<script setup>
const route = useRoute()
const router = useRouter()
const cartCount = useState('cart-count', () => 0)

const { data: categorias } = await useCategorias()

const termino = ref(String(route.query.q ?? ''))

watch(() => route.query.q, (valor) => {
  termino.value = String(valor ?? '')
})

function buscar() {
  const q = termino.value.trim()
  if (!q) return
  router.push({ path: '/buscar', query: { q } })
}
</script>

<template>
  <header class="encabezado">
    <div class="container encabezado-fila">
      <NuxtLink to="/" class="logo">
        Casa Nido
      </NuxtLink>

      <form class="buscador" role="search" @submit.prevent="buscar">
        <input
          v-model="termino"
          type="search"
          autocomplete="off"
          placeholder="Buscar sofás, lámparas, roble…"
          aria-label="Buscar productos"
        >
        <button type="submit">Buscar</button>
      </form>

      <button class="snipcart-checkout carrito" aria-label="Ver el carrito de compras">
        Carrito
        <ClientOnly><span class="contador">({{ cartCount }})</span></ClientOnly>
      </button>
    </div>

    <nav class="container menu" aria-label="Categorías">
      <NuxtLink to="/" exact-active-class="activo">Inicio</NuxtLink>
      <NuxtLink to="/catalogo" active-class="activo">Todo</NuxtLink>
      <NuxtLink
        v-for="categoria in categorias"
        :key="categoria.slug"
        :to="`/categorias/${categoria.slug}`"
        active-class="activo"
      >
        {{ categoria.nombre }}
      </NuxtLink>
    </nav>
  </header>
</template>
