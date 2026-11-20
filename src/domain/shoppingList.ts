export interface ItemListaComprasEntrada {
  id: string
  nome: string
  comprado: boolean
}

export interface ItemCompraConsolidado {
  id: string
  nome: string
  comprado: boolean
  idsOriginais: string[]
}

export interface GrupoListaCompras {
  categoria: string
  itens: ItemCompraConsolidado[]
}

interface Unidade {
  alias: string
  chave: string
  rotulo: string
  fator: number
  dimensao?: 'massa' | 'volume'
  plural?: string
}

interface ItemInterpretado {
  nome: string
  chaveNome: string
  quantidade: number | null
  unidade: Unidade | null
}

const unidades: Unidade[] = [
  {
    alias: 'colheres de sopa',
    chave: 'colher-sopa',
    rotulo: 'colher de sopa',
    fator: 1,
    plural: 'colheres de sopa',
  },
  {
    alias: 'colher de sopa',
    chave: 'colher-sopa',
    rotulo: 'colher de sopa',
    fator: 1,
    plural: 'colheres de sopa',
  },
  {
    alias: 'colheres de chá',
    chave: 'colher-cha',
    rotulo: 'colher de chá',
    fator: 1,
    plural: 'colheres de chá',
  },
  {
    alias: 'colher de chá',
    chave: 'colher-cha',
    rotulo: 'colher de chá',
    fator: 1,
    plural: 'colheres de chá',
  },
  { alias: 'colheres', chave: 'colher', rotulo: 'colher', fator: 1, plural: 'colheres' },
  { alias: 'colher', chave: 'colher', rotulo: 'colher', fator: 1, plural: 'colheres' },
  { alias: 'unidades', chave: 'unidade', rotulo: 'unidade', fator: 1, plural: 'unidades' },
  { alias: 'unidade', chave: 'unidade', rotulo: 'unidade', fator: 1, plural: 'unidades' },
  { alias: 'un', chave: 'unidade', rotulo: 'unidade', fator: 1, plural: 'unidades' },
  { alias: 'quilogramas', chave: 'massa', rotulo: 'kg', fator: 1000, dimensao: 'massa' },
  { alias: 'quilograma', chave: 'massa', rotulo: 'kg', fator: 1000, dimensao: 'massa' },
  { alias: 'gramas', chave: 'massa', rotulo: 'g', fator: 1, dimensao: 'massa' },
  { alias: 'grama', chave: 'massa', rotulo: 'g', fator: 1, dimensao: 'massa' },
  { alias: 'kg', chave: 'massa', rotulo: 'kg', fator: 1000, dimensao: 'massa' },
  { alias: 'g', chave: 'massa', rotulo: 'g', fator: 1, dimensao: 'massa' },
  { alias: 'mililitros', chave: 'volume', rotulo: 'ml', fator: 1, dimensao: 'volume' },
  { alias: 'mililitro', chave: 'volume', rotulo: 'ml', fator: 1, dimensao: 'volume' },
  { alias: 'litros', chave: 'volume', rotulo: 'l', fator: 1000, dimensao: 'volume' },
  { alias: 'litro', chave: 'volume', rotulo: 'l', fator: 1000, dimensao: 'volume' },
  { alias: 'ml', chave: 'volume', rotulo: 'ml', fator: 1, dimensao: 'volume' },
  { alias: 'l', chave: 'volume', rotulo: 'l', fator: 1000, dimensao: 'volume' },
  { alias: 'xícaras', chave: 'xicara', rotulo: 'xícara', fator: 1, plural: 'xícaras' },
  { alias: 'xícara', chave: 'xicara', rotulo: 'xícara', fator: 1, plural: 'xícaras' },
  { alias: 'dentes', chave: 'dente', rotulo: 'dente', fator: 1, plural: 'dentes' },
  { alias: 'dente', chave: 'dente', rotulo: 'dente', fator: 1, plural: 'dentes' },
  { alias: 'latas', chave: 'lata', rotulo: 'lata', fator: 1, plural: 'latas' },
  { alias: 'lata', chave: 'lata', rotulo: 'lata', fator: 1, plural: 'latas' },
  { alias: 'pacotes', chave: 'pacote', rotulo: 'pacote', fator: 1, plural: 'pacotes' },
  { alias: 'pacote', chave: 'pacote', rotulo: 'pacote', fator: 1, plural: 'pacotes' },
  { alias: 'pitadas', chave: 'pitada', rotulo: 'pitada', fator: 1, plural: 'pitadas' },
  { alias: 'pitada', chave: 'pitada', rotulo: 'pitada', fator: 1, plural: 'pitadas' },
  { alias: 'ramos', chave: 'ramo', rotulo: 'ramo', fator: 1, plural: 'ramos' },
  { alias: 'ramo', chave: 'ramo', rotulo: 'ramo', fator: 1, plural: 'ramos' },
  { alias: 'folhas', chave: 'folha', rotulo: 'folha', fator: 1, plural: 'folhas' },
  { alias: 'folha', chave: 'folha', rotulo: 'folha', fator: 1, plural: 'folhas' },
]

