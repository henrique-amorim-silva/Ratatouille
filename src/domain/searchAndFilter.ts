import type { DificuldadeReceita, Receita } from '../types/recipe'
import { correspondeIngrediente } from './pantryMatch'

export type OrdenacaoReceitas = 'titulo' | 'tempo' | 'rendimento'

export interface FiltrosReceitas {
  consulta?: string
  categoria?: string
  tags?: readonly string[]
  ingredientes?: readonly string[]
  dificuldade?: DificuldadeReceita
  tempoMaximoMinutos?: number
  ordenarPor?: OrdenacaoReceitas
  ordem?: 'asc' | 'desc'
}

function normalizarTexto(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim()
}

export function buscarEFiltrarReceitas(
  receitas: readonly Receita[],
  filtros: FiltrosReceitas = {},
): Receita[] {
  if (
    filtros.tempoMaximoMinutos !== undefined &&
    (!Number.isFinite(filtros.tempoMaximoMinutos) || filtros.tempoMaximoMinutos < 0)
  ) {
    throw new RangeError('O tempo máximo deve ser um número maior ou igual a zero.')
  }

  const termosBusca = normalizarTexto(filtros.consulta ?? '')
    .split(/\s+/)
    .filter(Boolean)
  const categoria = filtros.categoria ? normalizarTexto(filtros.categoria) : undefined
  const tags = (filtros.tags ?? []).map(normalizarTexto)
  const ingredientes = (filtros.ingredientes ?? []).map(normalizarTexto)

  const resultado = receitas.filter((receita) => {
    const camposTexto = [receita.titulo, ...receita.tags].map(normalizarTexto)
    const ingredientesReceita = receita.ingredientes.map(({ nome }) => nome)

    const correspondeBusca = termosBusca.every(
      (termo) =>
        camposTexto.some((campo) => campo.includes(termo)) ||
        ingredientesReceita.some((item) => correspondeIngrediente(item, termo)),
    )
    const correspondeCategoria =
      !categoria ||
      normalizarTexto(receita.categoriaPrincipal) === categoria ||
      receita.categorias.some((item) => normalizarTexto(item) === categoria)
    const correspondeTags = tags.every((tag) =>
      receita.tags.some((item) => normalizarTexto(item) === tag),
    )
    const correspondeIngredientes = ingredientes.every((ingrediente) =>
      ingredientesReceita.some((item) => correspondeIngrediente(item, ingrediente)),
    )
    const correspondeDificuldade =
      !filtros.dificuldade || receita.dificuldade === filtros.dificuldade
    const correspondeTempo =
      filtros.tempoMaximoMinutos === undefined ||
      receita.tempos.totalMinutos <= filtros.tempoMaximoMinutos

    return (
      correspondeBusca &&
      correspondeCategoria &&
      correspondeTags &&
      correspondeIngredientes &&
      correspondeDificuldade &&
      correspondeTempo
    )
  })

  const ordem = filtros.ordem === 'desc' ? -1 : 1
  const ordenarPor = filtros.ordenarPor ?? 'titulo'

  return resultado.sort((a, b) => {
    let comparacao: number

    if (ordenarPor === 'tempo') {
      comparacao = a.tempos.totalMinutos - b.tempos.totalMinutos
    } else if (ordenarPor === 'rendimento') {
      comparacao = a.rendimentoBase - b.rendimentoBase
    } else {
      comparacao = a.titulo.localeCompare(b.titulo, 'pt-BR')
    }

    return comparacao === 0 ? a.titulo.localeCompare(b.titulo, 'pt-BR') * ordem : comparacao * ordem
  })
}
