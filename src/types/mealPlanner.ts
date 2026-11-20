export type RefeicaoPlanejada = 'cafe-da-manha' | 'almoco' | 'lanche' | 'jantar'

export interface ItemPlanejamento {
  id: string
  data: string
  refeicao: RefeicaoPlanejada
  receitaId: string
  porcoes: number
}
