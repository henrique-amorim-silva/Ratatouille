import type { Receita } from '../../types/recipe'

export const boloDeCenoura = {
  id: 'bolo-de-cenoura-com-chocolate',
  slug: 'bolo-de-cenoura-com-chocolate',
  titulo: 'Bolo de cenoura com cobertura de chocolate',
  descricaoCurta: 'Bolo macio de cenoura batido no liquidificador com cobertura cremosa.',
  descricaoCompleta:
    'Um clássico caseiro brasileiro: massa úmida de cenoura com uma cobertura simples de chocolate. Espere o bolo amornar antes de cobrir para manter a cobertura brilhante.',
  imagem: '/images/receitas/bolo-de-cenoura-com-chocolate.jpg',
  categoriaPrincipal: 'Sobremesas',
  categorias: ['Sobremesas', 'Bolos'],
  subcategorias: ['Bolos simples', 'Liquidificador'],
  tags: ['bolo', 'cenoura', 'chocolate', 'lanche', 'caseiro'],
  dificuldade: 'fácil',
  tempos: {
    preparoMinutos: 20,
    cozimentoMinutos: 40,
    totalMinutos: 60,
  },
  rendimentoBase: 10,
  rendimentoLabel: '10 fatias',
  ingredientes: [
    {
      id: 'cenoura',
      nome: 'cenoura descascada e picada',
      quantidade: 250,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'ovos',
      nome: 'ovos',
      quantidade: 3,
      unidade: 'unidade',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'oleo',
      nome: 'óleo vegetal',
      quantidade: 180,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'acucar',
      nome: 'açúcar',
      quantidade: 300,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'farinha',
      nome: 'farinha de trigo',
      quantidade: 300,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'fermento',
      nome: 'fermento químico em pó',
      quantidade: 12,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'chocolate',
      nome: 'chocolate meio amargo picado',
      quantidade: 120,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'creme-de-leite',
      nome: 'creme de leite',
      quantidade: 100,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
  ],
  etapas: [
    {
      numero: 1,
      titulo: 'Prepare a massa',
      descricao:
        'Preaqueça o forno a 180 °C. Bata a cenoura, os ovos, o óleo e o açúcar no liquidificador até obter uma mistura lisa.',
      ingredientesVinculados: ['cenoura', 'ovos', 'oleo', 'acucar'],
    },
    {
      numero: 2,
      titulo: 'Incorpore os secos',
      descricao:
        'Transfira a mistura para uma tigela e incorpore a farinha aos poucos. Misture o fermento delicadamente por último.',
      ingredientesVinculados: ['farinha', 'fermento'],
    },
    {
      numero: 3,
      titulo: 'Asse o bolo',
      descricao:
        'Despeje a massa em uma forma untada e enfarinhada. Asse por cerca de 40 minutos, até que um palito inserido no centro saia limpo.',
      tempoMinutos: 40,
      ingredientesVinculados: [],
    },
    {
      numero: 4,
      titulo: 'Faça a cobertura',
      descricao:
        'Aqueça o chocolate com o creme de leite em fogo baixo, mexendo até derreter. Espalhe sobre o bolo morno.',
      ingredientesVinculados: ['chocolate', 'creme-de-leite'],
    },
  ],
  dicas: [
    'Pique a cenoura em pedaços pequenos para facilitar ao bater.',
    'Não abra o forno nos primeiros 30 minutos para o bolo crescer por igual.',
  ],
  substituicoes: [
    {
      ingrediente: 'chocolate meio amargo',
      substituto: 'chocolate ao leite',
      observacao: 'A cobertura ficará mais doce.',
    },
  ],
  restricoesAlimentares: ['vegetariana'],
  tipoRefeicao: 'lanche',
  ocasioes: ['café da tarde', 'aniversário', 'lanche em família'],
} satisfies Receita
