import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { CatalogPage } from '../pages/CatalogPage'
import { ConverterPage } from '../pages/ConverterPage'
import { FavoritesPage } from '../pages/FavoritesPage'
import { HomePage } from '../pages/HomePage'
import { PantryMatchPage } from '../pages/PantryMatchPage'
import { RecipeDetailPage } from '../pages/RecipeDetailPage'
import { ShoppingListPage } from '../pages/ShoppingListPage'
import { CookingModeView } from '../components/kitchen/CookingModeView'
import { receitas } from '../data/recipes'
import { useParams } from 'react-router-dom'

function CookingModeRoute() {
  const { slug } = useParams()
  const receita = receitas.find((item) => item.slug === slug)

  if (!receita) return <RecipeDetailPage />
  return <CookingModeView receita={receita} />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="receitas" element={<CatalogPage />} />
        <Route path="conversor" element={<ConverterPage />} />
        <Route path="despensa" element={<PantryMatchPage />} />
        <Route path="receitas/:slug" element={<RecipeDetailPage />} />
        <Route path="receitas/:slug/preparo" element={<CookingModeRoute />} />
        <Route path="favoritos" element={<FavoritesPage />} />
        <Route path="lista-de-compras" element={<ShoppingListPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