const categorias = [
  'Hortifruti',
  'Açougue e peixaria',
  'Laticínios e ovos',
  'Mercearia',
  'Temperos',
  'Outros',
]

function normalizarTexto(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim()
}

function normalizarNome(texto: string): string {
  return normalizarTexto(texto)
    .replace(/^de\s+/, '')
    .split(/\s+/)
    .map((palavra) => {
      if (palavra.length > 4 && palavra.endsWith('ões')) {
        return `${palavra.slice(0, -3)}ao`
      }
      if (palavra.length > 4 && palavra.endsWith('ais')) {
        return `${palavra.slice(0, -3)}al`
      }
      return palavra.length > 4 && palavra.endsWith('s') ? palavra.slice(0, -1) : palavra
    })
    .join(' ')
}

function interpretarItem(nome: string): ItemInterpretado {
  const correspondencia = nome.trim().match(/^(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:[.,]\d+)?)\s*(.*)$/)

  if (!correspondencia) {
    return { nome: nome.trim(), chaveNome: normalizarNome(nome), quantidade: null, unidade: null }
  }

  const quantidadeTexto = correspondencia[1]
  const restante = correspondencia[2]?.trim() ?? ''
  let quantidade: number

  if (quantidadeTexto.includes('/')) {
    const partes = quantidadeTexto.split(/\s+/)
    const fracao = partes[partes.length - 1]?.split('/') ?? []
    const numerador = Number(fracao[0])
    const denominador = Number(fracao[1])

    if (!denominador) {
      return { nome: nome.trim(), chaveNome: normalizarNome(nome), quantidade: null, unidade: null }
    }

    quantidade = numerador / denominador + (partes.length > 1 ? Number(partes[0]) : 0)
  } else {
    quantidade = Number(quantidadeTexto.replace(',', '.'))
  }

  const restanteNormalizado = normalizarTexto(restante)
  const unidade = [...unidades]
    .sort((a, b) => b.alias.length - a.alias.length)
    .find((item) => {
      const alias = normalizarTexto(item.alias)
      return restanteNormalizado === alias || restanteNormalizado.startsWith(`${alias} `)
    })

  if (!unidade) {
    return {
      nome: restante || nome.trim(),
      chaveNome: normalizarNome(restante || nome),
      quantidade,
      unidade: null,
    }
  }

  const nomeIngrediente = restante.slice(unidade.alias.length).trim()
  return {
    nome: nomeIngrediente || restante,
    chaveNome: normalizarNome(nomeIngrediente || restante),
    quantidade,
    unidade,
  }
}

