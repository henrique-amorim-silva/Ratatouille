import { create } from 'zustand'
import { obterFavoritos, salvarFavoritos } from '../services/storage'

interface FavoritosState {
  favoritos: string[]
  alternarFavorito: (id: string) => void
  temFavorito: (id: string) => boolean
}

export const useFavoritosStore = create<FavoritosState>((set, get) => ({
  favoritos: obterFavoritos(),
  alternarFavorito: (id) => {
    const favoritos = get().favoritos
    const atualizados = favoritos.includes(id)
      ? favoritos.filter((favorito) => favorito !== id)
      : [...favoritos, id]

    salvarFavoritos(atualizados)
    set({ favoritos: atualizados })
  },
  temFavorito: (id) => get().favoritos.includes(id),
}))
