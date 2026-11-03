export function precio(valor) {
  return `$${Number(valor).toLocaleString('en-US')}`
}

export function cuenta(n, singular, plural) {
  if (n === 1) {
    return `${n} ${singular}`
  }
  return `${n} ${plural}`
}

const DIACRITICOS = /[̀-ͯ]/g

export function normalizar(texto) {
  return String(texto ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICOS, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function coincide(producto, nombreCategoria, consulta) {
  const palabras = normalizar(consulta).split(' ').filter(p => p.length >= 2)
  if (!palabras.length) return false
  const texto = normalizar([
    producto.nombre,
    producto.descripcion,
    producto.marca,
    producto.material,
    producto.color,
    nombreCategoria
  ].join(' '))
  return palabras.every(palabra => texto.includes(palabra))
}

export function paginar(lista, pagina, porPagina) {
  return lista.slice((pagina - 1) * porPagina, pagina * porPagina)
}
