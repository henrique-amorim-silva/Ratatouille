import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { RecipeDetailPage } from './RecipeDetailPage'

describe('RecipeDetailPage', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('volta ao início da página ao abrir uma receita', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    render(
      <MemoryRouter initialEntries={['/receitas/bolo-de-cenoura-com-chocolate']}>
        <Routes>
          <Route path="/receitas/:slug" element={<RecipeDetailPage />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(scrollTo).toHaveBeenCalledWith(0, 0)
  })

  it('exibe a imagem da receita na página de detalhes', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    render(
      <MemoryRouter initialEntries={['/receitas/bolo-de-cenoura-com-chocolate']}>
        <Routes>
          <Route path="/receitas/:slug" element={<RecipeDetailPage />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(
      screen.getAllByRole('img', { name: 'Bolo de cenoura com cobertura de chocolate' }).length,
    ).toBeGreaterThan(0)
  })
})
