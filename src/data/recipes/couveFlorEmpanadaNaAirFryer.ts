import type { Receita } from '../../types/recipe'

export const couveFlorEmpanadaNaAirFryer = {
  id: 'couve-flor-empanada-na-air-fryer',
  slug: 'couve-flor-empanada-na-air-fryer',
  titulo: 'Couve-flor empanada na air fryer',
  descricaoCurta: 'Buquês crocantes de couve-flor com cobertura dourada.',
  descricaoCompleta:
    'Couve-flor empanada com farinha e aveia, assada na air fryer até ficar crocante por fora e macia por dentro.',
  imagem: '/images/receitas/couve-flor-empanada-na-air-fryer.jpg',
  categoriaPrincipal: 'Acompanhamentos',
  categorias: ['Acompanhamentos', 'Lanches', 'Saudáveis', 'Air fryer'],
  subcategorias: ['Air fryer', 'Vegetariano'],
  tags: ['couve-flor', 'empanado', 'air fryer', 'vegetariano'],
  dificuldade: 'fácil',
  tempos: { preparoMinutos: 15, cozimentoMinutos: 18, totalMinutos: 33 },
  rendimentoBase: 4,
  rendimentoLabel: '4 porções',
  ingredientes: [
    {
      id: 'couve-flor',
      nome: 'couve-flor em buquês',
      quantidade: 600,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'ovo',
      nome: 'ovos batidos',
      quantidade: 2,
      unidade: 'unidades',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'aveia',
      nome: 'aveia em flocos finos',
      quantidade: 120,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'farinha',
      nome: 'farinha de trigo',
      quantidade: 40,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'paprica',
      nome: 'páprica doce',
      quantidade: 5,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'azeite',
      nome: 'azeite para pincelar',
      quantidade: 15,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'sal',
      nome: 'sal e pimenta-do-reino',
      quantidade: null,
      unidade: 'a gosto',
      opcional: false,
      indivisivel: false,
    },
  ],
  etapas: [
    {
      numero: 1,
      titulo: 'Prepare a empanada',
      descricao:
        'Misture a aveia com a páprica e o sal. Passe os buquês pela farinha, pelos ovos e finalize na mistura de aveia.',
      tempoMinutos: 10,
      ingredientesVinculados: ['couve-flor', 'ovo', 'aveia', 'farinha', 'paprica', 'sal'],
    },
    {
      numero: 2,
      titulo: 'Asse na air fryer',
      descricao:
        'Pincele os buquês com azeite e coloque-os na cesta sem sobreposição. Asse a 190 °C por 15 a 18 minutos, virando na metade.',
      tempoMinutos: 18,
      ingredientesVinculados: ['azeite', 'couve-flor'],
    },
  ],
  dicas: [
    'Deixe algum espaço entre os buquês para que a crosta fique uniforme.',
    'Sirva com iogurte natural temperado ou molho de tomate.',
  ],
  substituicoes: [
    {
      ingrediente: 'aveia em flocos finos',
      substituto: 'farinha de rosca integral',
      observacao: 'A casca ficará igualmente crocante.',
    },
  ],
  restricoesAlimentares: ['vegetariana'],
  tipoRefeicao: 'acompanhamento',
  ocasioes: ['lanche da tarde', 'jantar'],
} satisfies Receita
