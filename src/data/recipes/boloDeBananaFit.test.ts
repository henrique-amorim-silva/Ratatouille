import { describe, expect, it } from 'vitest'
import { boloDeBananaFit } from './boloDeBananaFit'

describe('boloDeBananaFit', () => {
  it('usa somente os quatro ingredientes solicitados', () => {
    expect(boloDeBananaFit.ingredientes.map(({ nome }) => nome)).toEqual([
      'bananas maduras',
      'farinha de aveia',
      'ovo',
      'fermento em pó',
    ])
  })
})
