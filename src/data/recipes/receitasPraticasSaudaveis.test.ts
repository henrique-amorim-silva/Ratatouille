import { describe, expect, it } from 'vitest'
import { receitas } from './index'

describe('receitas práticas e saudáveis', () => {
  it('cadastra a torta escocesa fit e outras cinco receitas', () => {
    const ids = new Set(receitas.map(({ id }) => id))

    expect(ids.has('torta-do-pica-pau')).toBe(true)
    expect(ids.has('panqueca-de-aveia-e-banana')).toBe(true)
    expect(ids.has('frango-grelhado-com-legumes')).toBe(true)
    expect(ids.has('sopa-cremosa-de-abobora')).toBe(true)
    expect(ids.has('omelete-de-forno-com-legumes')).toBe(true)
    expect(ids.has('tigela-de-grao-de-bico')).toBe(true)
  })

  it('apresenta a torta escocesa como uma opção prática e equilibrada', () => {
    const torta = receitas.find(({ id }) => id === 'torta-do-pica-pau')

    expect(torta?.titulo).toBe('Torta do Pica-Pau')
    expect(torta?.descricaoCompleta).toContain('Pica-Pau')
    expect(torta?.ingredientes.map(({ id }) => id)).toContain('chocolate')
    expect(torta?.ingredientes.map(({ id }) => id)).toContain('leite-condensado')
  })
})
