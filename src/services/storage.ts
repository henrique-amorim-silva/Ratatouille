import { openDB, type DBSchema } from 'idb'

const CHAVE_FAVORITOS = 'ratatouille:favoritos'
const CHAVE_PREFERENCIAS = 'ratatouille:preferencias'
const NOME_BANCO = 'ratatouille'
const NOME_STORE_LISTA_COMPRAS = 'lista-compras'

export interface ItemListaCompras {
  id: string
  nome: string
  comprado: boolean
}

interface BancoRatatouille extends DBSchema {
  'lista-compras': {
    key: string
    value: ItemListaCompras
  }
}

let bancoPromise: ReturnType<typeof abrirBanco> | undefined

function abrirBanco() {
  return openDB<BancoRatatouille>(NOME_BANCO, 1, {
    upgrade(banco) {
      banco.createObjectStore(NOME_STORE_LISTA_COMPRAS, { keyPath: 'id' })
    },
  })
}

function obterBanco() {
  if (!bancoPromise) {
    bancoPromise = abrirBanco().catch((erro: unknown) => {
      bancoPromise = undefined
      throw erro
    })
  }

  return bancoPromise
}

export function obterFavoritos(): string[] {
  const dados = localStorage.getItem(CHAVE_FAVORITOS)

  if (dados === null) {
    return []
  }

  const favoritos: unknown = JSON.parse(dados)

  if (!Array.isArray(favoritos) || !favoritos.every((id) => typeof id === 'string')) {
    throw new TypeError('Os favoritos armazenados possuem um formato inválido.')
  }

  return favoritos
}

export function salvarFavoritos(favoritos: string[]): void {
  localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos))
}

export function obterPreferencias<T extends Record<string, unknown>>(): T | null {
  const dados = localStorage.getItem(CHAVE_PREFERENCIAS)

  if (dados === null) {
    return null
  }

  const preferencias: unknown = JSON.parse(dados)

  if (typeof preferencias !== 'object' || preferencias === null || Array.isArray(preferencias)) {
    throw new TypeError('As preferências armazenadas possuem um formato inválido.')
  }

  return preferencias as T
}

export function salvarPreferencias(preferencias: Record<string, unknown>): void {
  localStorage.setItem(CHAVE_PREFERENCIAS, JSON.stringify(preferencias))
}

export async function listarItensListaCompras(): Promise<ItemListaCompras[]> {
  const banco = await obterBanco()
  return banco.getAll(NOME_STORE_LISTA_COMPRAS)
}

export async function salvarItemListaCompras(item: ItemListaCompras): Promise<void> {
  const banco = await obterBanco()
  await banco.put(NOME_STORE_LISTA_COMPRAS, item)
}

export async function removerItemListaCompras(id: string): Promise<void> {
  const banco = await obterBanco()
  await banco.delete(NOME_STORE_LISTA_COMPRAS, id)
}

export async function limparItensComprados(): Promise<void> {
  const banco = await obterBanco()
  const transacao = banco.transaction(NOME_STORE_LISTA_COMPRAS, 'readwrite')
  const store = transacao.objectStore(NOME_STORE_LISTA_COMPRAS)
  const itens = await store.getAll()

  await Promise.all(
    itens.filter(({ comprado }) => comprado).map(({ id }) => store.delete(id)),
  )
  await transacao.done
}
