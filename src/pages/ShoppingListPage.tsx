import { useEffect, useState, type FormEvent } from 'react'
import { Check, ShoppingBasket, Trash2 } from 'lucide-react'
import { useListaComprasStore } from '../store/listaComprasStore'

export function ShoppingListPage() {
  const [novoItem, setNovoItem] = useState('')
  const [erro, setErro] = useState('')
  const { itens, carregado, carregarItens, adicionarItem, alternarComprado, removerItem, limparConcluidos } =
    useListaComprasStore()

  useEffect(() => {
    void carregarItens().catch((causa: unknown) => {
      setErro(causa instanceof Error ? causa.message : 'Não foi possível carregar a lista de compras.')
    })
  }, [carregarItens])

  async function adicionar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setErro('')
    try {
      await adicionarItem(novoItem)
      setNovoItem('')
    } catch (causa) {
      setErro(causa instanceof Error ? causa.message : 'Não foi possível adicionar o item.')
    }
  }

  async function executar(acao: () => Promise<void>) {
    setErro('')
    try {
      await acao()
    } catch (causa) {
      setErro(causa instanceof Error ? causa.message : 'Não foi possível atualizar a lista.')
    }
  }

  const pendentes = itens.filter((item) => !item.comprado)
  const concluidos = itens.filter((item) => item.comprado)

  return (
    <main className="page-main">
      <section className="page-heading">
        <p className="sobretitulo">TUDO À MÃO NA HORA DE COZINHAR</p>
        <h1>Lista de compras</h1>
        <p>Organize os ingredientes que faltam e marque o que já encontrou.</p>
      </section>
      <section className="lista-compras">
        <form className="lista-compras__form" onSubmit={(evento) => void adicionar(evento)}>
          <label className="sr-only" htmlFor="novo-item">
            Novo item para comprar
          </label>
          <input
            id="novo-item"
            type="text"
            placeholder="Ex.: 2 tomates"
            value={novoItem}
            onChange={(evento) => setNovoItem(evento.target.value)}
          />
          <button className="botao" type="submit">
            <ShoppingBasket size={17} aria-hidden="true" /> Adicionar item
          </button>
        </form>

        {erro && (
          <p className="mensagem-erro" role="alert">
            {erro}
          </p>
        )}

        {!carregado ? (
          <p className="lista-compras__carregando" role="status">
            Carregando sua lista...
          </p>
        ) : itens.length === 0 ? (
          <div className="estado-vazio">
            <span aria-hidden="true">🧺</span>
            <h2>Sua lista está vazia</h2>
            <p>Adicione um item ou envie ingredientes faltantes de uma receita.</p>
          </div>
        ) : (
          <>
            <section aria-labelledby="itens-pendentes">
              <div className="lista-compras__secao">
                <h2 id="itens-pendentes">Para comprar <span>{pendentes.length}</span></h2>
              </div>
              {pendentes.length ? (
                <ul className="lista-compras__itens">
                  {pendentes.map((item) => (
                    <li key={item.id}>
                      <button
                        className="lista-compras__check"
                        type="button"
                        aria-label={`Marcar ${item.nome} como comprado`}
                        onClick={() => void executar(() => alternarComprado(item.id))}
                      >
                        <Check size={16} aria-hidden="true" />
                      </button>
                      <span>{item.nome}</span>
                      <button
                        className="lista-compras__remover"
                        type="button"
                        aria-label={`Remover ${item.nome}`}
                        onClick={() => void executar(() => removerItem(item.id))}
                      >
                        <Trash2 size={17} aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="lista-compras__dica">Tudo comprado. Bom preparo!</p>
              )}
            </section>
            {concluidos.length > 0 && (
              <section aria-labelledby="itens-concluidos">
                <div className="lista-compras__secao">
                  <h2 id="itens-concluidos">Comprados <span>{concluidos.length}</span></h2>
                  <button
                    className="botao-texto"
                    type="button"
                    onClick={() => void executar(limparConcluidos)}
                  >
                    Limpar
                  </button>
                </div>
                <ul className="lista-compras__itens lista-compras__itens--concluidos">
                  {concluidos.map((item) => (
                    <li key={item.id}>
                      <button
                        className="lista-compras__check lista-compras__check--feito"
                        type="button"
                        aria-label={`Desmarcar ${item.nome}`}
                        onClick={() => void executar(() => alternarComprado(item.id))}
                      >
                        <Check size={16} aria-hidden="true" />
                      </button>
                      <span>{item.nome}</span>
                      <button
                        className="lista-compras__remover"
                        type="button"
                        aria-label={`Remover ${item.nome}`}
                        onClick={() => void executar(() => removerItem(item.id))}
                      >
                        <Trash2 size={17} aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </section>
    </main>
  )
}
