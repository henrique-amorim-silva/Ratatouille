import type { Receita } from '../../types/recipe'

export const pureDeCouveFlor = {
  id: 'pure-de-couve-flor',
  slug: 'pure-de-couve-flor',
  titulo: 'Purê leve de couve-flor',
  descricaoCurta: 'Purê cremoso de couve-flor com requeijão light e queijo ralado.',
  descricaoCompleta:
    'Couve-flor cozida e bem escorrida, batida com requeijão light ou iogurte desnatado e temperos. O queijo ralado derretido no final completa a cremosidade.',
  imagem: '/images/receitas/pure-de-couve-flor.jpg',
  categoriaPrincipal: 'Acompanhamentos',
  categorias: ['Acompanhamentos', 'Saudáveis', 'Vegetarianas'],
  subcategorias: ['Legumes', 'Sem carne'],
  tags: ['fit', 'fitness', 'couve-flor', 'baixo carboidrato', 'acompanhamento'],
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
      id: 'couve-flor',
      nome: 'couve-flor média separada em buquês',
      quantidade: 650,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'queijo',
      nome: 'queijo ralado (parmesão light, muçarela light ou minas padrão)',
      quantidade: 70,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'cremosidade',
      nome: 'requeijão light ou iogurte natural desnatado tipo grego zero',
      quantidade: 30,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'cebola-em-po',
      nome: 'cebola em pó',
      quantidade: 3,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'sal-e-pimenta',
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
      titulo: 'Cozinhe a couve-flor',
      descricao:
        'Cozinhe os buquês no vapor por 10 a 12 minutos, até amolecerem bem. Se preferir, cozinhe em água fervente. Escorra bem na peneira e deixe sair o excesso de vapor por 2 minutos.',
      tempoMinutos: 12,
      ingredientesVinculados: ['couve-flor'],
    },
    {
      numero: 2,
      titulo: 'Bata com os temperos e a cremosidade',
      descricao:
        'Leve a couve-flor ainda quente ao liquidificador ou processador junto com o requeijão light ou iogurte, a cebola em pó, o sal e a pimenta. Bata até formar um creme liso.',
      ingredientesVinculados: ['couve-flor', 'cremosidade', 'cebola-em-po', 'sal-e-pimenta'],
    },
    {
      numero: 3,
      titulo: 'Finalize com o queijo',
      descricao:
        'Transfira para uma tigela ou panela em fogo bem baixo e misture o queijo ralado até derreter. Acerte o tempero; se precisar engrossar um pouco, mexa em fogo baixo por mais 1 a 2 minutos.',
      tempoMinutos: 2,
      ingredientesVinculados: ['queijo', 'sal-e-pimenta'],
    },
  ],
  dicas: [
    'Escorra muito bem e deixe o excesso de vapor sair por 2 minutos antes de bater para manter a consistência cremosa.',
  ],
  substituicoes: [
    {
      ingrediente: 'requeijão light',
      substituto: 'iogurte natural desnatado ou grego zero',
      observacao: 'Use a mesma quantidade para garantir cremosidade sem pesar.',
    },
    {
      ingrediente: 'parmesão light ralado',
      substituto: 'muçarela light ou queijo minas padrão ralado',
      observacao: 'Escolha uma opção e use entre 60 g e 80 g.',
    },
  ],
  restricoesAlimentares: ['vegetariana', 'sem glúten'],
  tipoRefeicao: 'acompanhamento',
  ocasioes: ['almoço', 'jantar'],
} satisfies Receita
