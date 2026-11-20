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

test('exibe as novas opções fitness ao buscar pela categoria', async ({ page }) => {
  await page.goto('/receitas')
  await page.getByRole('searchbox', { name: 'Buscar receitas ou ingredientes' }).fill('fitness')

  await expect(page.getByText('5 receitas encontradas')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Pudim proteico individual' })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Hambúrguer de massa de pastel na air fryer' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Purê leve de couve-flor' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Overnight oats de banana' })).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Tofu salteado com legumes e arroz integral' }),
  ).toBeVisible()
})

test('exibe os modos de preparo atualizados das três receitas', async ({ page }) => {
  await page.goto('/receitas/hamburguer-de-massa-de-pastel')
  await expect(page.getByRole('heading', { name: 'Frite a carne na frigideira' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Enrole na massa de pastel' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Doure na air fryer' })).toBeVisible()

  await page.goto('/receitas/pudim-proteico-com-doce-de-leite')
  await expect(page.getByRole('heading', { name: 'Distribua nos potes de vidro' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Cozinhe em banho-maria no fogão' })).toBeVisible()
  await expect(page.getByText(/não use potes comuns nem vidro trincado/i)).toBeVisible()
  await expect(page.getByText('2 colheres de sopa')).toBeVisible()
  await expect(page.getByText('300 ml')).toBeVisible()

  await page.goto('/receitas/pure-de-couve-flor')
  await expect(
    page.getByRole('heading', { name: 'Bata com os temperos e a cremosidade' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Finalize com o queijo' })).toBeVisible()
  await expect(page.getByText(/couve-flor média separada em buquês/)).toBeVisible()
})

test('sorteia uma receita nova e mantém o tema escuro após recarregar', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Me surpreenda' }).click()
  const primeiraReceita = await page.locator('.receita-surpresa__resultado h3').textContent()
  await page.getByRole('button', { name: 'Sortear outra receita' }).click()
  const segundaReceita = await page.locator('.receita-surpresa__resultado h3').textContent()
  expect(segundaReceita).not.toBe(primeiraReceita)

  await page.getByRole('button', { name: 'Ativar modo escuro' }).click()
  await expect(page.locator('.app-shell')).toHaveAttribute('data-tema', 'escuro')
  await page.reload()
  await expect(page.locator('.app-shell')).toHaveAttribute('data-tema', 'escuro')
})

test('mostra recomendações e imprime apenas o conteúdo da receita', async ({ page }) => {
  await page.goto('/receitas/risoto-cremoso-de-cogumelos')

  await expect(page.getByRole('heading', { name: 'Você também pode gostar' })).toBeVisible()
  await expect(page.locator('.receitas-relacionadas .cartao-receita')).toHaveCount(3)
  await expect(page.getByRole('button', { name: 'Imprimir receita' })).toBeVisible()

  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('.site-header')).toBeHidden()
  await expect(page.locator('.detalhe-receita')).toBeVisible()
  await expect(page.locator('.receita-memoria')).toBeHidden()
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
  await page.getByRole('button', { name: 'Ativar modo escuro' }).click()
  const contrastePlaceholderEscuro = await page
    .locator('.catalogo__busca input')
    .evaluate((input) => {
      const shell = input.closest('.app-shell')
      if (!shell) throw new Error('Tema não encontrado para validar o placeholder.')
      return {
        texto: getComputedStyle(input, '::placeholder').color,
        fundo: getComputedStyle(shell).getPropertyValue('--app-surface').trim(),
      }
    })
  expect(
    calcularContraste(contrastePlaceholderEscuro.texto, contrastePlaceholderEscuro.fundo),
    'placeholder no tema escuro',
  ).toBeGreaterThanOrEqual(4.5)
  expect(Number.parseFloat(cores.duracaoTransicao)).toBeLessThanOrEqual(0.001)
  expect(
    await page
      .locator('img')
      .evaluateAll((imagens) => imagens.every((imagem) => imagem.hasAttribute('alt'))),
  ).toBe(true)
})
