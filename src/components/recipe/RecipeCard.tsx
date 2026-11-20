import { ArrowRight, Clock3, Heart, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Receita } from '../../types/recipe'

const capasPorReceita: Record<string, { emoji: string; classe: string }> = {
  'bolo-de-cenoura-com-chocolate': { emoji: '🍰', classe: 'capa--bolo' },
  'moqueca-de-banana-da-terra': { emoji: '🍲', classe: 'capa--moqueca' },
  'bowl-fit-de-frango-e-quinoa': { emoji: '🥗', classe: 'capa--bowl' },
}

interface RecipeCardProps {
  receita: Receita
  favorita?: boolean
  onAlternarFavorito?: (id: string) => void
}

export function RecipeCard({ receita, favorita, onAlternarFavorito }: RecipeCardProps) {
  const capa = capasPorReceita[receita.id] ?? { emoji: '🍽️', classe: 'capa--padrao' }

  return (
    <article className="cartao-receita">
      <div className={`cartao-receita__capa ${capa.classe}`}>
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
        <span className="cartao-receita__emoji" aria-hidden="true">
          {capa.emoji}
        </span>
        <span className="cartao-receita__decoracao" aria-hidden="true">
          ✳
        </span>
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
