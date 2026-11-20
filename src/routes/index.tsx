import { Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { CatalogPage } from '../pages/CatalogPage'
import { FavoritesPage } from '../pages/FavoritesPage'
import { HomePage } from '../pages/HomePage'
import { PantryMatchPage } from '../pages/PantryMatchPage'
import { RecipeDetailPage } from '../pages/RecipeDetailPage'
import { ShoppingListPage } from '../pages/ShoppingListPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="receitas" element={<CatalogPage />} />
        <Route path="despensa" element={<PantryMatchPage />} />
        <Route path="receitas/:slug" element={<RecipeDetailPage />} />
        <Route path="favoritos" element={<FavoritesPage />} />
        <Route path="lista-de-compras" element={<ShoppingListPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
