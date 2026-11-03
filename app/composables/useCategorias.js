export function useCategorias() {
  return useAsyncData('categorias', () => {
    return queryCollection('categorias').order('orden', 'ASC').all()
  })
}
