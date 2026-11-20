import type { Receita } from '../../types/recipe'

export const macarraoAoPesto = {
  id: 'macarrao-ao-pesto-de-manjericao',
  slug: 'macarrao-ao-pesto-de-manjericao',
  titulo: 'Macarrão ao pesto de manjericão',
  descricaoCurta: 'Massa envolvida em pesto fresco de manjericão, castanhas e parmesão.',
  descricaoCompleta:
    'Uma massa simples e perfumada com molho de manjericão feito em casa. Reserve um pouco da água do cozimento para deixar o pesto bem cremoso.',
  imagem: '/images/receitas/macarrao-ao-pesto.jpg',
  categoriaPrincipal: 'Pratos principais',
  categorias: ['Pratos principais', 'Massas', 'Vegetarianas'],
  subcategorias: ['Massas rápidas', 'Sem carne'],
  tags: ['macarrão', 'pesto', 'manjericão', 'vegetariana', 'rápida'],
  dificuldade: 'fácil',
  tempos: {
    preparoMinutos: 10,
    cozimentoMinutos: 15,
    totalMinutos: 25,
  },
  rendimentoBase: 4,
  rendimentoLabel: '4 porções',
  ingredientes: [
    {
      id: 'macarrao',
      nome: 'macarrão curto ou espaguete',
      quantidade: 400,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'manjericao',
      nome: 'folhas de manjericão fresco',
      quantidade: 50,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'castanhas',
      nome: 'castanhas-de-caju sem sal',
      quantidade: 40,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'alho',
      nome: 'dente de alho',
      quantidade: 1,
      unidade: 'unidade',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'azeite',
      nome: 'azeite de oliva',
      quantidade: 80,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'parmesao',
      nome: 'queijo parmesão ralado',
      quantidade: 50,
      unidade: 'g',
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
      titulo: 'Cozinhe a massa',
      descricao:
        'Cozinhe o macarrão em água fervente com sal pelo tempo indicado na embalagem, até ficar al dente. Reserve uma xícara da água do cozimento e escorra.',
      ingredientesVinculados: ['macarrao', 'sal'],
    },
    {
      numero: 2,
      titulo: 'Prepare o pesto',
      descricao:
        'Processe o manjericão, as castanhas, o alho, o azeite e o parmesão até obter um molho homogêneo. Tempere com pimenta e ajuste o sal.',
      ingredientesVinculados: ['manjericao', 'castanhas', 'alho', 'azeite', 'parmesao', 'sal'],
    },
    {
      numero: 3,
      titulo: 'Misture e sirva',
      descricao:
        'Envolva a massa ainda quente no pesto. Acrescente um pouco da água reservada até o molho aderir bem e sirva em seguida.',
      ingredientesVinculados: ['macarrao'],
    },
  ],
  dicas: ['Para preservar a cor do manjericão, processe o pesto apenas até ficar homogêneo.'],
  substituicoes: [
    {
      ingrediente: 'castanhas-de-caju',
      substituto: 'nozes ou amêndoas',
      observacao: 'A textura e o sabor ficam ligeiramente diferentes.',
    },
  ],
  restricoesAlimentares: ['vegetariana'],
  tipoRefeicao: 'almoço',
  ocasioes: ['almoço rápido', 'jantar do dia a dia'],
} satisfies Receita
