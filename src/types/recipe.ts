export type DificuldadeReceita = 'fácil' | 'média' | 'difícil'

export type OrigemInformacaoNutricional = 'calculada' | 'informada' | 'estimada'

export interface TemposReceita {
  preparoMinutos: number
  cozimentoMinutos: number
  totalMinutos: number
}

export interface IngredienteReceita {
  id: string
  nome: string
  quantidade: number | null
  unidade: string
  grupo?: string
  etapa?: number
  observacao?: string
  opcional: boolean
  indivisivel: boolean
}

export interface EtapaPreparo {
  numero: number
  titulo?: string
  descricao: string
  tempoMinutos?: number
  ingredientesVinculados: string[]
}

export interface SubstituicaoReceita {
  ingrediente: string
  substituto: string
  observacao?: string
}

export interface InformacaoNutricional {
  origem: OrigemInformacaoNutricional
  porcao?: string
  caloriasKcal?: number
  carboidratosG?: number
  proteinasG?: number
  gordurasG?: number
  fibrasG?: number
  sodioMg?: number
}

export interface Receita {
  id: string
  slug: string
  titulo: string
  descricaoCurta: string
  descricaoCompleta: string
  imagem: string
  galeria?: string[]
  categoriaPrincipal: string
  categorias: string[]
  subcategorias: string[]
  tags: string[]
  dificuldade: DificuldadeReceita
  tempos: TemposReceita
  rendimentoBase: number
  rendimentoLabel: string
  ingredientes: IngredienteReceita[]
  etapas: EtapaPreparo[]
  dicas: string[]
  substituicoes: SubstituicaoReceita[]
  restricoesAlimentares: string[]
  tipoRefeicao: string
  ocasioes: string[]
  youtubeUrl?: string
  nutricao?: InformacaoNutricional
}
