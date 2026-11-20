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

const denominadoresComuns = [2, 3, 4, 5, 6, 8, 10, 12, 16]

function formatarQuantidade(quantidade: number): string {
  const inteiro = Math.floor(quantidade)
  const fracao = quantidade - inteiro

  if (fracao < 0.000001) {
    return String(inteiro)
  }

  let melhorNumerador = 0
  let melhorDenominador = 1
  let menorDiferenca = Number.POSITIVE_INFINITY

  for (const denominador of denominadoresComuns) {
    const numerador = Math.round(fracao * denominador)
    if (numerador === 0) {
      continue
    }

    const diferenca = Math.abs(fracao - numerador / denominador)

    if (diferenca < menorDiferenca) {
      melhorNumerador = numerador
      melhorDenominador = denominador
      menorDiferenca = diferenca
    }
  }

  if (menorDiferenca <= 0.015) {
    if (melhorNumerador === melhorDenominador) {
      return String(inteiro + 1)
    }

    const divisor = obterMdc(melhorNumerador, melhorDenominador)
    const numeradorSimplificado = melhorNumerador / divisor
    const denominadorSimplificado = melhorDenominador / divisor
    const textoFracao = `${numeradorSimplificado}/${denominadorSimplificado}`

    return inteiro > 0 ? `${inteiro} ${textoFracao}` : textoFracao
  }

  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(quantidade)
}

function obterMdc(a: number, b: number): number {
  let dividendo = a
  let divisor = b

  while (divisor !== 0) {
    const resto = dividendo % divisor
    dividendo = divisor
    divisor = resto
  }

  return dividendo
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
