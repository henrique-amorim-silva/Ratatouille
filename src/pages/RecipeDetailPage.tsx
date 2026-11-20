import { useState } from 'react'
import { ArrowLeft, Heart, Minus, Plus, ShoppingBasket, UsersRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { receitas } from '../data/recipes'
import { ajustarPorcoes } from '../domain/portions'
import { useFavoritosStore } from '../store/favoritosStore'
import { useListaComprasStore } from '../store/listaComprasStore'

function RecipeDetailContent({ receita }: { receita: (typeof receitas)[number] }) {
  const [porcoes, setPorcoes] = useState(receita.rendimentoBase)
  const [ingredientesDisponiveis, setIngredientesDisponiveis] = useState<string[]>([])
  const [erro, setErro] = useState('')
  const [adicionando, setAdicionando] = useState(false)
  const favorito = useFavoritosStore((estado) => estado.favoritos.includes(receita.id))
  const alternarFavorito = useFavoritosStore((estado) => estado.alternarFavorito)
  const adicionarItem = useListaComprasStore((estado) => estado.adicionarItem)
  const ajuste = ajustarPorcoes(receita, porcoes)
  const faltantes = ajuste.ingredientes.filter(
    (ingrediente) => !ingredientesDisponiveis.includes(ingrediente.id),
  )

  async function adicionarFaltantes() {
    setErro('')
    setAdicionando(true)
    try {
      for (const ingrediente of faltantes) {
        const quantidade = ingrediente.quantidadeFormatada
          ? `${ingrediente.quantidadeFormatada} ${ingrediente.unidade} `
          : ''
        await adicionarItem(`${quantidade}${ingrediente.nome}`)
      }
    } catch (causa) {
      setErro(causa instanceof Error ? causa.message : 'Não foi possível atualizar a lista de compras.')
    } finally {
      setAdicionando(false)
    }
  }

  return (
    <main className="page-main">
      <Link className="voltar-link" to="/receitas">
        <ArrowLeft size={17} aria-hidden="true" /> Voltar para receitas
      </Link>
      <article className="detalhe-receita">
        <header className="detalhe-receita__cabecalho">
          <div>
            <p className="sobretitulo">{receita.categoriaPrincipal}</p>
            <h1>{receita.titulo}</h1>
            <p>{receita.descricaoCompleta}</p>
            <div className="detalhe-receita__metadados">
              <span>{receita.tempos.totalMinutos} min</span>
              <span>{receita.dificuldade}</span>
              <span>{receita.rendimentoLabel}</span>
            </div>
          </div>
          <button
            className={`botao botao--favorito${favorito ? ' botao--favorito-ativo' : ''}`}
            type="button"
            aria-pressed={favorito}
            onClick={() => alternarFavorito(receita.id)}
          >
            <Heart size={18} fill={favorito ? 'currentColor' : 'none'} aria-hidden="true" />
            {favorito ? 'Favoritada' : 'Favoritar'}
          </button>
        </header>

        <div className="detalhe-receita__colunas">
          <section className="painel-ingredientes" aria-labelledby="ingredientes-titulo">
            <div className="painel-ingredientes__titulo">
              <div>
                <p className="sobretitulo">PREPARE SEUS INGREDIENTES</p>
                <h2 id="ingredientes-titulo">Ingredientes</h2>
              </div>
              <div className="controle-porcoes" aria-label="Ajustar número de porções">
                <UsersRound size={16} aria-hidden="true" />
                <button
                  type="button"
                  aria-label="Diminuir porções"
                  disabled={porcoes <= 1}
                  onClick={() => setPorcoes((atual) => Math.max(1, atual - 1))}
                >
                  <Minus size={15} />
                </button>
                <strong aria-live="polite">{porcoes}</strong>
                <button
                  type="button"
                  aria-label="Aumentar porções"
                  onClick={() => setPorcoes((atual) => atual + 1)}
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>
            <ul className="lista-ingredientes lista-ingredientes--checklist">
              {ajuste.ingredientes.map((ingrediente) => (
                <li key={ingrediente.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={ingredientesDisponiveis.includes(ingrediente.id)}
                      onChange={(evento) =>
                        setIngredientesDisponiveis((atuais) =>
                          evento.target.checked
                            ? [...atuais, ingrediente.id]
                            : atuais.filter((id) => id !== ingrediente.id),
                        )
                      }
                    />
                    <span>{ingrediente.nome}</span>
                  </label>
                  <strong>
                    {ingrediente.quantidadeFormatada
                      ? `${ingrediente.quantidadeFormatada} ${ingrediente.unidade}`
                      : 'a gosto'}
                  </strong>
                </li>
              ))}
            </ul>
            {ajuste.avisos.map((aviso) => (
              <p className="aviso-porcao" key={aviso.ingrediente}>
                {aviso.mensagem}
              </p>
            ))}
            <button
              className="botao botao--lista"
              type="button"
              disabled={faltantes.length === 0 || adicionando}
              onClick={() => void adicionarFaltantes()}
            >
              <ShoppingBasket size={17} aria-hidden="true" />
              {adicionando
                ? 'Adicionando...'
                : faltantes.length === 0
                  ? 'Todos os ingredientes estão separados'
                  : `Adicionar ${faltantes.length} faltantes à lista`}
            </button>
            {erro && (
              <p className="mensagem-erro" role="alert">
                {erro}
              </p>
            )}
          </section>

          <section className="painel-preparo">
            <p className="sobretitulo">MODO DE PREPARO</p>
            <h2>Vamos cozinhar</h2>
            <ol className="lista-etapas">
              {receita.etapas.map((etapa) => (
                <li key={etapa.numero}>
                  <span>{String(etapa.numero).padStart(2, '0')}</span>
                  <div>
                    {etapa.titulo && <h3>{etapa.titulo}</h3>}
                    <p>{etapa.descricao}</p>
                  </div>
                </li>
              ))}
            </ol>
            {receita.dicas.length > 0 && (
              <aside className="dicas-receita">
                <h3>Dica da cozinha</h3>
                <p>{receita.dicas[0]}</p>
              </aside>
            )}
          </section>
        </div>
      </article>
    </main>
  )
}

export function RecipeDetailPage() {
  const { slug } = useParams()
  const receita = receitas.find((item) => item.slug === slug)

  if (!receita) {
    return (
      <main className="page-main estado-vazio">
        <span aria-hidden="true">🔎</span>
        <h1>Receita não encontrada</h1>
        <p>Talvez ela tenha sido movida ou o endereço esteja incorreto.</p>
        <Link className="botao" to="/receitas">
          Explorar receitas
        </Link>
      </main>
    )
  }

  return <RecipeDetailContent receita={receita} />
}
