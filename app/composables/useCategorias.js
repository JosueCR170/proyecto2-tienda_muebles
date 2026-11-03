// Lista de categorías ordenada, compartida por el encabezado y las páginas
export function useCategorias() {
  return useAsyncData('categorias', () => {
    return queryCollection('categorias').order('orden', 'ASC').all()
  })
}
