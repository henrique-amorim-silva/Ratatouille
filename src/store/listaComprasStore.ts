import { create } from 'zustand'
import {
  limparItensComprados,
  listarItensListaCompras,
  removerItemListaCompras,
  salvarItemListaCompras,
  type ItemListaCompras,
} from '../services/storage'

interface ListaComprasState {
  itens: ItemListaCompras[]
  carregado: boolean
  carregarItens: () => Promise<void>
  adicionarItem: (nome: string) => Promise<void>
  marcarComprado: (id: string) => Promise<void>
  alternarComprado: (id: string) => Promise<void>
  removerItem: (id: string) => Promise<void>
  limparConcluidos: () => Promise<void>
}

export const useListaComprasStore = create<ListaComprasState>((set, get) => {
  let carregamento: Promise<void> | null = null

  const carregarItens = () => {
    if (!carregamento) {
      carregamento = listarItensListaCompras()
        .then((itens) => set({ itens, carregado: true }))
        .catch((erro: unknown) => {
          carregamento = null
          throw erro
        })
    }

    return carregamento
  }

  return {
    itens: [],
    carregado: false,
    carregarItens,
    adicionarItem: async (nome) => {
      const nomeNormalizado = nome.trim()

      if (!nomeNormalizado) {
        throw new RangeError('O nome do item não pode ficar vazio.')
      }

      await carregarItens()
      const item: ItemListaCompras = {
        id: crypto.randomUUID(),
        nome: nomeNormalizado,
        comprado: false,
      }

      await salvarItemListaCompras(item)
      set((estado) => ({ itens: [...estado.itens, item] }))
    },
    marcarComprado: async (id) => {
      await carregarItens()
      const item = get().itens.find((atual) => atual.id === id)

      if (!item) {
        throw new Error(`Item da lista de compras não encontrado: ${id}`)
      }

      const atualizado = { ...item, comprado: true }
      await salvarItemListaCompras(atualizado)
      set((estado) => ({
        itens: estado.itens.map((atual) => (atual.id === id ? atualizado : atual)),
      }))
    },
    alternarComprado: async (id) => {
      await carregarItens()
      const item = get().itens.find((atual) => atual.id === id)

      if (!item) {
        throw new Error(`Item da lista de compras não encontrado: ${id}`)
      }

      const atualizado = { ...item, comprado: !item.comprado }
      await salvarItemListaCompras(atualizado)
      set((estado) => ({
        itens: estado.itens.map((atual) => (atual.id === id ? atualizado : atual)),
      }))
    },
    removerItem: async (id) => {
      await carregarItens()
      await removerItemListaCompras(id)
      set((estado) => ({ itens: estado.itens.filter((item) => item.id !== id) }))
    },
    limparConcluidos: async () => {
      await carregarItens()
      await limparItensComprados()
      set((estado) => ({ itens: estado.itens.filter(({ comprado }) => !comprado) }))
    },
  }
})
