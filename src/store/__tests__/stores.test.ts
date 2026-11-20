import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const storage = vi.hoisted(() => ({
  obterFavoritos: vi.fn(() => [] as string[]),
  salvarFavoritos: vi.fn(),
  listarItensListaCompras: vi.fn(async () => []),
  salvarItemListaCompras: vi.fn(async () => {}),
  removerItemListaCompras: vi.fn(async () => {}),
  limparItensComprados: vi.fn(async () => {}),
}))

vi.mock('../../services/storage', () => storage)

import { useFavoritosStore } from '../favoritosStore'
import { useListaComprasStore } from '../listaComprasStore'

describe('stores de favoritos e lista de compras', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useFavoritosStore.setState({ favoritos: [] })
    useListaComprasStore.setState({ itens: [], carregado: false })
    vi.stubGlobal(
      'crypto',
      {
        randomUUID: vi.fn().mockReturnValueOnce('item-1').mockReturnValueOnce('item-2'),
      },
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('alterna favoritos e persiste a lista atualizada', () => {
    const store = useFavoritosStore.getState()

    store.alternarFavorito('receita-1')
    expect(useFavoritosStore.getState().temFavorito('receita-1')).toBe(true)
    expect(storage.salvarFavoritos).toHaveBeenLastCalledWith(['receita-1'])

    useFavoritosStore.getState().alternarFavorito('receita-1')
    expect(useFavoritosStore.getState().temFavorito('receita-1')).toBe(false)
    expect(storage.salvarFavoritos).toHaveBeenLastCalledWith([])
  })

  it('adiciona, marca, remove e limpa itens concluídos com persistência', async () => {
    const store = useListaComprasStore.getState()

    await expect(store.adicionarItem('   ')).rejects.toThrow(RangeError)
    expect(storage.salvarItemListaCompras).not.toHaveBeenCalled()

    await store.adicionarItem('  Tomate  ')
    await store.adicionarItem('Arroz')
    await useListaComprasStore.getState().marcarComprado('item-1')

    expect(useListaComprasStore.getState().itens).toEqual([
      { id: 'item-1', nome: 'Tomate', comprado: true },
      { id: 'item-2', nome: 'Arroz', comprado: false },
    ])

    await useListaComprasStore.getState().limparConcluidos()
    expect(storage.limparItensComprados).toHaveBeenCalledOnce()
    expect(useListaComprasStore.getState().itens).toEqual([
      { id: 'item-2', nome: 'Arroz', comprado: false },
    ])

    await useListaComprasStore.getState().alternarComprado('item-2')
    expect(useListaComprasStore.getState().itens).toEqual([
      { id: 'item-2', nome: 'Arroz', comprado: true },
    ])
    await useListaComprasStore.getState().alternarComprado('item-2')
    expect(useListaComprasStore.getState().itens).toEqual([
      { id: 'item-2', nome: 'Arroz', comprado: false },
    ])

    await useListaComprasStore.getState().removerItem('item-2')
    expect(storage.removerItemListaCompras).toHaveBeenCalledWith('item-2')
    expect(useListaComprasStore.getState().itens).toEqual([])
  })
})
