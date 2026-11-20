import { Link } from 'react-router-dom'
import { RecipeCard } from '../components/recipe/RecipeCard'
import { receitas } from '../data/recipes'
import { useFavoritosStore } from '../store/favoritosStore'

export function FavoritesPage() {
  const favoritos = useFavoritosStore((estado) => estado.favoritos)
  const alternarFavorito = useFavoritosStore((estado) => estado.alternarFavorito)
  const receitasFavoritas = receitas.filter((receita) => favoritos.includes(receita.id))

  return (
    <main className="page-main">
      <section className="page-heading">
        <p className="sobretitulo">SUAS ESCOLHAS</p>
        <h1>Receitas favoritas</h1>
        <p>Guarde por aqui as receitas que você quer preparar de novo.</p>
      </section>
      {receitasFavoritas.length > 0 ? (
        <div className="grade-receitas">
          {receitasFavoritas.map((receita) => (
            <RecipeCard
              favorita
              key={receita.id}
              onAlternarFavorito={alternarFavorito}
              receita={receita}
            />
          ))}
        </div>
      ) : (
        <div className="estado-vazio">
          <span aria-hidden="true">♡</span>
          <h2>Seu caderno está esperando</h2>
          <p>Toque no coração de uma receita para salvá-la aqui.</p>
          <Link className="botao" to="/receitas">
            Explorar receitas
          </Link>
        </div>
      )}
    </main>
  )
}
