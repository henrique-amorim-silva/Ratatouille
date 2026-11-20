import { describe, expect, it } from 'vitest'
import { receitas } from '../../data/recipes'
import { consolidarListaCompras } from '../shoppingList'
import { gerarItensComprasPlanejados } from '../mealPlanner'

describe('gerarItensComprasPlanejados', () => {
  it('ajusta porções e consolida ingredientes repetidos entre refeições', () => {
    const receita = receitas.find((item) => item.id === 'bolo-de-cenoura-com-chocolate')!
    const itens = gerarItensComprasPlanejados(
      [
        {
          id: 'segunda:almoco',
          data: '2026-11-23',
          refeicao: 'almoco',
          receitaId: receita.id,
          porcoes: 10,
        },
        {
          id: 'terca:lanche',
          data: '2026-11-24',
          refeicao: 'lanche',
          receitaId: receita.id,
          porcoes: 5,
        },
      ],
      receitas,
    )
    const consolidados = consolidarListaCompras(itens).flatMap(({ itens: grupo }) => grupo)

    expect(consolidados.map(({ nome }) => nome)).toContain('375 g cenoura descascada e picada')
  })

  it('ignora receitas removidas do catálogo', () => {
    expect(
      gerarItensComprasPlanejados(
        [
          {
            id: 'segunda:almoco',
            data: '2026-11-23',
            refeicao: 'almoco',
            receitaId: 'receita-removida',
            porcoes: 2,
          },
        ],
        receitas,
      ),
    ).toEqual([])
  })
})
