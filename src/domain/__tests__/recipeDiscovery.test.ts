import { describe, expect, it } from 'vitest'
import { receitas } from '../../data/recipes'
import { encontrarReceitasRelacionadas, selecionarReceitaSurpresa } from '../recipeDiscovery'

describe('descoberta de receitas', () => {
  it('escolhe uma receita surpresa diferente da escolha anterior', () => {
    const escolhida = selecionarReceitaSurpresa(receitas, receitas[0]?.id, () => 0)

    expect(escolhida).toBe(receitas[1])
  })

  it('retorna nulo para uma lista vazia e a única opção quando disponível', () => {
    expect(selecionarReceitaSurpresa([])).toBeNull()
    expect(selecionarReceitaSurpresa([receitas[0]!], receitas[0]?.id)).toBe(receitas[0])
  })

  it('prioriza receitas com categorias e tags em comum, sem incluir a atual', () => {
    const receita = receitas.find((item) => item.id === 'risoto-cremoso-de-cogumelos')
    expect(receita).toBeDefined()
    if (!receita) return

    const relacionadas = encontrarReceitasRelacionadas(receita, receitas, 3)

    expect(relacionadas).toHaveLength(3)
    expect(relacionadas).not.toContain(receita)
    expect(relacionadas[0]?.categorias).toContain('Pratos principais')
  })
})
