import { describe, expect, it } from 'vitest'
import { receitas } from '../../data/recipes'
import { ajustarPorcoes } from '../portions'

const bolo = receitas.find(({ id }) => id === 'bolo-de-cenoura-com-chocolate')

if (!bolo) {
  throw new Error('Receita de bolo de cenoura não encontrada.')
}

describe('ajustarPorcoes', () => {
  it('escala quantidades e representa frações comuns de forma legível', () => {
    const resultado = ajustarPorcoes(bolo, 5)
    const receitaComQuantidadeFracionada = {
      ...bolo,
      ingredientes: bolo.ingredientes.map((ingrediente) =>
        ingrediente.id === 'farinha' ? { ...ingrediente, quantidade: 1 } : ingrediente,
      ),
    }
    const resultadoFracionado = ajustarPorcoes(receitaComQuantidadeFracionada, 5)
    const receitaComFracaoPequena = {
      ...bolo,
      ingredientes: bolo.ingredientes.map((ingrediente) =>
        ingrediente.id === 'farinha' ? { ...ingrediente, quantidade: 0.02 } : ingrediente,
      ),
    }

    expect(resultado.fatorEscala).toBe(0.5)
    expect(resultado.ingredientes.find(({ id }) => id === 'farinha')).toMatchObject({
      quantidadeAjustada: 150,
      quantidadeFormatada: '150',
    })
    expect(resultadoFracionado.ingredientes.find(({ id }) => id === 'farinha')).toMatchObject({
      quantidadeAjustada: 0.5,
      quantidadeFormatada: '1/2',
    })
    expect(
      ajustarPorcoes(receitaComFracaoPequena, 5).ingredientes.find(({ id }) => id === 'farinha'),
    ).toMatchObject({
      quantidadeAjustada: 0.01,
      quantidadeFormatada: '0,01',
    })
    expect(resultado.ingredientes.find(({ id }) => id === 'ovos')).toMatchObject({
      quantidadeAjustada: 2,
      quantidadeFormatada: '2',
    })
  })

  it('avisa quando a quantidade de um ingrediente indivisível precisa ser arredondada', () => {
    const resultado = ajustarPorcoes(bolo, 3)
    const ovos = resultado.ingredientes.find(({ id }) => id === 'ovos')

    expect(ovos).toMatchObject({
      quantidadeAjustada: 1,
      quantidadeFormatada: '1',
    })
    expect(resultado.avisos).toHaveLength(1)
    expect(resultado.avisos[0]?.ingrediente).toBe('ovos')
    expect(resultado.avisos[0]?.mensagem).toContain('arredondado para 1 unidade')
  })

  it('preserva quantidades indefinidas e rejeita porções inválidas', () => {
    const receita = receitas.find(({ id }) => id === 'moqueca-de-banana-da-terra')

    if (!receita) {
      throw new Error('Receita de moqueca não encontrada.')
    }

    expect(ajustarPorcoes(receita, 4).ingredientes.find(({ id }) => id === 'sal')).toMatchObject({
      quantidadeAjustada: null,
      quantidadeFormatada: null,
    })
    expect(() => ajustarPorcoes(bolo, 0)).toThrow(RangeError)
  })
})
