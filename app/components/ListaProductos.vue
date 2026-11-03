<script setup>
defineProps({
  productos: { type: Array, required: true }
})
</script>

<template>
  <div class="grilla">
    <ProductoCard v-for="producto in productos" :key="producto.slug" :producto="producto" />
  </div>
</template>
