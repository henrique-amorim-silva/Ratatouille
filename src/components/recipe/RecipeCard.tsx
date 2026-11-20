import { ArrowRight, Clock3, Heart, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Receita } from '../../types/recipe'

interface RecipeCardProps {
  receita: Receita
  favorita?: boolean
  onAlternarFavorito?: (id: string) => void
}

export function RecipeCard({ receita, favorita, onAlternarFavorito }: RecipeCardProps) {
  const imagem = receita.imagem.startsWith('/')
    ? `${import.meta.env.BASE_URL}${receita.imagem.slice(1)}`
    : receita.imagem

  return (
    <article className="cartao-receita">
      <div className="cartao-receita__capa">
        <img
          className="cartao-receita__imagem"
          src={imagem}
          alt={receita.titulo}
          loading="lazy"
          decoding="async"
        />
        <span className="cartao-receita__categoria">{receita.categoriaPrincipal}</span>
        {onAlternarFavorito && (
          <button
            className={`cartao-receita__favorito${favorita ? ' cartao-receita__favorito--ativo' : ''}`}
            type="button"
            aria-label={favorita ? `Remover ${receita.titulo} dos favoritos` : `Favoritar ${receita.titulo}`}
            aria-pressed={favorita}
            onClick={() => onAlternarFavorito(receita.id)}
          >
            <Heart size={17} fill={favorita ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>
      <div className="cartao-receita__conteudo">
        <div className="cartao-receita__detalhes">
          <span>
            <Clock3 size={15} aria-hidden="true" /> {receita.tempos.totalMinutos} min
          </span>
          <span>
            <UsersRound size={15} aria-hidden="true" /> {receita.rendimentoLabel}
          </span>
        </div>
        <h3>{receita.titulo}</h3>
        <p>{receita.descricaoCurta}</p>
        <div className="cartao-receita__rodape">
          <span className="etiqueta-dificuldade">{receita.dificuldade}</span>
          <Link className="botao-abrir" to={`/receitas/${receita.slug}`}>
            Ver receita <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