function categoriaDoIngrediente(nome: string): string {
  const ingrediente = normalizarTexto(nome)
  const pertence = (termos: string[]) => termos.some((termo) => ingrediente.includes(termo))

  if (
    pertence([
      'cenoura',
      'banana',
      'tomate',
      'pepino',
      'rucula',
      'limao',
      'cebola',
      'alho',
      'pimentao',
      'batata',
      'abobrinha',
      'salsinha',
      'coentro',
      'manjericao',
      'folha',
    ])
  ) {
    return 'Hortifruti'
  }
  if (pertence(['frango', 'carne', 'peixe', 'camarao', 'bovina', 'suina'])) {
    return 'Açougue e peixaria'
  }
  if (pertence(['leite', 'queijo', 'manteiga', 'iogurte', 'creme de leite', 'ovo'])) {
    return 'Laticínios e ovos'
  }
  if (pertence(['sal', 'pimenta', 'canela', 'paprica', 'cominho', 'oregano', 'noz-moscada'])) {
    return 'Temperos'
  }
  if (
    pertence([
      'acucar',
      'farinha',
      'arroz',
      'feijao',
      'quinoa',
      'oleo',
      'azeite',
      'chocolate',
      'fermento',
      'mostarda',
      'vinagre',
      'leite de coco',
      'agua',
    ])
  ) {
    return 'Mercearia'
  }
  return 'Outros'
}

function formatarQuantidade(quantidade: number): string {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(quantidade)
}

function formatarItem(
  nomeOriginal: string,
  interpretado: ItemInterpretado,
  quantidadeTotal: number | null,
): string {
  if (quantidadeTotal === null) {
    return nomeOriginal
  }

  let quantidade = quantidadeTotal
  let unidade = interpretado.unidade

  if (unidade?.dimensao === 'massa') {
    if (quantidade >= 1000) {
      quantidade /= 1000
      unidade = { ...unidade, rotulo: 'kg' }
    } else {
      unidade = { ...unidade, rotulo: 'g' }
    }
  } else if (unidade?.dimensao === 'volume') {
    if (quantidade >= 1000) {
      quantidade /= 1000
      unidade = { ...unidade, rotulo: 'l' }
    } else {
      unidade = { ...unidade, rotulo: 'ml' }
    }
  }

  if (!unidade) {
    return `${formatarQuantidade(quantidade)} ${interpretado.nome}`
  }

  const rotulo = quantidade === 1 ? unidade.rotulo : (unidade.plural ?? unidade.rotulo)
  return `${formatarQuantidade(quantidade)} ${rotulo} ${interpretado.nome}`
}

export function consolidarListaCompras(
  itens: readonly ItemListaComprasEntrada[],
): GrupoListaCompras[] {
  const consolidados = new Map<
    string,
    {
      nomeOriginal: string
      interpretado: ItemInterpretado
      quantidade: number | null
      ids: string[]
      comprado: boolean
    }
  >()

  for (const item of itens) {
    const interpretado = interpretarItem(item.nome)
    const unidadeChave =
      interpretado.unidade?.chave ??
      (interpretado.quantidade === null ? 'sem-quantidade' : 'sem-unidade')
    const chave = [
      interpretado.chaveNome,
      unidadeChave,
      item.comprado ? 'comprado' : 'pendente',
    ].join('|')
    const atual = consolidados.get(chave)

    if (atual) {
      atual.ids.push(item.id)
      if (atual.quantidade !== null && interpretado.quantidade !== null) {
        atual.quantidade += interpretado.quantidade * (interpretado.unidade?.fator ?? 1)
      } else {
        atual.quantidade = null
      }
    } else {
      consolidados.set(chave, {
        nomeOriginal: item.nome,
        interpretado,
        quantidade:
          interpretado.quantidade === null
            ? null
            : interpretado.quantidade * (interpretado.unidade?.fator ?? 1),
        ids: [item.id],
        comprado: item.comprado,
      })
    }
  }

  const porCategoria = new Map<string, ItemCompraConsolidado[]>()

  for (const [chave, item] of consolidados) {
    const categoria = categoriaDoIngrediente(item.interpretado.nome)
    const grupo = porCategoria.get(categoria) ?? []
    grupo.push({
      id: chave,
      nome: formatarItem(item.nomeOriginal, item.interpretado, item.quantidade),
      comprado: item.comprado,
      idsOriginais: item.ids,
    })
    porCategoria.set(categoria, grupo)
  }

  return categorias
    .filter((categoria) => porCategoria.has(categoria))
    .map((categoria) => ({
      categoria,
      itens: (porCategoria.get(categoria) ?? []).sort((a, b) =>
        a.nome.localeCompare(b.nome, 'pt-BR'),
      ),
    }))
}
