import type { IngredienteReceita, Receita } from '../types/recipe'

export interface IngredienteComPorcaoAjustada extends IngredienteReceita {
  quantidadeAjustada: number | null
  quantidadeFormatada: string | null
}

export interface AvisoArredondamento {
  ingrediente: string
  quantidadeCalculada: number
  quantidadeArredondada: number
  mensagem: string
}

export interface ResultadoAjustePorcoes {
  porcoes: number
  fatorEscala: number
  ingredientes: IngredienteComPorcaoAjustada[]
  avisos: AvisoArredondamento[]
}

function formatarQuantidade(quantidade: number): string {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(quantidade)
}

export function ajustarPorcoes(receita: Receita, porcoesDesejadas: number): ResultadoAjustePorcoes {
  if (!Number.isFinite(porcoesDesejadas) || porcoesDesejadas <= 0) {
    throw new RangeError('O número de porções desejado deve ser maior que zero.')
  }

  const fatorEscala = porcoesDesejadas / receita.rendimentoBase
  const avisos: AvisoArredondamento[] = []
  const ingredientes = receita.ingredientes.map((ingrediente) => {
    if (ingrediente.quantidade === null) {
      return {
        ...ingrediente,
        quantidadeAjustada: null,
        quantidadeFormatada: null,
      }
    }

    const quantidadeCalculada = ingrediente.quantidade * fatorEscala
    const quantidadeAjustada = ingrediente.indivisivel
      ? Math.round(quantidadeCalculada)
      : quantidadeCalculada

    if (
      ingrediente.indivisivel &&
      Math.abs(quantidadeCalculada - quantidadeAjustada) > 0.000000001
    ) {
      avisos.push({
        ingrediente: ingrediente.nome,
        quantidadeCalculada,
        quantidadeArredondada: quantidadeAjustada,
        mensagem: `${ingrediente.nome}: ${formatarQuantidade(quantidadeCalculada)} foi arredondado para ${formatarQuantidade(quantidadeAjustada)} ${ingrediente.unidade}.`,
      })
    }

    return {
      ...ingrediente,
      quantidadeAjustada,
      quantidadeFormatada: formatarQuantidade(quantidadeAjustada),
    }
  })

  return {
    porcoes: porcoesDesejadas,
    fatorEscala,
    ingredientes,
    avisos,
  }
}
