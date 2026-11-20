export const UNIDADES_MEDIDA = [
  'g',
  'kg',
  'ml',
  'l',
  'xícara',
  'colher de sopa',
  'colher de chá',
] as const

export type UnidadeMedida = (typeof UNIDADES_MEDIDA)[number]

interface DensidadeIngrediente {
  nome: string
  aliases: string[]
  gramasPorMl: number
}

export const DENSIDADES_CONHECIDAS: readonly DensidadeIngrediente[] = [
  { nome: 'água', aliases: ['água'], gramasPorMl: 1 },
  { nome: 'leite', aliases: ['leite', 'leite integral'], gramasPorMl: 1.03 },
  { nome: 'óleo', aliases: ['óleo', 'óleo vegetal'], gramasPorMl: 0.92 },
  { nome: 'azeite', aliases: ['azeite'], gramasPorMl: 0.91 },
  { nome: 'manteiga', aliases: ['manteiga'], gramasPorMl: 0.91 },
  { nome: 'açúcar', aliases: ['açúcar refinado', 'açúcar'], gramasPorMl: 0.85 },
  { nome: 'farinha de trigo', aliases: ['farinha de trigo', 'farinha'], gramasPorMl: 0.53 },
  { nome: 'arroz cru', aliases: ['arroz'], gramasPorMl: 0.85 },
  { nome: 'sal', aliases: ['sal'], gramasPorMl: 1.2 },
  { nome: 'mel', aliases: ['mel'], gramasPorMl: 1.42 },
  { nome: 'cacau em pó', aliases: ['cacau', 'chocolate em pó'], gramasPorMl: 0.52 },
  { nome: 'aveia', aliases: ['aveia'], gramasPorMl: 0.4 },
  {
    nome: 'creme de leite',
    aliases: ['creme de leite'],
    gramasPorMl: 1.01,
  },
]

const fatoresUnidade: Record<UnidadeMedida, { tipo: 'massa' | 'volume'; fator: number }> = {
  g: { tipo: 'massa', fator: 1 },
  kg: { tipo: 'massa', fator: 1000 },
  ml: { tipo: 'volume', fator: 1 },
  l: { tipo: 'volume', fator: 1000 },
  xícara: { tipo: 'volume', fator: 240 },
  'colher de sopa': { tipo: 'volume', fator: 15 },
  'colher de chá': { tipo: 'volume', fator: 5 },
}

export interface ResultadoConversao {
  quantidade: number | null
  confiavel: boolean
  aviso: string | null
}

function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim()
}

function encontrarDensidade(ingrediente: string) {
  const nomeNormalizado = normalizar(ingrediente)
  const correspondencias = DENSIDADES_CONHECIDAS.flatMap((densidade) =>
    densidade.aliases.map((alias) => ({ densidade, alias: normalizar(alias) })),
  ).sort((a, b) => b.alias.length - a.alias.length)

  return correspondencias.find(({ alias }) => nomeNormalizado.includes(alias))?.densidade
}

export function converterMedidas(
  quantidade: number,
  unidadeOrigem: UnidadeMedida,
  unidadeDestino: UnidadeMedida,
  ingrediente: string,
): ResultadoConversao {
  if (!Number.isFinite(quantidade) || quantidade < 0) {
    return {
      quantidade: null,
      confiavel: false,
      aviso: 'Informe uma quantidade válida, igual ou maior que zero.',
    }
  }

  const origem = fatoresUnidade[unidadeOrigem]
  const destino = fatoresUnidade[unidadeDestino]
  const quantidadeBase = quantidade * origem.fator

  if (origem.tipo === destino.tipo) {
    return {
      quantidade: quantidadeBase / destino.fator,
      confiavel: true,
      aviso: null,
    }
  }

  const densidade = encontrarDensidade(ingrediente)
  if (!densidade) {
    return {
      quantidade: null,
      confiavel: false,
      aviso:
        'Não é possível converter massa e volume com confiança sem a densidade deste ingrediente. Use uma balança ou consulte uma referência específica.',
    }
  }

  const quantidadeConvertida =
    origem.tipo === 'massa'
      ? quantidadeBase / densidade.gramasPorMl
      : quantidadeBase * densidade.gramasPorMl

  return {
    quantidade: quantidadeConvertida / destino.fator,
    confiavel: true,
    aviso: `Estimativa para ${densidade.nome}: a densidade pode variar conforme a marca e o modo de preencher a medida.`,
  }
}
