import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { KitchenTimer } from './KitchenTimer'

describe('KitchenTimer', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('calcula o restante pelo relógio real mesmo após um salto de tempo', () => {
    vi.useFakeTimers()
    render(<KitchenTimer minutos={1} />)

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar' }))
    expect(screen.getByLabelText('Tempo restante: 01:00')).toBeInTheDocument()

    act(() => {
      vi.setSystemTime(Date.now() + 60_000)
      vi.advanceTimersByTime(250)
    })

    expect(screen.getByText('Tempo da etapa concluído.')).toBeInTheDocument()
    expect(screen.getByLabelText('Tempo restante: 00:00')).toBeInTheDocument()
  })
})
