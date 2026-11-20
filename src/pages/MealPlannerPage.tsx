import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, ShoppingBasket, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { receitas } from '../data/recipes'
import { gerarItensComprasPlanejados } from '../domain/mealPlanner'
import { consolidarListaCompras } from '../domain/shoppingList'
import {
  listarPlanejamento,
  removerItemPlanejamento,
  salvarItemPlanejamento,
} from '../services/storage'
import { useListaComprasStore } from '../store/listaComprasStore'
import type { ItemPlanejamento, RefeicaoPlanejada } from '../types/mealPlanner'

const refeicoes: { id: RefeicaoPlanejada; nome: string }[] = [
  { id: 'cafe-da-manha', nome: 'Café da manhã' },
  { id: 'almoco', nome: 'Almoço' },
  { id: 'lanche', nome: 'Lanche' },
  { id: 'jantar', nome: 'Jantar' },
]

function dataLocal(data: Date): string {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

function somarDias(data: Date, dias: number): Date {
  const resultado = new Date(data)
  resultado.setDate(resultado.getDate() + dias)
  return resultado
}

function inicioDaSemana(data: Date): Date {
  const resultado = new Date(data.getFullYear(), data.getMonth(), data.getDate())
  const diaDaSemana = (resultado.getDay() + 6) % 7
  resultado.setDate(resultado.getDate() - diaDaSemana)
  return resultado
}

function formatarData(data: Date, opcoes: Intl.DateTimeFormatOptions): string {
  const dataUtc = new Date(Date.UTC(data.getFullYear(), data.getMonth(), data.getDate(), 12))
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC', ...opcoes }).format(dataUtc)
}

export function MealPlannerPage() {
  const [semana, setSemana] = useState(() => inicioDaSemana(new Date()))
  const [planejamento, setPlanejamento] = useState<ItemPlanejamento[]>([])
  const [carregado, setCarregado] = useState(false)
  const [erro, setErro] = useState('')
  const [adicionando, setAdicionando] = useState(false)
  const adicionarItem = useListaComprasStore((estado) => estado.adicionarItem)

  useEffect(() => {
    let ativo = true
    void listarPlanejamento()
      .then((itens) => {
        if (ativo) {
          setPlanejamento(itens)
          setCarregado(true)
        }
      })
      .catch((causa: unknown) => {
        if (ativo) {
          setErro(
            causa instanceof Error ? causa.message : 'Não foi possível carregar o planejamento.',
          )
          setCarregado(true)
        }
      })
    return () => {
      ativo = false
    }
  }, [])

  const dias = useMemo(
    () => Array.from({ length: 7 }, (_, indice) => somarDias(semana, indice)),
    [semana],
  )
  const datasDaSemana = new Set(dias.map(dataLocal))
  const itensDaSemana = planejamento.filter((item) => datasDaSemana.has(item.data))
  const receitasPlanejadas = useMemo(
    () => gerarItensComprasPlanejados(itensDaSemana, receitas),
    [itensDaSemana],
  )
  const gruposDeCompras = consolidarListaCompras(receitasPlanejadas)

  async function atualizarRefeicao(
    data: string,
    refeicao: RefeicaoPlanejada,
    receitaId: string,
    porcoes = 2,
  ) {
    const id = `${data}:${refeicao}`
    setErro('')
    try {
      if (!receitaId) {
        await removerItemPlanejamento(id)
        setPlanejamento((atuais) => atuais.filter((item) => item.id !== id))
        return
      }

      const atual: ItemPlanejamento = {
        id,
        data,
        refeicao,
        receitaId,
        porcoes:
          planejamento.find((item) => item.id === id)?.porcoes ??
          receitas.find((receita) => receita.id === receitaId)?.rendimentoBase ??
          porcoes,
      }
      await salvarItemPlanejamento(atual)
      setPlanejamento((atuais) => [...atuais.filter((item) => item.id !== id), atual])
    } catch (causa: unknown) {
      setErro(causa instanceof Error ? causa.message : 'Não foi possível salvar o planejamento.')
    }
  }

  async function atualizarPorcoes(item: ItemPlanejamento, porcoes: number) {
    if (!Number.isFinite(porcoes) || porcoes <= 0) return
    const atualizado = { ...item, porcoes }
    setErro('')
    try {
      await salvarItemPlanejamento(atualizado)
      setPlanejamento((atuais) =>
        atuais.map((atual) => (atual.id === item.id ? atualizado : atual)),
      )
    } catch (causa: unknown) {
      setErro(causa instanceof Error ? causa.message : 'Não foi possível atualizar as porções.')
    }
  }

  async function adicionarListaDaSemana() {
    setErro('')
    setAdicionando(true)
    try {
      for (const grupo of gruposDeCompras) {
        for (const item of grupo.itens) {
          await adicionarItem(item.nome)
        }
      }
    } catch (causa: unknown) {
      setErro(causa instanceof Error ? causa.message : 'Não foi possível gerar a lista de compras.')
    } finally {
      setAdicionando(false)
    }
  }

  const intervaloSemana = `${formatarData(semana, { day: 'numeric', month: 'long' })} – ${formatarData(somarDias(semana, 6), { day: 'numeric', month: 'long', year: 'numeric' })}`

  return (
    <main className="page-main">
      <section className="page-heading">
        <p className="sobretitulo">ORGANIZE SEUS PRÓXIMOS PRATOS</p>
        <h1>Planejamento semanal</h1>
        <p>Escolha uma receita para cada refeição e reúna os ingredientes da semana.</p>
      </section>

      <section className="planejador" aria-label="Grade semanal de refeições">
        <div className="planejador__barra">
          <div className="planejador__navegacao">
            <button
              className="botao-icone"
              type="button"
              aria-label="Semana anterior"
              onClick={() => setSemana((atual) => somarDias(atual, -7))}
            >
              <ArrowLeft size={17} />
            </button>
            <h2>{intervaloSemana}</h2>
            <button
              className="botao-icone"
              type="button"
              aria-label="Próxima semana"
              onClick={() => setSemana((atual) => somarDias(atual, 7))}
            >
              <ArrowRight size={17} />
            </button>
          </div>
          <button
            className="botao botao--secundario"
            type="button"
            onClick={() => setSemana(inicioDaSemana(new Date()))}
          >
            <CalendarDays size={16} aria-hidden="true" /> Semana atual
          </button>
        </div>

        {erro && (
          <p className="mensagem-erro" role="alert">
            {erro}
          </p>
        )}

        {!carregado ? (
          <p className="lista-compras__carregando" role="status">
            Carregando seu planejamento...
          </p>
        ) : (
          <div className="planejador__grade">
            {dias.map((dia) => {
              const data = dataLocal(dia)
              return (
                <article className="planejador__dia" key={data}>
                  <header>
                    <h3>{formatarData(dia, { weekday: 'long' })}</h3>
                    <span>{formatarData(dia, { day: 'numeric', month: 'short' })}</span>
                  </header>
                  {refeicoes.map(({ id: refeicao, nome }) => {
                    const item = planejamento.find(
                      (atual) => atual.data === data && atual.refeicao === refeicao,
                    )
                    return (
                      <div className="planejador__refeicao" key={refeicao}>
                        <label htmlFor={`${data}-${refeicao}`}>{nome}</label>
                        <select
                          id={`${data}-${refeicao}`}
                          value={item?.receitaId ?? ''}
                          onChange={(evento) =>
                            void atualizarRefeicao(data, refeicao, evento.target.value)
                          }
                        >
                          <option value="">Escolher receita</option>
                          {receitas.map((receita) => (
                            <option key={receita.id} value={receita.id}>
                              {receita.titulo}
                            </option>
                          ))}
                        </select>
                        {item && (
                          <div className="planejador__porcoes">
                            <label htmlFor={`${data}-${refeicao}-porcoes`}>Porções</label>
                            <input
                              id={`${data}-${refeicao}-porcoes`}
                              type="number"
                              min="1"
                              step="1"
                              value={item.porcoes}
                              onChange={(evento) =>
                                void atualizarPorcoes(item, Number(evento.target.value))
                              }
                            />
                            <button
                              className="botao-icone botao-icone--pequeno"
                              type="button"
                              aria-label={`Remover ${nome.toLocaleLowerCase('pt-BR')} de ${formatarData(dia, { day: 'numeric', month: 'long' })}`}
                              onClick={() => void atualizarRefeicao(data, refeicao, '')}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </article>
              )
            })}
          </div>
        )}
      </section>

      <section className="planejador__compras" aria-labelledby="compras-semana-titulo">
        <div className="planejador__compras-cabecalho">
          <div>
            <p className="sobretitulo">INGREDIENTES SEM REPETIÇÃO</p>
            <h2 id="compras-semana-titulo">Lista da semana</h2>
          </div>
          <button
            className="botao"
            type="button"
            disabled={receitasPlanejadas.length === 0 || adicionando}
            onClick={() => void adicionarListaDaSemana()}
          >
            <ShoppingBasket size={17} aria-hidden="true" />
            {adicionando ? 'Adicionando...' : 'Adicionar à lista de compras'}
          </button>
        </div>
        {gruposDeCompras.length ? (
          <div className="planejador__lista">
            {gruposDeCompras.map((grupo) => (
              <div key={grupo.categoria}>
                <h3>{grupo.categoria}</h3>
                <ul>
                  {grupo.itens.map((item) => (
                    <li key={item.id}>{item.nome}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="planejador__vazio">
            Escolha receitas para ver os ingredientes consolidados.{' '}
            <Link to="/receitas">Explorar receitas</Link>
          </p>
        )}
      </section>
    </main>
  )
}
