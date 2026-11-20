import type { Receita } from '../types/recipe'

export function selecionarReceitaSurpresa(
  receitas: readonly Receita[],
  receitaAnteriorId?: string,
  aleatorio: () => number = Math.random,
): Receita | null {
  if (receitas.length === 0) {
    return null
  }

  const opcoes =
    receitas.length > 1 && receitaAnteriorId
      ? receitas.filter((receita) => receita.id !== receitaAnteriorId)
      : receitas
  const indice = Math.min(Math.floor(aleatorio() * opcoes.length), opcoes.length - 1)

  return opcoes[indice] ?? null
}

export function encontrarReceitasRelacionadas(
  receita: Receita,
  receitas: readonly Receita[],
  limite = 3,
): Receita[] {
  const pontuar = (candidata: Receita) => {
    const categorias = new Set(receita.categorias)
    const subcategorias = new Set(receita.subcategorias)
    const tags = new Set(receita.tags)

    return (
      candidata.categorias.filter((categoria) => categorias.has(categoria)).length * 3 +
      candidata.subcategorias.filter((subcategoria) => subcategorias.has(subcategoria)).length * 2 +
      candidata.tags.filter((tag) => tags.has(tag)).length
    )
  }

  return receitas
    .filter((candidata) => candidata.id !== receita.id)
    .map((candidata, indice) => ({ receita: candidata, indice, pontuacao: pontuar(candidata) }))
    .filter(({ pontuacao }) => pontuacao > 0)
    .sort((a, b) => b.pontuacao - a.pontuacao || a.indice - b.indice)
    .slice(0, Math.max(0, limite))
    .map(({ receita: relacionada }) => relacionada)
}
