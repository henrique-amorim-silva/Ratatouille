import type { Receita } from '../../types/recipe'

export const pudimProteicoDoceDeLeite = {
  id: 'pudim-proteico-com-doce-de-leite',
  slug: 'pudim-proteico-com-doce-de-leite',
  titulo: 'Pudim proteico individual',
  descricaoCurta: 'Pudim de ovos com leite em pó e leite desnatado, adoçado a gosto.',
  descricaoCompleta:
    'Pudins individuais feitos com ovos, leite em pó desnatado e leite desnatado, adoçados com mel ou adoçante. Cozinhe os potes de vidro refratário em banho-maria no fogão.',
  imagem: '/images/receitas/pudim-proteico-doce-de-leite.jpg',
  categoriaPrincipal: 'Sobremesas',
  categorias: ['Sobremesas', 'Saudáveis'],
  subcategorias: ['Doces proteicos', 'Pudins'],
  tags: ['fit', 'fitness', 'proteico', 'pudim', 'leite em pó', 'doce de leite'],
  dificuldade: 'fácil',
  tempos: {
    preparoMinutos: 5,
    cozimentoMinutos: 25,
    totalMinutos: 30,
  },
  rendimentoBase: 4,
  rendimentoLabel: '4 porções',
  ingredientes: [
    {
      id: 'ovos',
      nome: 'ovos',
      quantidade: 2,
      unidade: 'unidades',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'leite-em-po',
      nome: 'leite em pó desnatado',
      quantidade: 2,
      unidade: 'colheres de sopa',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'leite',
      nome: 'leite desnatado',
      quantidade: 300,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'adoçante',
      nome: 'mel ou adoçante culinário',
      quantidade: null,
      unidade: 'a gosto',
      opcional: true,
      indivisivel: false,
    },
    {
      id: 'doce-de-leite',
      nome: 'doce de leite',
      quantidade: 80,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
  ],
  etapas: [
    {
      numero: 1,
      titulo: 'Misture os ingredientes',
      descricao:
        'Misture os ovos, o leite em pó desnatado, o leite desnatado e o mel ou adoçante até obter uma mistura uniforme.',
      ingredientesVinculados: ['ovos', 'leite-em-po', 'leite', 'adoçante'],
    },
    {
      numero: 2,
      titulo: 'Distribua nos potes de vidro',
      descricao:
        'Divida a mistura entre quatro potes individuais de vidro refratário, próprios para aquecimento. Não use potes comuns nem vidro trincado.',
      ingredientesVinculados: ['ovos', 'leite-em-po', 'leite', 'adoçante'],
    },
    {
      numero: 3,
      titulo: 'Cozinhe em banho-maria no fogão',
      descricao:
        'Acomode os potes em uma panela funda sobre um pano limpo dobrado e adicione água morna até a metade da altura deles. Tampe a panela e cozinhe em fogo médio por cerca de 25 minutos, mantendo a água em fervura branda.',
      tempoMinutos: 25,
      ingredientesVinculados: [],
    },
    {
      numero: 4,
      titulo: 'Resfrie e adicione o doce de leite',
      descricao:
        'Retire os potes da panela com cuidado e deixe esfriar. Adicione o doce de leite. Sirva em temperatura ambiente ou leve à geladeira para servir gelado.',
      ingredientesVinculados: ['doce-de-leite'],
    },
  ],
  dicas: [
    'Use apenas potes de vidro refratário sem trincas e coloque-os na água morna para evitar choque térmico.',
  ],
  substituicoes: [
    {
      ingrediente: 'mel',
      substituto: 'adoçante culinário',
      observacao: 'Ajuste a quantidade ao seu paladar.',
    },
  ],
  restricoesAlimentares: ['vegetariana'],
  tipoRefeicao: 'sobremesa',
  ocasioes: ['sobremesa', 'lanche proteico'],
} satisfies Receita
