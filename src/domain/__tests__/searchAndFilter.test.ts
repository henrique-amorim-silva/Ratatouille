import { describe, expect, it } from 'vitest'
import { receitas } from '../../data/recipes'
import { buscarEFiltrarReceitas } from '../searchAndFilter'

describe('buscarEFiltrarReceitas', () => {
  it('busca sem diferenciar maiúsculas nem acentos em nome, tags e ingredientes', () => {
    expect(buscarEFiltrarReceitas(receitas, { consulta: 'MOQUECA' })).toHaveLength(1)
    expect(buscarEFiltrarReceitas(receitas, { consulta: 'fit' })[0]?.id).toBe(
      'bowl-fit-de-frango-e-quinoa',
    )
    expect(buscarEFiltrarReceitas(receitas, { consulta: 'cenoura' })[0]?.id).toBe(
      'bolo-de-cenoura-com-chocolate',
    )
  })

  it('combina todos os filtros fornecidos sem alterar a lista original', () => {
    const listaOriginal = [...receitas]
    const resultado = buscarEFiltrarReceitas(receitas, {
      categoria: 'pratos principais',
      tags: ['fit'],
      ingredientes: ['frango', 'quinoa'],
      dificuldade: 'fácil',
      tempoMaximoMinutos: 40,
    })

    expect(resultado.map(({ id }) => id)).toEqual(['bowl-fit-de-frango-e-quinoa'])
    expect(receitas).toEqual(listaOriginal)
  })

  it('encontra as cinco novas receitas pela tag fitness', () => {
    expect(buscarEFiltrarReceitas(receitas, { consulta: 'fitness' }).map(({ id }) => id)).toEqual([
      'hamburguer-de-massa-de-pastel',
      'overnight-oats-de-banana',
      'pudim-proteico-com-doce-de-leite',
      'pure-de-couve-flor',
      'tofu-salteado-com-legumes',
    ])
  })

  it('ordena por tempo ou título e permite ordem decrescente', () => {
    const porTempo = buscarEFiltrarReceitas(receitas, { ordenarPor: 'tempo' }).map(
      ({ tempos }) => tempos.totalMinutos,
    )
    expect(porTempo).toEqual([...porTempo].sort((a, b) => a - b))

    const titulosDecrescentes = buscarEFiltrarReceitas(receitas, {
      ordenarPor: 'titulo',
      ordem: 'desc',
    }).map(({ titulo }) => titulo)
    expect(titulosDecrescentes).toEqual(
      [...titulosDecrescentes].sort((a, b) => b.localeCompare(a, 'pt-BR')),
    )
  })

  it('rejeita tempo máximo inválido', () => {
    expect(() => buscarEFiltrarReceitas(receitas, { tempoMaximoMinutos: -1 })).toThrow(RangeError)
  })
})
