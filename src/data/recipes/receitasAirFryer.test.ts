import { describe, expect, it } from 'vitest'
import { receitas } from './index'

describe('receitas de air fryer', () => {
  it('cadastro as cinco novas receitas no catálogo', () => {
    const ids = new Set(receitas.map(({ id }) => id))

    expect(ids.has('pao-de-batata-na-air-fryer')).toBe(true)
    expect(ids.has('pizza-na-air-fryer')).toBe(true)
    expect(ids.has('nuggets-fit-caseiro')).toBe(true)
    expect(ids.has('batata-rustica-na-air-fryer')).toBe(true)
    expect(ids.has('couve-flor-empanada-na-air-fryer')).toBe(true)
  })

  it('informa como preparar a massa da pizza', () => {
    const pizza = receitas.find(({ id }) => id === 'pizza-na-air-fryer')

    expect(pizza?.descricaoCompleta).not.toContain('massa pronta')
    expect(pizza?.ingredientes.map(({ id }) => id)).toContain('farinha-massa')
    expect(pizza?.etapas.map(({ titulo }) => titulo)).toContain('Prepare a massa')
  })

  it('indica o pré-cozimento das batatas rústicas', () => {
    const batata = receitas.find(({ id }) => id === 'batata-rustica-na-air-fryer')

    expect(batata?.etapas.map(({ titulo }) => titulo)).toContain('Cozinhe as batatas')
    expect(batata?.etapas[0].descricao).toContain('água fervente')
  })
})
