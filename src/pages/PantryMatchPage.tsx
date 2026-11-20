import { useState, type FormEvent } from 'react'
import { ArrowRight, CookingPot, ShoppingBasket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { receitas } from '../data/recipes'
import { buscarReceitasComDespensa, type ResultadoBuscaDespensa } from '../domain/pantryMatch'
import { useListaComprasStore } from '../store/listaComprasStore'

function dividirIngredientes(texto: string): string[] {
  return texto
    .split(/[\n,;]+/)
    .map((ingrediente) => ingrediente.trim())
    .filter(Boolean)
}

function formatarIngrediente(resultado: ResultadoBuscaDespensa['ingredientesFaltantes'][number]) {
  if (resultado.quantidade === null) {
    return resultado.nome
  }

  return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(resultado.quantidade)} ${resultado.unidade} ${resultado.nome}`
}

export function PantryMatchPage() {
  const [disponiveisTexto, setDisponiveisTexto] = useState('')
  const [indesejadosTexto, setIndesejadosTexto] = useState('')
  const [resultados, setResultados] = useState<ResultadoBuscaDespensa[] | null>(null)
  const [erro, setErro] = useState('')
  const [adicionandoId, setAdicionandoId] = useState<string | null>(null)
  const adicionarItem = useListaComprasStore((estado) => estado.adicionarItem)

  function buscar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setErro('')
    setResultados(
      buscarReceitasComDespensa(
        receitas,
        dividirIngredientes(disponiveisTexto),
        dividirIngredientes(indesejadosTexto),
      ),
    )
  }

  async function adicionarFaltantes(resultado: ResultadoBuscaDespensa) {
    setErro('')
    setAdicionandoId(resultado.receita.id)
    try {
      for (const ingrediente of resultado.ingredientesFaltantes) {
        await adicionarItem(formatarIngrediente(ingrediente))
      }
    } catch (causa) {
      setErro(
        causa instanceof Error ? causa.message : 'Não foi possível atualizar a lista de compras.',
      )
    } finally {
      setAdicionandoId(null)
    }
  }

  return (
    <main className="page-main">
      <section className="page-heading">
        <p className="sobretitulo">APROVEITE O QUE JÁ TEM EM CASA</p>
        <h1>O que cozinhar hoje?</h1>
        <p>Conte o que tem na despensa e encontre receitas com menos ingredientes faltando.</p>
      </section>

      <form className="despensa-formulario" onSubmit={(evento) => void buscar(evento)}>
        <label>
          <span>O que você tem?</span>
          <textarea
            value={disponiveisTexto}
            onChange={(evento) => setDisponiveisTexto(evento.target.value)}
            placeholder={'Ex.: tomate, ovos, farinha\nSepare os ingredientes por vírgula ou linha.'}
            rows={4}
          />
        </label>
        <label>
          <span>
            Ingredientes que deseja evitar <small>(opcional)</small>
          </span>
          <textarea
            value={indesejadosTexto}
            onChange={(evento) => setIndesejadosTexto(evento.target.value)}
            placeholder="Ex.: amendoim, camarão"
            rows={2}
          />
        </label>
        <button className="botao" type="submit">
          <CookingPot size={17} aria-hidden="true" /> Encontrar receitas
        </button>
      </form>

      {erro && (
        <p className="mensagem-erro" role="alert">
          {erro}
        </p>
      )}

      {resultados && (
        <section className="despensa-resultados" aria-live="polite">
          <div className="despensa-resultados__cabecalho">
            <div>
              <p className="sobretitulo">IDEIAS PARA SUA COZINHA</p>
              <h2>{resultados.length} receitas encontradas</h2>
            </div>
            <p>Ordenadas por compatibilidade</p>
          </div>
          {resultados.length === 0 ? (
            <div className="estado-vazio">
              <span aria-hidden="true">🥣</span>
              <h2>Nenhuma receita por aqui</h2>
              <p>Experimente remover algum ingrediente da lista de itens a evitar.</p>
            </div>
          ) : (
            <div className="despensa-resultados__lista">
              {resultados.map((resultado) => (
                <article className="despensa-cartao" key={resultado.receita.id}>
                  <div className="despensa-cartao__cabecalho">
                    <div>
                      <p className="sobretitulo">{resultado.receita.categoriaPrincipal}</p>
                      <h2>{resultado.receita.titulo}</h2>
                    </div>
                    <strong
                      aria-label={`${resultado.percentualCompatibilidade}% de compatibilidade`}
                    >
                      {resultado.percentualCompatibilidade}%
                    </strong>
                  </div>
                  <p>{resultado.receita.descricaoCurta}</p>
                  <p className="despensa-cartao__faltantes">
                    {resultado.ingredientesFaltantes.length === 0
                      ? 'Você já tem tudo para preparar esta receita.'
                      : `Faltam: ${resultado.ingredientesFaltantes.map(({ nome }) => nome).join(', ')}.`}
                  </p>
                  <div className="despensa-cartao__acoes">
                    <Link className="botao-abrir" to={`/receitas/${resultado.receita.slug}`}>
                      Ver receita <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                    {resultado.ingredientesFaltantes.length > 0 && (
                      <button
                        className="botao botao--lista"
                        type="button"
                        disabled={adicionandoId !== null}
                        onClick={() => void adicionarFaltantes(resultado)}
                      >
                        <ShoppingBasket size={17} aria-hidden="true" />
                        {adicionandoId === resultado.receita.id
                          ? 'Adicionando...'
                          : 'Adicionar faltantes'}
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  )
}
