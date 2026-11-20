import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { RecipeCard } from '../components/recipe/RecipeCard'
import { receitas } from '../data/recipes'
import { buscarEFiltrarReceitas } from '../domain/searchAndFilter'
import type { DificuldadeReceita } from '../types/recipe'
import { useFavoritosStore } from '../store/favoritosStore'

const categorias = [...new Set(receitas.flatMap((receita) => receita.categorias))]
const dificuldades: DificuldadeReceita[] = ['fácil', 'média', 'difícil']

export function CatalogPage() {
  const [searchParams] = useSearchParams()
  const [consulta, setConsulta] = useState('')
  const [categoria, setCategoria] = useState(searchParams.get('categoria') ?? '')
  const [dificuldade, setDificuldade] = useState<DificuldadeReceita | ''>('')
  const [tempoMaximo, setTempoMaximo] = useState('')
  const [ingrediente, setIngrediente] = useState('')
  const [ordenarPor, setOrdenarPor] = useState<'titulo' | 'tempo' | 'rendimento'>('titulo')
  const [ordem, setOrdem] = useState<'asc' | 'desc'>('asc')
  const favoritos = useFavoritosStore((estado) => estado.favoritos)
  const alternarFavorito = useFavoritosStore((estado) => estado.alternarFavorito)
  const tempoMaximoNumero = tempoMaximo === '' ? undefined : Number(tempoMaximo)
  const tempoInvalido =
    tempoMaximoNumero !== undefined &&
    (!Number.isFinite(tempoMaximoNumero) || tempoMaximoNumero < 0)

  const receitasVisiveis = useMemo(
    () => {
      if (tempoInvalido) {
        return []
      }

      return buscarEFiltrarReceitas(receitas, {
        consulta,
        categoria: categoria || undefined,
        dificuldade: dificuldade || undefined,
        tempoMaximoMinutos: tempoMaximoNumero,
        ingredientes: ingrediente.trim() ? [ingrediente.trim()] : undefined,
        ordenarPor,
        ordem,
      })
    },
    [categoria, consulta, dificuldade, ingrediente, ordem, ordenarPor, tempoInvalido, tempoMaximoNumero],
  )

  return (
    <main className="page-main">
      <section className="page-heading">
        <p className="sobretitulo">SEU PRÓXIMO PRATO FAVORITO</p>
        <h1>Explore as receitas</h1>
        <p>Busque, combine filtros e encontre algo gostoso para preparar.</p>
      </section>

      <section className="catalogo">
        <label className="busca catalogo__busca">
          <Search size={19} aria-hidden="true" />
          <span className="sr-only">Buscar receitas ou ingredientes</span>
          <input
            type="search"
            placeholder="Buscar receita ou ingrediente"
            value={consulta}
            onChange={(evento) => setConsulta(evento.target.value)}
          />
          {consulta && (
            <button
              className="busca__limpar"
              type="button"
              aria-label="Limpar busca"
              onClick={() => setConsulta('')}
            >
              <X size={17} />
            </button>
          )}
        </label>

        <div className="catalogo__filtros">
          <label>
            <span>Categoria</span>
            <select value={categoria} onChange={(evento) => setCategoria(evento.target.value)}>
              <option value="">Todas</option>
              {categorias.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Dificuldade</span>
            <select
              value={dificuldade}
              onChange={(evento) => setDificuldade(evento.target.value as DificuldadeReceita | '')}
            >
              <option value="">Todas</option>
              {dificuldades.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Até quantos minutos?</span>
            <input
              min="0"
              type="number"
              inputMode="numeric"
              placeholder="Sem limite"
              value={tempoMaximo}
              onChange={(evento) => setTempoMaximo(evento.target.value)}
            />
            {tempoInvalido && (
              <span className="campo-erro" role="alert">
                Informe um tempo igual ou maior que zero.
              </span>
            )}
          </label>
          <label>
            <span>Ingrediente</span>
            <input
              type="search"
              placeholder="Ex.: tomate"
              value={ingrediente}
              onChange={(evento) => setIngrediente(evento.target.value)}
            />
          </label>
          <label>
            <span>Ordenar por</span>
            <select
              value={ordenarPor}
              onChange={(evento) =>
                setOrdenarPor(evento.target.value as 'titulo' | 'tempo' | 'rendimento')
              }
            >
              <option value="titulo">Nome</option>
              <option value="tempo">Tempo de preparo</option>
              <option value="rendimento">Porções</option>
            </select>
          </label>
          <label>
            <span>Ordem</span>
            <select value={ordem} onChange={(evento) => setOrdem(evento.target.value as 'asc' | 'desc')}>
              <option value="asc">Crescente</option>
              <option value="desc">Decrescente</option>
            </select>
          </label>
        </div>

        <p className="catalogo__contador" aria-live="polite">
          {receitasVisiveis.length} {receitasVisiveis.length === 1 ? 'receita encontrada' : 'receitas encontradas'}
        </p>
        {receitasVisiveis.length > 0 ? (
          <div className="grade-receitas">
            {receitasVisiveis.map((receita) => (
              <RecipeCard
                favorita={favoritos.includes(receita.id)}
                key={receita.id}
                onAlternarFavorito={alternarFavorito}
                receita={receita}
              />
            ))}
          </div>
        ) : (
          <div className="estado-vazio">
            <span aria-hidden="true">🍽️</span>
            <h2>Nenhuma receita por aqui</h2>
            <p>Tente outro termo ou ajuste os filtros da busca.</p>
            <button
              className="botao botao--secundario"
              type="button"
              onClick={() => {
                setConsulta('')
                setCategoria('')
                setDificuldade('')
                setTempoMaximo('')
                setIngrediente('')
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
