import type { Receita } from '../../types/recipe'

export const brownieDeChocolate = {
  id: 'brownie-de-chocolate-com-nozes',
  slug: 'brownie-de-chocolate-com-nozes',
  titulo: 'Brownie de chocolate com nozes',
  descricaoCurta: 'Brownie intenso, com casquinha fina e pedaços crocantes de nozes.',
  descricaoCompleta:
    'Um brownie fácil de preparar, com interior úmido e sabor marcante de chocolate. Espere esfriar um pouco antes de cortar para obter quadrados bem definidos.',
  imagem: '/images/receitas/brownie-de-chocolate.jpg',
  categoriaPrincipal: 'Sobremesas',
  categorias: ['Sobremesas', 'Bolos'],
  subcategorias: ['Chocolate', 'Forno'],
  tags: ['brownie', 'chocolate', 'nozes', 'sobremesa', 'lanche'],
  dificuldade: 'fácil',
  tempos: {
    preparoMinutos: 15,
    cozimentoMinutos: 25,
    totalMinutos: 40,
  },
  rendimentoBase: 9,
  rendimentoLabel: '9 pedaços',
  ingredientes: [
    {
      id: 'chocolate',
      nome: 'chocolate meio amargo picado',
      quantidade: 180,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'manteiga',
      nome: 'manteiga sem sal',
      quantidade: 100,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'ovos',
      nome: 'ovos',
      quantidade: 2,
      unidade: 'unidades',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'acucar',
      nome: 'açúcar',
      quantidade: 150,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'farinha',
      nome: 'farinha de trigo',
      quantidade: 80,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'cacau',
      nome: 'cacau em pó',
      quantidade: 20,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'nozes',
      nome: 'nozes picadas',
      quantidade: 60,
      unidade: 'g',
      opcional: true,
      indivisivel: false,
    },
  ],
  etapas: [
    {
      numero: 1,
      titulo: 'Derreta o chocolate',
      descricao:
        'Preaqueça o forno a 180 °C. Derreta o chocolate com a manteiga em banho-maria ou no micro-ondas, mexendo até ficar liso.',
      ingredientesVinculados: ['chocolate', 'manteiga'],
    },
    {
      numero: 2,
      titulo: 'Misture a massa',
      descricao:
        'Bata os ovos com o açúcar até incorporar. Junte o chocolate derretido e misture. Peneire a farinha e o cacau e incorpore sem bater demais.',
      ingredientesVinculados: ['ovos', 'acucar', 'farinha', 'cacau'],
    },
    {
      numero: 3,
      titulo: 'Asse o brownie',
      descricao:
        'Incorpore as nozes, transfira para uma forma pequena forrada com papel-manteiga e asse por 20 a 25 minutos. O centro deve continuar úmido.',
      tempoMinutos: 25,
      ingredientesVinculados: ['nozes'],
    },
    {
      numero: 4,
      titulo: 'Espere e corte',
      descricao: 'Deixe amornar na forma antes de desenformar e cortar em nove pedaços.',
      ingredientesVinculados: [],
    },
  ],
  dicas: [
    'Não espere o palito sair completamente seco: isso pode indicar que o brownie passou do ponto.',
  ],
  substituicoes: [
    {
      ingrediente: 'nozes',
      substituto: 'castanhas ou gotas de chocolate',
      observacao: 'Também é possível preparar sem esse ingrediente.',
    },
  ],
  restricoesAlimentares: ['vegetariana'],
  tipoRefeicao: 'sobremesa',
  ocasioes: ['café da tarde', 'sobremesa', 'encontro com amigos'],
} satisfies Receita
