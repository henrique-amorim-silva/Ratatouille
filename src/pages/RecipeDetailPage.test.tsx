import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { RecipeDetailPage } from './RecipeDetailPage'

describe('RecipeDetailPage', () => {
  afterEach(() => {
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
})
