import { ajustarPorcoes } from './portions'
import type { Receita } from '../types/recipe'
import type { ItemPlanejamento } from '../types/mealPlanner'
import type { ItemListaComprasEntrada } from './shoppingList'

export function gerarItensComprasPlanejados(
  planejamento: readonly ItemPlanejamento[],
  receitas: readonly Receita[],
): ItemListaComprasEntrada[] {
  const receitasPorId = new Map(receitas.map((receita) => [receita.id, receita]))

  return planejamento.flatMap((item) => {
    const receita = receitasPorId.get(item.receitaId)
    if (!receita) return []

    return ajustarPorcoes(receita, item.porcoes).ingredientes.map((ingrediente) => ({
      id: `${item.id}:${ingrediente.id}`,
      nome:
        ingrediente.quantidadeAjustada === null
          ? ingrediente.nome
          : `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(ingrediente.quantidadeAjustada)} ${ingrediente.unidade} ${ingrediente.nome}`,
      comprado: false,
    }))
  })
}
