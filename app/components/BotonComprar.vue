<script setup>
const props = defineProps({
  producto: { type: Object, required: true }
})

const { siteUrl } = useRuntimeConfig().public

// Snipcart visita data-item-url para validar que el producto exista con el mismo precio,
// por eso siempre apunta a la página de detalle, incluso desde los listados
const url = computed(() => `${siteUrl}/productos/${props.producto.slug}`)
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
