import { expect, test } from '@playwright/test'

const slugBolo = 'bolo-de-cenoura-com-chocolate'
const tituloBolo = 'Bolo de cenoura com cobertura de chocolate'

function calcularContraste(texto: string, fundo: string): number {
  function canais(cor: string): number[] {
    if (cor.startsWith('#')) {
      const hexadecimal = cor.slice(1)
      return [0, 2, 4].map((inicio) => Number.parseInt(hexadecimal.slice(inicio, inicio + 2), 16))
    }
    const valores = cor.match(/\d+(?:\.\d+)?/g)
    if (!valores) throw new Error(`Cor não reconhecida: ${cor}`)
    return valores.slice(0, 3).map(Number)
  }
  function luminancia(cor: number[]) {
    const linear = cor.map((canal) => {
      const valor = canal / 255
      return valor <= 0.04045 ? valor / 12.92 : ((valor + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * linear[0]! + 0.7152 * linear[1]! + 0.0722 * linear[2]!
  }
  const primeiro = luminancia(canais(texto))
  const segundo = luminancia(canais(fundo))
  return (Math.max(primeiro, segundo) + 0.05) / (Math.min(primeiro, segundo) + 0.05)
}

test('busca e combina filtros de receita', async ({ page }) => {
  await page.goto('/receitas')

  await page.getByRole('searchbox', { name: 'Buscar receitas ou ingredientes' }).fill('cenoura')
  await page.getByRole('combobox', { name: 'Categoria' }).selectOption({ label: 'Sobremesas' })
  await page.getByRole('combobox', { name: 'Dificuldade' }).selectOption({ label: 'fácil' })
  await page.getByRole('spinbutton', { name: 'Até quantos minutos?' }).fill('60')

  await expect(page.getByRole('heading', { name: tituloBolo })).toBeVisible()
  await expect(page.getByText('1 receita encontrada')).toBeVisible()

  await page.getByRole('combobox', { name: 'Categoria' }).selectOption({ label: 'Bolos' })
  await expect(page.getByRole('heading', { name: tituloBolo })).toBeVisible()
})

test('ajusta porções, envia faltantes para compras e mantém a lista após recarregar', async ({
  page,
}) => {
  await page.goto(`/receitas/${slugBolo}`)
  await page.getByRole('button', { name: 'Aumentar porções' }).click()

  const ingredienteCenoura = page
    .locator('.lista-ingredientes--checklist li')
    .filter({ hasText: 'cenoura descascada e picada' })
  await expect(ingredienteCenoura.locator('strong')).toHaveText('275 g')
  await page.getByRole('checkbox', { name: 'cenoura descascada e picada' }).check()
  await page.getByRole('button', { name: 'Adicionar 7 faltantes à lista' }).click()
  await page.getByRole('link', { name: 'Compras' }).click()

  await expect(page.getByRole('heading', { name: 'Lista de compras' })).toBeVisible()
  await expect(page.getByText('330 g açúcar')).toBeVisible()
  await expect(page.getByText('275 g cenoura descascada e picada')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Para comprar 7' })).toBeVisible()

  await page.reload()
  await expect(page.getByText('330 g açúcar')).toBeVisible()
  await expect(page.getByText('275 g cenoura descascada e picada')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Para comprar 7' })).toBeVisible()
})

test('avança pelo modo cozinha e conclui o preparo', async ({ page }) => {
  await page.goto(`/receitas/${slugBolo}`)
  await page.getByRole('link', { name: 'Iniciar preparo passo a passo' }).click()

  await expect(page.getByRole('heading', { name: 'Prepare a massa' })).toBeVisible()
  await page.getByRole('button', { name: 'Próxima etapa' }).click()
  await expect(page.getByRole('heading', { name: 'Incorpore os secos' })).toBeVisible()
  await page.getByRole('button', { name: 'Próxima etapa' }).click()
  await expect(page.getByRole('heading', { name: 'Asse o bolo' })).toBeVisible()
  await page.getByRole('button', { name: 'Próxima etapa' }).click()
  await expect(page.getByRole('heading', { name: 'Faça a cobertura' })).toBeVisible()
  await page.getByRole('button', { name: 'Concluir preparo' }).click()

  await expect(page.getByRole('heading', { name: 'Preparo concluído!' })).toBeVisible()
})

test('valida rótulos, contraste, teclado, texto alternativo e movimento reduzido', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/receitas')

  await expect(
    page.getByRole('searchbox', { name: 'Buscar receitas ou ingredientes' }),
  ).toBeVisible()
  await expect(page.getByRole('combobox', { name: 'Categoria' })).toBeVisible()

  await page.keyboard.press('Tab')
  const marca = page.getByRole('link', { name: 'Ratatouille, página inicial' })
  await expect(marca).toBeFocused()
  await expect
    .poll(() =>
      marca.evaluate((element) => {
        const estilo = getComputedStyle(element)
        return { outlineStyle: estilo.outlineStyle, outlineWidth: estilo.outlineWidth }
      }),
    )
    .toEqual({ outlineStyle: 'solid', outlineWidth: '3px' })

  const cores = await page.locator('.catalogo__contador').evaluate((element) => {
    const shell = document.querySelector('.app-shell')
    const busca = document.querySelector('.catalogo__busca input')
    const botao = document.querySelector('.site-header__acao')
    const cartao = document.querySelector('.cartao-receita')
    if (!shell || !busca || !botao || !cartao) {
      throw new Error('Elementos necessários para validar acessibilidade não encontrados.')
    }
    const estilosShell = getComputedStyle(shell)
    const estilosBotao = getComputedStyle(botao)
    return {
      contrastes: [
        {
          nome: 'texto secundário',
          texto: getComputedStyle(element).color,
          fundo: estilosShell.getPropertyValue('--app-bg').trim(),
        },
        {
          nome: 'texto de placeholder',
          texto: getComputedStyle(busca, '::placeholder').color,
          fundo: estilosShell.getPropertyValue('--app-surface').trim(),
        },
        {
          nome: 'texto do botão',
          texto: estilosBotao.color,
          fundo: estilosBotao.backgroundColor,
        },
      ],
      duracaoTransicao: getComputedStyle(cartao).transitionDuration,
    }
  })

  for (const contraste of cores.contrastes) {
    expect(
      calcularContraste(contraste.texto, contraste.fundo),
      contraste.nome,
    ).toBeGreaterThanOrEqual(4.5)
  }
  expect(Number.parseFloat(cores.duracaoTransicao)).toBeLessThanOrEqual(0.001)
  expect(
    await page
      .locator('img')
      .evaluateAll((imagens) => imagens.every((imagem) => imagem.hasAttribute('alt'))),
  ).toBe(true)
})
