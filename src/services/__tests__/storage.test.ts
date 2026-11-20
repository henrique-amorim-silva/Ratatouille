import { beforeEach, describe, expect, it } from 'vitest'
import {
  obterFavoritos,
  obterPreferencias,
  salvarFavoritos,
  salvarPreferencias,
} from '../storage'

describe('persistência local', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('salva e recupera favoritos', () => {
    salvarFavoritos(['receita-1', 'receita-2'])

    expect(obterFavoritos()).toEqual(['receita-1', 'receita-2'])
  })

  it('salva e recupera preferências tipadas', () => {
    salvarPreferencias({ tema: 'escuro', porcoesPadrao: 4 })

    expect(obterPreferencias<{ tema: string; porcoesPadrao: number }>()).toEqual({
      tema: 'escuro',
      porcoesPadrao: 4,
    })
  })

  it('rejeita favoritos armazenados em formato inválido', () => {
    localStorage.setItem('ratatouille:favoritos', JSON.stringify(['receita-1', 42]))

    expect(() => obterFavoritos()).toThrow(TypeError)
  })
})
