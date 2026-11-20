import { ArrowRight, Leaf, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RecipeCard } from '../components/recipe/RecipeCard'
import { receitas } from '../data/recipes'
import { selecionarReceitaSurpresa } from '../domain/recipeDiscovery'
import type { Receita } from '../types/recipe'
import { useFavoritosStore } from '../store/favoritosStore'

const categoriasDestaque = [
  { nome: 'Pratos principais', emoji: '🍲' },
  { nome: 'Sobremesas', emoji: '🍰' },
  { nome: 'Saudáveis', emoji: '🥗' },
  { nome: 'Vegetarianas', emoji: '🥬' },
]

export function HomePage() {
  const [receitaSurpresa, setReceitaSurpresa] = useState<Receita | null>(null)
  const favoritos = useFavoritosStore((estado) => estado.favoritos)
  const alternarFavorito = useFavoritosStore((estado) => estado.alternarFavorito)
  const destaques = [receitas[0], receitas[1]].filter((receita) => receita !== undefined)
  const rapidas = receitas
    .filter((receita) => receita.tempos.totalMinutos <= 50)
    .sort((a, b) => a.tempos.totalMinutos - b.tempos.totalMinutos)
    .slice(0, 3)

  return (
    <main>
      <section className="hero">
        <div className="hero__conteudo">
          <p className="sobretitulo">
            <span aria-hidden="true">✳</span> COMIDA BOA, FEITA EM CASA
          </p>
          <h1>
            Um pouco de carinho
            <br />
            muda qualquer <em>receita.</em>
          </h1>
          <p className="hero__descricao">
            Ideias gostosas para o dia a dia, com ingredientes simples e instruções sem complicação.
          </p>
          <Link className="botao" to="/receitas">
            Encontrar minha próxima receita <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <div className="hero__nota">
            <span className="hero__nota-icone" aria-hidden="true">
              <Leaf size={17} />
            </span>
            <span>Receitas para cozinhar no seu ritmo.</span>
          </div>
        </div>
        <div className="hero__ilustracao" aria-hidden="true">
          <div className="hero__forma hero__forma--fundo" />
          <div className="hero__prato">
            <span>🥕</span>
            <span>🍅</span>
            <span>🥬</span>
            <span>🍋</span>
            <span className="hero__prato-centro">feito em casa</span>
          </div>
          <div className="hero__adesivo">
            <span>✦</span>
            simples
            <br />& gostoso
          </div>
          <span className="hero__pontinho hero__pontinho--um">✳</span>
          <span className="hero__pontinho hero__pontinho--dois">✳</span>
        </div>
      </section>

      <section className="receita-surpresa" aria-labelledby="receita-surpresa-titulo">
        <div className="receita-surpresa__conteudo">
          <p className="sobretitulo">SEM IDEIAS PARA HOJE?</p>
          <h2 id="receita-surpresa-titulo">O que vamos cozinhar hoje?</h2>
          <p>Deixe a cozinha escolher uma receita gostosa para você.</p>
          <button
            className="botao"
            type="button"
            onClick={() =>
              setReceitaSurpresa(selecionarReceitaSurpresa(receitas, receitaSurpresa?.id))
            }
          >
            <Sparkles size={17} aria-hidden="true" />
            {receitaSurpresa ? 'Sortear outra receita' : 'Me surpreenda'}
          </button>
        </div>
        {receitaSurpresa && (
          <div className="receita-surpresa__resultado" aria-live="polite">
            <RecipeCard
              favorita={favoritos.includes(receitaSurpresa.id)}
              onAlternarFavorito={alternarFavorito}
              receita={receitaSurpresa}
            />
          </div>
        )}
      </section>

      <section className="receitas home-section">
        <div className="receitas__cabecalho">
          <div>
            <p className="sobretitulo">PARA INSPIRAR</p>
            <h2>Escolhas da cozinha</h2>
            <p className="receitas__subtitulo">Receitas queridas para começar bem.</p>
          </div>
          <Link className="botao-abrir home-ver-todas" to="/receitas">
            Ver todas <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div className="grade-receitas">
          {destaques.map((receita) => (
            <RecipeCard
              favorita={favoritos.includes(receita.id)}
              key={receita.id}
              onAlternarFavorito={alternarFavorito}
              receita={receita}
            />
          ))}
        </div>
      </section>

      <section className="receitas home-section home-section--compact">
        <div className="receitas__cabecalho">
          <div>
            <p className="sobretitulo">SEM COMPLICAÇÃO</p>
            <h2>Rápidas para hoje</h2>
            <p className="receitas__subtitulo">Receitas prontas em até 50 minutos.</p>
          </div>
        </div>
        <div className="grade-receitas">
          {rapidas.map((receita) => (
            <RecipeCard
              favorita={favoritos.includes(receita.id)}
              key={receita.id}
              onAlternarFavorito={alternarFavorito}
              receita={receita}
            />
          ))}
        </div>
      </section>

      <section className="categorias-destaque">
        <div>
          <p className="sobretitulo">EXPLORE POR CATEGORIA</p>
          <h2>O que combina com você?</h2>
        </div>
        <div className="categorias-destaque__lista">
          {categoriasDestaque.map(({ nome, emoji }) => (
            <Link
              className="categoria-atalho"
              key={nome}
              to={`/receitas?categoria=${encodeURIComponent(nome)}`}
            >
              <span aria-hidden="true">{emoji}</span>
              <span>{nome}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className="faixa-final">
        <div className="faixa-final__icone" aria-hidden="true">
          ✿
        </div>
        <div>
          <p className="sobretitulo">SUA COZINHA, SUAS REGRAS</p>
          <h2>Receita boa é aquela que vira memória.</h2>
          <p>Comece pelo simples. O resto a gente aprende fazendo.</p>
        </div>
        <Link className="botao botao--claro" to="/receitas">
          Ver receitas <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </main>
  )
}
