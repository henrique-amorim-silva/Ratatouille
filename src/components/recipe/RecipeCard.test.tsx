import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { receitas } from '../../data/recipes'
import { RecipeCard } from './RecipeCard'

describe('RecipeCard', () => {
  it('exibe a imagem cadastrada da receita com texto alternativo', () => {
    const receita = receitas[0]
    const caminhoImagem = receita.imagem.startsWith('/')
      ? `${import.meta.env.BASE_URL}${receita.imagem.slice(1)}`
      : receita.imagem

    render(
      <MemoryRouter>
        <RecipeCard receita={receita} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('img', { name: receita.titulo })).toHaveAttribute(
      'src',
      caminhoImagem,
    )
  })
})
