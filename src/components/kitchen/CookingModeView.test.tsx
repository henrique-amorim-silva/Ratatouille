import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { receitas } from '../../data/recipes'
import { CookingModeView } from './CookingModeView'

describe('CookingModeView', () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, 'wakeLock')
  })

  it('mostra uma etapa por vez e avança sob comando', () => {
    render(
      <MemoryRouter>
        <CookingModeView receita={receitas[0]} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Prepare a massa' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Incorpore os secos' })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Próxima etapa' }))

    expect(screen.getByRole('heading', { name: 'Incorpore os secos' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Prepare a massa' })).not.toBeInTheDocument()
  })

  it('solicita e libera a Screen Wake Lock API', async () => {
    const release = vi.fn().mockResolvedValue(undefined)
    const request = vi.fn().mockResolvedValue({ released: false, release })
    Object.defineProperty(navigator, 'wakeLock', {
      configurable: true,
      value: { request },
    })
    const { unmount } = render(
      <MemoryRouter>
        <CookingModeView receita={receitas[0]} />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Manter tela ligada' }))

    await waitFor(() => expect(request).toHaveBeenCalledWith('screen'))
    unmount()

    expect(release).toHaveBeenCalledOnce()
  })
})
