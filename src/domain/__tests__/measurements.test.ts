import { describe, expect, it } from 'vitest'
import { converterMedidas } from '../measurements'

describe('converterMedidas', () => {
  it('converte unidades equivalentes de massa sem precisar do ingrediente', () => {
    expect(converterMedidas(1.5, 'kg', 'g', '')).toEqual({
      quantidade: 1500,
      confiavel: true,
      aviso: null,
    })
  })

  it('usa densidade conhecida para converter volume em massa e identifica a estimativa', () => {
    const conversao = converterMedidas(1, 'xícara', 'g', 'farinha de trigo')

    expect(conversao.quantidade).toBeCloseTo(127.2)
    expect(conversao.confiavel).toBe(true)
    expect(conversao.aviso).toMatch(/densidade pode variar/)
  })

  it('não inventa resultado de massa para volume sem densidade conhecida', () => {
    expect(converterMedidas(100, 'g', 'ml', 'abobrinha ralada')).toMatchObject({
      quantidade: null,
      confiavel: false,
      aviso: expect.stringContaining('balança'),
    })
  })

  it('reconhece doce de leite em vez de confundi-lo com leite', () => {
    const conversao = converterMedidas(1, 'xícara', 'g', 'doce de leite')

    expect(conversao.quantidade).toBeCloseTo(312)
    expect(conversao.confiavel).toBe(true)
    expect(conversao.aviso).toContain('doce de leite')
  })

  it('rejeita quantidades negativas', () => {
    expect(converterMedidas(-1, 'g', 'kg', 'açúcar')).toMatchObject({
      quantidade: null,
      confiavel: false,
      aviso: expect.stringContaining('quantidade válida'),
    })
  })
})
