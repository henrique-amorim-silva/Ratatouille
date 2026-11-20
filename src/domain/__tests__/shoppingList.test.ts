import { describe, expect, it } from 'vitest'
import { consolidarListaCompras } from '../shoppingList'

describe('consolidarListaCompras', () => {
  it('converte g/kg e ml/l para uma unidade comum antes de somar', () => {
    const grupos = consolidarListaCompras([
      { id: '1', nome: '500 g farinha', comprado: false },
      { id: '2', nome: '1 kg farinha', comprado: false },
      { id: '3', nome: '750 ml leite', comprado: false },
      { id: '4', nome: '1 l leite', comprado: false },
    ])
    const itens = grupos.flatMap(({ itens: grupo }) => grupo)

    expect(itens.map(({ nome }) => nome)).toContain('1,5 kg farinha')
    expect(itens.map(({ nome }) => nome)).toContain('1,75 l leite')
    expect(itens.find(({ nome }) => nome === '1,5 kg farinha')?.idsOriginais).toEqual(['1', '2'])
  })

  it('soma unidades iguais, mantém unidades incompatíveis separadas e agrupa por categoria', () => {
    const grupos = consolidarListaCompras([
      { id: '1', nome: '2 unidades tomate', comprado: false },
      { id: '2', nome: '3 un tomate', comprado: false },
      { id: '3', nome: '200 ml tomate', comprado: false },
      { id: '4', nome: '1 unidade tomate', comprado: true },
    ])
    const hortifruti = grupos.find(({ categoria }) => categoria === 'Hortifruti')

    expect(hortifruti?.itens).toHaveLength(3)
    expect(hortifruti?.itens.map(({ nome }) => nome)).toContain('5 unidades tomate')
    expect(hortifruti?.itens.map(({ nome }) => nome)).toContain('200 ml tomate')
    expect(hortifruti?.itens.find(({ comprado }) => comprado)?.nome).toBe('1 unidade tomate')
  })

  it('não consolida ingredientes diferentes nem itens sem quantidade', () => {
    const grupos = consolidarListaCompras([
      { id: '1', nome: 'a gosto sal', comprado: false },
      { id: '2', nome: 'sal', comprado: false },
      { id: '3', nome: '2 farinha de trigo', comprado: false },
    ])

    expect(grupos.flatMap(({ itens }) => itens)).toHaveLength(3)
  })
})
