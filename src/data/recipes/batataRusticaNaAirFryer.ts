import type { Receita } from '../../types/recipe'

export const batataRusticaNaAirFryer = {
  id: 'batata-rustica-na-air-fryer',
  slug: 'batata-rustica-na-air-fryer',
  titulo: 'Batata rústica crocante na air fryer',
  descricaoCurta: 'Batatas douradas com alecrim e páprica.',
  descricaoCompleta:
    'Acompanhamento crocante por fora e macio por dentro, temperado com alho, páprica e alecrim.',
  imagem: '/images/receitas/batata-rustica-na-air-fryer.jpg',
  categoriaPrincipal: 'Acompanhamentos',
  categorias: ['Acompanhamentos', 'Saudáveis', 'Air fryer'],
  subcategorias: ['Air fryer', 'Batata'],
  tags: ['batata rústica', 'air fryer', 'crocante', 'acompanhamento'],
  dificuldade: 'fácil',
  tempos: { preparoMinutos: 10, cozimentoMinutos: 35, totalMinutos: 45 },
  rendimentoBase: 4,
  rendimentoLabel: '4 porções',
  ingredientes: [
    {
      id: 'batata',
      nome: 'batatas médias cortadas em gomos',
      quantidade: 800,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'azeite',
      nome: 'azeite',
      quantidade: 20,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'alho',
      nome: 'dentes de alho picados',
      quantidade: 3,
      unidade: 'unidades',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'paprica',
      nome: 'páprica defumada',
      quantidade: 5,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'alecrim',
      nome: 'alecrim fresco picado',
      quantidade: 5,
      unidade: 'g',
      opcional: true,
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
      titulo: 'Cozinhe as batatas',
      descricao:
        'Corte as batatas em gomos e cozinhe em água fervente com uma pitada de sal por 8 a 10 minutos, até ficarem macias por fora e ainda firmes no centro.',
      tempoMinutos: 10,
      ingredientesVinculados: ['batata', 'sal'],
    },
    {
      numero: 2,
      titulo: 'Tempere as batatas',
      descricao:
        'Escorra bem e seque os gomos com um pano limpo. Misture com azeite, alho, páprica, alecrim, sal e pimenta.',
      tempoMinutos: 5,
      ingredientesVinculados: ['batata', 'azeite', 'alho', 'paprica', 'alecrim', 'sal'],
    },
    {
      numero: 3,
      titulo: 'Asse na air fryer',
      descricao:
        'Distribua as batatas em uma camada sem amontoar. Asse a 200 °C por 20 a 25 minutos, agitando a cesta a cada 8 minutos.',
      tempoMinutos: 25,
      ingredientesVinculados: ['batata'],
    },
  ],
  dicas: [
    'Não sobrecarregue a cesta: uma única camada ajuda a deixar as batatas crocantes.',
    'Servir imediatamente para não perder a crocância.',
  ],
  substituicoes: [
    {
      ingrediente: 'alecrim',
      substituto: 'tomilho ou orégano seco',
      observacao: 'Use cerca de 1 colher de chá das ervas secas.',
    },
  ],
  restricoesAlimentares: ['vegetariana', 'vegana', 'sem lactose'],
  tipoRefeicao: 'acompanhamento',
  ocasioes: ['almoço', 'jantar'],
} satisfies Receita
