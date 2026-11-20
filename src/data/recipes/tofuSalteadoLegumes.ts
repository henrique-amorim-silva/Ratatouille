import type { Receita } from '../../types/recipe'

export const tofuSalteadoLegumes = {
  id: 'tofu-salteado-com-legumes',
  slug: 'tofu-salteado-com-legumes',
  titulo: 'Tofu salteado com legumes e arroz integral',
  descricaoCurta: 'Tofu dourado com brócolis e pimentão servido com arroz integral.',
  descricaoCompleta:
    'Uma refeição vegetariana com tofu dourado, legumes crocantes e arroz integral. O amido ajuda a formar uma leve crosta no tofu sem fritura por imersão.',
  imagem: '/images/receitas/tofu-salteado-legumes.jpg',
  categoriaPrincipal: 'Pratos principais',
  categorias: ['Pratos principais', 'Saudáveis', 'Vegetarianas'],
  subcategorias: ['Tofu', 'Sem carne'],
  tags: ['fit', 'fitness', 'tofu', 'vegetariana', 'proteína vegetal'],
  dificuldade: 'fácil',
  tempos: {
    preparoMinutos: 15,
    cozimentoMinutos: 25,
    totalMinutos: 40,
  },
  rendimentoBase: 2,
  rendimentoLabel: '2 porções',
  ingredientes: [
    {
      id: 'arroz',
      nome: 'arroz integral',
      quantidade: 120,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'agua',
      nome: 'água para cozinhar o arroz',
      quantidade: 300,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'tofu',
      nome: 'tofu firme escorrido e em cubos',
      quantidade: 300,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'amido',
      nome: 'amido de milho',
      quantidade: 10,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'brocolis',
      nome: 'brócolis em floretes pequenos',
      quantidade: 150,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'pimentao',
      nome: 'pimentão em tiras',
      quantidade: 1,
      unidade: 'unidade',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'azeite',
      nome: 'azeite de oliva',
      quantidade: 10,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'shoyu',
      nome: 'molho de soja com teor reduzido de sódio',
      quantidade: 15,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'sal',
      nome: 'pimenta-do-reino',
      quantidade: null,
      unidade: 'a gosto',
      opcional: true,
      indivisivel: false,
    },
  ],
  etapas: [
    {
      numero: 1,
      titulo: 'Cozinhe o arroz',
      descricao:
        'Lave o arroz e cozinhe com a água em fogo baixo, com a panela parcialmente tampada, até ficar macio e a água secar.',
      tempoMinutos: 25,
      ingredientesVinculados: ['arroz', 'agua'],
    },
    {
      numero: 2,
      titulo: 'Doure o tofu',
      descricao:
        'Seque bem o tofu, envolva os cubos no amido e doure-os em uma frigideira antiaderente com metade do azeite. Reserve.',
      ingredientesVinculados: ['tofu', 'amido', 'azeite'],
    },
    {
      numero: 3,
      titulo: 'Salteie os legumes',
      descricao:
        'Na mesma frigideira, aqueça o restante do azeite e salteie o brócolis e o pimentão até ficarem macios, mas ainda firmes.',
      ingredientesVinculados: ['brocolis', 'pimentao', 'azeite'],
    },
    {
      numero: 4,
      titulo: 'Finalize e sirva',
      descricao:
        'Volte o tofu à frigideira, junte o molho de soja e a pimenta e misture delicadamente. Sirva com o arroz integral.',
      ingredientesVinculados: ['tofu', 'shoyu', 'sal', 'arroz'],
    },
  ],
  dicas: [
    'Pressione o tofu entre folhas de papel-toalha por alguns minutos para retirar o excesso de água e dourar melhor.',
  ],
  substituicoes: [
    {
      ingrediente: 'tofu firme',
      substituto: 'grão-de-bico cozido',
      observacao: 'Use grão-de-bico bem escorrido e doure na frigideira.',
    },
  ],
  restricoesAlimentares: ['vegetariana', 'vegana', 'sem lactose'],
  tipoRefeicao: 'almoço',
  ocasioes: ['almoço rápido', 'marmita', 'jantar leve'],
} satisfies Receita
