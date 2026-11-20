import { describe, expect, it } from 'vitest'
import { receitas } from '../../data/recipes'
import { buscarReceitasComDespensa, correspondeIngrediente } from '../pantryMatch'

describe('buscarReceitasComDespensa', () => {
  it('calcula compatibilidade pelos ingredientes obrigatórios e ordena melhor combinação primeiro', () => {
    const resultado = buscarReceitasComDespensa(receitas, [
      'cenoura',
      'ovos',
      'óleo',
      'açúcar',
      'farinha',
      'fermento',
      'chocolate',
      'creme de leite',
    ])

    expect(resultado[0]).toMatchObject({
      receita: { id: 'bolo-de-cenoura-com-chocolate' },
      percentualCompatibilidade: 100,
      ingredientesFaltantes: [],
    })
  })

  it('ignora diferenças de acento e caixa, e exclui receitas com ingredientes indesejados', () => {
    const resultado = buscarReceitasComDespensa(receitas, ['QUINOA', 'limão', 'sal'], ['frango'])

    expect(resultado.some(({ receita }) => receita.id === 'bowl-fit-de-frango-e-quinoa')).toBe(
      false,
    )
    expect(resultado.some(({ receita }) => receita.id === 'moqueca-de-banana-da-terra')).toBe(true)
  })

  it('reconhece nomes no singular quando a receita usa o plural', () => {
    const bowl = receitas.find(({ id }) => id === 'bowl-fit-de-frango-e-quinoa')

    if (!bowl) {
      throw new Error('Receita de bowl não encontrada.')
    }

    const resultado = buscarReceitasComDespensa([bowl], ['tomate'])

    expect(resultado[0]?.ingredientesFaltantes).not.toContainEqual(
      expect.objectContaining({ id: 'tomate-cereja' }),
    )
  })

  it('não confunde leite comum com ingredientes derivados de leite', () => {
    expect(correspondeIngrediente('doce de leite', 'leite')).toBe(false)
    expect(correspondeIngrediente('creme de leite', 'leite')).toBe(false)
    expect(correspondeIngrediente('leite de coco', 'leite')).toBe(false)
    expect(correspondeIngrediente('leite desnatado', 'leite')).toBe(true)
  })

  it('aumenta a compatibilidade ao informar doce de leite', () => {
    const pudim = receitas.find(({ id }) => id === 'pudim-proteico-com-doce-de-leite')

    expect(pudim).toBeDefined()

    const resultado = buscarReceitasComDespensa(
      [pudim!],
      ['ovos', 'leite em pó desnatado', 'leite desnatado'],
    )[0]
    const resultadoComDoce = buscarReceitasComDespensa(
      [pudim!],
      ['ovos', 'leite em pó desnatado', 'leite desnatado', 'doce de leite'],
    )[0]

    expect(resultadoComDoce?.percentualCompatibilidade).toBeGreaterThan(
      resultado?.percentualCompatibilidade ?? 0,
    )
  })

  it('retorna ingredientes obrigatórios faltantes e trata receitas sem ingredientes obrigatórios', () => {
    const receita = receitas[0]

    if (!receita) {
      throw new Error('Receita de teste não encontrada.')
    }

    const resultado = buscarReceitasComDespensa([receita], [])

    expect(resultado[0]?.percentualCompatibilidade).toBe(0)
    expect(resultado[0]?.ingredientesFaltantes).toHaveLength(receita.ingredientes.length)
    expect(buscarReceitasComDespensa([{ ...receita, ingredientes: [] }], [])[0]).toMatchObject({
      percentualCompatibilidade: 100,
      ingredientesFaltantes: [],
    })
  })
})
