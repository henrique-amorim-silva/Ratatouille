import { openDB, type DBSchema } from 'idb'
import { backupSchema, type BackupDados } from '../data/schemas/backupSchema'
import type { ItemPlanejamento } from '../types/mealPlanner'

const CHAVE_FAVORITOS = 'ratatouille:favoritos'
const CHAVE_PREFERENCIAS = 'ratatouille:preferencias'
const NOME_BANCO = 'ratatouille'
const NOME_STORE_LISTA_COMPRAS = 'lista-compras'
const NOME_STORE_PLANEJAMENTO = 'planejamento-refeicoes'
const NOME_STORE_HISTORICO = 'historico-preparos'
const NOME_STORE_ANOTACOES = 'anotacoes-receitas'

export interface ItemListaCompras {
  id: string
  nome: string
  comprado: boolean
}

export interface PreparoRealizado {
  id: string
  receitaId: string
  preparadoEm: string
}

export interface AnotacaoReceita {
  receitaId: string
  texto: string
  atualizadaEm: string
}

interface BancoRatatouille extends DBSchema {
  'lista-compras': {
    key: string
    value: ItemListaCompras
  }
  'planejamento-refeicoes': {
    key: string
    value: ItemPlanejamento
  }
  'historico-preparos': {
    key: string
    value: PreparoRealizado
  }
  'anotacoes-receitas': {
    key: string
    value: AnotacaoReceita
  }
}

let bancoPromise: ReturnType<typeof abrirBanco> | undefined

function abrirBanco() {
  return openDB<BancoRatatouille>(NOME_BANCO, 2, {
    upgrade(banco) {
      if (!banco.objectStoreNames.contains(NOME_STORE_LISTA_COMPRAS)) {
        banco.createObjectStore(NOME_STORE_LISTA_COMPRAS, { keyPath: 'id' })
      }
      if (!banco.objectStoreNames.contains(NOME_STORE_PLANEJAMENTO)) {
        banco.createObjectStore(NOME_STORE_PLANEJAMENTO, { keyPath: 'id' })
      }
      if (!banco.objectStoreNames.contains(NOME_STORE_HISTORICO)) {
        banco.createObjectStore(NOME_STORE_HISTORICO, { keyPath: 'id' })
      }
      if (!banco.objectStoreNames.contains(NOME_STORE_ANOTACOES)) {
        banco.createObjectStore(NOME_STORE_ANOTACOES, { keyPath: 'receitaId' })
      }
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

  await Promise.all(itens.filter(({ comprado }) => comprado).map(({ id }) => store.delete(id)))
  await transacao.done
}

export async function listarPlanejamento(): Promise<ItemPlanejamento[]> {
  const banco = await obterBanco()
  return banco.getAll(NOME_STORE_PLANEJAMENTO)
}

export async function salvarItemPlanejamento(item: ItemPlanejamento): Promise<void> {
  const banco = await obterBanco()
  await banco.put(NOME_STORE_PLANEJAMENTO, item)
}

export async function removerItemPlanejamento(id: string): Promise<void> {
  const banco = await obterBanco()
  await banco.delete(NOME_STORE_PLANEJAMENTO, id)
}

export async function listarHistoricoPreparos(receitaId: string): Promise<PreparoRealizado[]> {
  const banco = await obterBanco()
  return (await banco.getAll(NOME_STORE_HISTORICO))
    .filter((preparo) => preparo.receitaId === receitaId)
    .sort((a, b) => b.preparadoEm.localeCompare(a.preparadoEm))
}

export async function registrarPreparo(preparo: PreparoRealizado): Promise<void> {
  const banco = await obterBanco()
  await banco.put(NOME_STORE_HISTORICO, preparo)
}

export async function obterAnotacaoReceita(
  receitaId: string,
): Promise<AnotacaoReceita | undefined> {
  const banco = await obterBanco()
  return banco.get(NOME_STORE_ANOTACOES, receitaId)
}

export async function salvarAnotacaoReceita(anotacao: AnotacaoReceita): Promise<void> {
  const banco = await obterBanco()
  if (anotacao.texto.trim()) {
    await banco.put(NOME_STORE_ANOTACOES, anotacao)
    return
  }
  await banco.delete(NOME_STORE_ANOTACOES, anotacao.receitaId)
}

export async function exportarBackup(): Promise<BackupDados> {
  const banco = await obterBanco()
  const [itensLista, planejamento, historico, anotacoes] = await Promise.all([
    banco.getAll(NOME_STORE_LISTA_COMPRAS),
    banco.getAll(NOME_STORE_PLANEJAMENTO),
    banco.getAll(NOME_STORE_HISTORICO),
    banco.getAll(NOME_STORE_ANOTACOES),
  ])
  const favoritos = obterFavoritos()
  const preferencias = obterPreferencias<Record<string, unknown>>()

  return backupSchema.parse({
    versao: 1,
    exportadoEm: new Date().toISOString(),
    favoritos,
    preferencias,
    itensLista,
    planejamento,
    historico,
    anotacoes,
  })
}

export async function restaurarBackup(dados: unknown): Promise<BackupDados> {
  const backup = backupSchema.parse(dados)
  const valoresAnteriores = {
    favoritos: localStorage.getItem(CHAVE_FAVORITOS),
    preferencias: localStorage.getItem(CHAVE_PREFERENCIAS),
  }

  try {
    salvarFavoritos(backup.favoritos)
    if (backup.preferencias === null) {
      localStorage.removeItem(CHAVE_PREFERENCIAS)
    } else {
      salvarPreferencias(backup.preferencias)
    }
  } catch (erro: unknown) {
    restaurarValorLocal(CHAVE_FAVORITOS, valoresAnteriores.favoritos)
    restaurarValorLocal(CHAVE_PREFERENCIAS, valoresAnteriores.preferencias)
    throw erro
  }

  try {
    const banco = await obterBanco()
    const transacao = banco.transaction(
      [
        NOME_STORE_LISTA_COMPRAS,
        NOME_STORE_PLANEJAMENTO,
        NOME_STORE_HISTORICO,
        NOME_STORE_ANOTACOES,
      ],
      'readwrite',
    )
    const storeLista = transacao.objectStore(NOME_STORE_LISTA_COMPRAS)
    const storePlanejamento = transacao.objectStore(NOME_STORE_PLANEJAMENTO)
    const storeHistorico = transacao.objectStore(NOME_STORE_HISTORICO)
    const storeAnotacoes = transacao.objectStore(NOME_STORE_ANOTACOES)

    await Promise.all([
      storeLista.clear(),
      ...backup.itensLista.map((item) => storeLista.put(item)),
      storePlanejamento.clear(),
      ...backup.planejamento.map((item) => storePlanejamento.put(item)),
      storeHistorico.clear(),
      ...backup.historico.map((item) => storeHistorico.put(item)),
      storeAnotacoes.clear(),
      ...backup.anotacoes.map((item) => storeAnotacoes.put(item)),
    ])
    await transacao.done
    return backup
  } catch (erro: unknown) {
    restaurarValorLocal(CHAVE_FAVORITOS, valoresAnteriores.favoritos)
    restaurarValorLocal(CHAVE_PREFERENCIAS, valoresAnteriores.preferencias)
    throw erro
  }
}

function restaurarValorLocal(chave: string, valor: string | null): void {
  if (valor === null) {
    localStorage.removeItem(chave)
  } else {
    localStorage.setItem(chave, valor)
  }
}
