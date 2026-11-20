import type { Receita } from '../../types/recipe'

export const nuggetsFitCaseiro = {
  id: 'nuggets-fit-caseiro',
  slug: 'nuggets-fit-caseiro',
  titulo: 'Nuggets fit caseiro na air fryer',
  descricaoCurta: 'Nuggets de frango crocantes com aveia e pouca gordura.',
  descricaoCompleta:
    'Nuggets feitos em casa com peito de frango moído, temperos e uma camada crocante de aveia. A air fryer deixa o exterior dourado sem fritura.',
  imagem: '/images/receitas/nuggets-fit-caseiro.jpg',
  categoriaPrincipal: 'Lanches',
  categorias: ['Lanches', 'Saudáveis', 'Air fryer'],
  subcategorias: ['Air fryer', 'Frango', 'Fit'],
  tags: ['nuggets', 'fit', 'caseiro', 'frango', 'air fryer'],
  dificuldade: 'média',
  tempos: { preparoMinutos: 20, cozimentoMinutos: 16, totalMinutos: 36 },
  rendimentoBase: 16,
  rendimentoLabel: '16 nuggets',
  ingredientes: [
    {
      id: 'frango',
      nome: 'peito de frango moído',
      quantidade: 400,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'ovo',
      nome: 'ovo',
      quantidade: 1,
      unidade: 'unidade',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'aveia',
      nome: 'aveia em flocos finos',
      quantidade: 100,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'alho',
      nome: 'dentes de alho picados',
      quantidade: 2,
      unidade: 'unidades',
      opcional: false,
      indivisivel: true,
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
      nome: 'azeite',
      quantidade: 10,
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
      titulo: 'Tempere o frango',
      descricao:
        'Misture o frango moído com o alho, a páprica, o sal e a pimenta. Acrescente a metade da aveia e misture até ficar homogêneo.',
      tempoMinutos: 8,
      ingredientesVinculados: ['frango', 'alho', 'paprica', 'aveia', 'sal'],
    },
    {
      numero: 2,
      titulo: 'Modele e empane',
      descricao:
        'Bata o ovo em um prato e coloque a aveia restante em outro. Modele os nuggets, passe pelo ovo e empane na aveia.',
      tempoMinutos: 12,
      ingredientesVinculados: ['ovo', 'aveia'],
    },
    {
      numero: 3,
      titulo: 'Asse na air fryer',
      descricao:
        'Pincele ou borrife os nuggets com azeite. Asse a 200 °C por 14 a 16 minutos, virando na metade do tempo.',
      tempoMinutos: 16,
      ingredientesVinculados: ['azeite'],
    },
  ],
  dicas: [
    'Para conservar, leve os nuggets crus à geladeira por 30 minutos antes de empanar; eles ficarão mais firmes.',
    'A temperatura interna do frango deve chegar a 74 °C.',
  ],
  substituicoes: [
    {
      ingrediente: 'peito de frango',
      substituto: 'frango de peito moído de peru',
      observacao: 'Mantenha o mesmo tamanho das porções para cozinhar de forma uniforme.',
    },
  ],
  restricoesAlimentares: [],
  tipoRefeicao: 'lanche',
  ocasioes: ['lanche da tarde', 'lanche das crianças'],
} satisfies Receita
