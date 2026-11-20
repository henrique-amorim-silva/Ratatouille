import type { Receita } from '../../types/recipe'

export const peixeAssadoComLegumes = {
  id: 'peixe-assado-com-legumes',
  slug: 'peixe-assado-com-legumes',
  titulo: 'Peixe assado com legumes',
  descricaoCurta: 'Filés temperados com limão assados junto de batatas e tomates.',
  descricaoCompleta:
    'Uma refeição prática de forno com peixe branco, batatas macias e tomates assados. O limão e as ervas deixam o prato leve e aromático.',
  imagem: '/images/receitas/peixe-assado-com-legumes.jpg',
  categoriaPrincipal: 'Pratos principais',
  categorias: ['Pratos principais', 'Peixes', 'Saudáveis'],
  subcategorias: ['Forno', 'Sem fritura'],
  tags: ['peixe', 'forno', 'batata', 'limão', 'leve'],
  dificuldade: 'fácil',
  tempos: {
    preparoMinutos: 15,
    cozimentoMinutos: 35,
    totalMinutos: 50,
  },
  rendimentoBase: 4,
  rendimentoLabel: '4 porções',
  ingredientes: [
    {
      id: 'batata',
      nome: 'batatas médias em rodelas',
      quantidade: 500,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'tomate',
      nome: 'tomates em gomos',
      quantidade: 3,
      unidade: 'unidades',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'cebola',
      nome: 'cebola em pétalas',
      quantidade: 1,
      unidade: 'unidade',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'azeite',
      nome: 'azeite de oliva',
      quantidade: 30,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'peixe',
      nome: 'filés de peixe branco',
      quantidade: 600,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'limao',
      nome: 'limão',
      quantidade: 1,
      unidade: 'unidade',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'ervas',
      nome: 'salsinha ou ervas frescas picadas',
      quantidade: 10,
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
      titulo: 'Asse os legumes',
      descricao:
        'Preaqueça o forno a 200 °C. Disponha as batatas, os tomates e a cebola em uma assadeira. Regue com metade do azeite, tempere e asse por 20 minutos.',
      tempoMinutos: 20,
      ingredientesVinculados: ['batata', 'tomate', 'cebola', 'azeite', 'sal'],
    },
    {
      numero: 2,
      titulo: 'Tempere o peixe',
      descricao:
        'Tempere os filés com o suco de limão, sal e pimenta. Retire a assadeira do forno e acomode o peixe entre os legumes.',
      ingredientesVinculados: ['peixe', 'limao', 'sal'],
    },
    {
      numero: 3,
      titulo: 'Finalize no forno',
      descricao:
        'Regue o peixe com o restante do azeite e asse por 12 a 15 minutos, até que esteja opaco e se solte facilmente em lascas. Finalize com as ervas.',
      tempoMinutos: 15,
      ingredientesVinculados: ['azeite', 'ervas'],
    },
  ],
  dicas: [
    'O tempo do peixe pode variar conforme a espessura dos filés; evite assar demais para não ressecar.',
  ],
  substituicoes: [
    {
      ingrediente: 'peixe branco',
      substituto: 'salmão em filés',
      observacao: 'Ajuste o tempo conforme a espessura.',
    },
  ],
  restricoesAlimentares: ['sem lactose', 'sem glúten'],
  tipoRefeicao: 'jantar',
  ocasioes: ['almoço de domingo', 'jantar leve'],
} satisfies Receita
