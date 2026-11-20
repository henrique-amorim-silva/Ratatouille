import type { IngredienteReceita, Receita } from '../types/recipe'

export interface ResultadoBuscaDespensa {
  receita: Receita
  percentualCompatibilidade: number
  ingredientesFaltantes: IngredienteReceita[]
}

function normalizarTexto(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/)
    .map((palavra) => {
      if (palavra.length > 4 && (palavra.endsWith('oes') || palavra.endsWith('aes'))) {
        return `${palavra.slice(0, -3)}ao`
      }
      if (palavra.length > 4 && palavra.endsWith('ais')) {
        return `${palavra.slice(0, -3)}al`
      }
      return palavra.length > 3 && palavra.endsWith('s') ? palavra.slice(0, -1) : palavra
    })
    .join(' ')
}

export function correspondeIngrediente(nomeReceita: string, nomeInformado: string): boolean {
  const nomeNormalizado = normalizarTexto(nomeReceita)
  const informadoNormalizado = normalizarTexto(nomeInformado)

  if (!nomeNormalizado || !informadoNormalizado) {
    return false
  }

  if (nomeNormalizado === informadoNormalizado) {
    return true
  }

  const ingredientesDerivadosDeLeite = [
    'doce de leite',
    'creme de leite',
    'leite condensado',
    'leite de coco',
  ]

  if (informadoNormalizado === 'leite' && ingredientesDerivadosDeLeite.includes(nomeNormalizado)) {
    return false
  }

  if (nomeNormalizado === 'leite' && ingredientesDerivadosDeLeite.includes(informadoNormalizado)) {
    return false
  }

  if (nomeNormalizado.startsWith(`${informadoNormalizado} `)) {
    return true
  }

  if (informadoNormalizado.startsWith(`${nomeNormalizado} `)) {
    return true
  }

  return new RegExp(
    `(^|[^\\p{L}\\p{N}])${escaparRegex(informadoNormalizado)}([^\\p{L}\\p{N}]|$)`,
    'u',
  ).test(nomeNormalizado)
}

function escaparRegex(texto: string): string {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function buscarReceitasComDespensa(
  receitas: readonly Receita[],
  ingredientesDisponiveis: readonly string[],
  ingredientesIndesejados: readonly string[] = [],
): ResultadoBuscaDespensa[] {
  const disponiveis = ingredientesDisponiveis.map(normalizarTexto).filter(Boolean)
  const indesejados = ingredientesIndesejados.map(normalizarTexto).filter(Boolean)

  return receitas
    .filter(
      (receita) =>
        !receita.ingredientes.some((ingrediente) =>
          indesejados.some((indesejado) => correspondeIngrediente(ingrediente.nome, indesejado)),
        ),
    )
    .map((receita) => {
      const ingredientesObrigatorios = receita.ingredientes.filter(({ opcional }) => !opcional)
      const ingredientesFaltantes = ingredientesObrigatorios.filter(
        (ingrediente) =>
          !disponiveis.some((disponivel) => correspondeIngrediente(ingrediente.nome, disponivel)),
      )
      const percentualCompatibilidade =
        ingredientesObrigatorios.length === 0
          ? 100
          : Math.round(
              ((ingredientesObrigatorios.length - ingredientesFaltantes.length) /
                ingredientesObrigatorios.length) *
                100,
            )

      return {
        receita,
        percentualCompatibilidade,
        ingredientesFaltantes,
      }
    })
    .sort(
      (a, b) =>
        b.percentualCompatibilidade - a.percentualCompatibilidade ||
        a.ingredientesFaltantes.length - b.ingredientesFaltantes.length ||
        a.receita.titulo.localeCompare(b.receita.titulo, 'pt-BR'),
    )
}
