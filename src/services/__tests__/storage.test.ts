import { beforeEach, describe, expect, it } from 'vitest'
import {
  obterFavoritos,
  obterPreferencias,
  exportarBackup,
  restaurarBackup,
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

  it('exporta e restaura dados validados sem modificar dados em caso de erro', async () => {
    const backup = {
      versao: 1,
      exportadoEm: '2026-11-20T12:00:00.000Z',
      favoritos: ['bolo-de-cenoura-com-chocolate'],
      preferencias: { tema: 'escuro' },
      itensLista: [{ id: 'item-1', nome: '2 tomates', comprado: false }],
      planejamento: [
        {
          id: '2026-11-23:almoco',
          data: '2026-11-23',
          refeicao: 'almoco',
          receitaId: 'bolo-de-cenoura-com-chocolate',
          porcoes: 4,
        },
      ],
      historico: [
        {
          id: 'preparo-1',
          receitaId: 'bolo-de-cenoura-com-chocolate',
          preparadoEm: '2026-11-19T15:00:00.000Z',
        },
      ],
      anotacoes: [
        {
          receitaId: 'bolo-de-cenoura-com-chocolate',
          texto: 'Reduzir o açúcar.',
          atualizadaEm: '2026-11-19T15:00:00.000Z',
        },
      ],
    } as const

    await restaurarBackup(backup)
    expect(await exportarBackup()).toMatchObject({
      favoritos: backup.favoritos,
      preferencias: backup.preferencias,
      itensLista: backup.itensLista,
      planejamento: backup.planejamento,
      historico: backup.historico,
      anotacoes: backup.anotacoes,
    })

    await expect(
      restaurarBackup({
        ...backup,
        itensLista: [{ id: 'item-invalido', nome: '', comprado: false }],
      }),
    ).rejects.toThrow()
    expect((await exportarBackup()).itensLista).toEqual(backup.itensLista)
  })
})
