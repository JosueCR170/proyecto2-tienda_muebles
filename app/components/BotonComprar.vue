<script setup>
const props = defineProps({
  producto: { type: Object, required: true }
})

const { siteUrl } = useRuntimeConfig().public

const url = computed(() => `${siteUrl}/productos/${props.producto.slug}/`)
</script>

<template>
  <button
    class="snipcart-add-item boton-comprar"
    :data-item-id="producto.slug"
    :data-item-name="producto.nombre"
    :data-item-price="producto.precio"
    :data-item-url="url"
    :data-item-description="producto.descripcion"
    :data-item-image="`${siteUrl}${producto.imagen}`"
    :data-item-categories="producto.categoria"
  >
    Agregar al carrito
  </button>
</template>
