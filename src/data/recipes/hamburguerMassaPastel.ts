import type { Receita } from '../../types/recipe'

export const hamburguerMassaPastel = {
  id: 'hamburguer-de-massa-de-pastel',
  slug: 'hamburguer-de-massa-de-pastel',
  titulo: 'Hambúrguer de massa de pastel na air fryer',
  descricaoCurta: 'Carne frita na frigideira, envolta em massa de pastel e dourada na air fryer.',
  descricaoCompleta:
    'Hambúrgueres de carne magra fritos na frigideira antes de serem envolvidos em discos de massa de pastel e finalizados na air fryer. O queijo é opcional.',
  imagem: '/images/receitas/hamburguer-massa-pastel.jpg',
  categoriaPrincipal: 'Lanches',
  categorias: ['Lanches', 'Saudáveis', 'Air fryer'],
  subcategorias: ['Air fryer', 'Proteicos'],
  tags: ['fit', 'fitness', 'hambúrguer', 'massa de pastel', 'air fryer'],
  dificuldade: 'fácil',
  tempos: {
    preparoMinutos: 15,
    cozimentoMinutos: 15,
    totalMinutos: 30,
  },
  rendimentoBase: 3,
  rendimentoLabel: '3 unidades',
  ingredientes: [
    {
      id: 'carne',
      nome: 'carne bovina magra moída',
      quantidade: 300,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'azeite',
      nome: 'azeite para fritar a carne',
      quantidade: 5,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'massa',
      nome: 'discos pequenos de massa de pastel',
      quantidade: 6,
      unidade: 'unidades',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'queijo',
      nome: 'queijo minas padrão light',
      quantidade: 45,
      unidade: 'g',
      opcional: true,
      indivisivel: false,
    },
    {
      id: 'tomate',
      nome: 'tomate em rodelas finas',
      quantidade: 1,
      unidade: 'unidade',
      opcional: true,
      indivisivel: true,
    },
    {
      id: 'ovo',
      nome: 'gema batida para pincelar',
      quantidade: 1,
      unidade: 'unidade',
      opcional: false,
      indivisivel: true,
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
      titulo: 'Frite a carne na frigideira',
      descricao:
        'Tempere a carne com sal e pimenta e divida em três hambúrgueres finos. Aqueça o azeite em uma frigideira e frite-os por cerca de 3 a 4 minutos de cada lado, até estarem completamente cozidos. Deixe amornar.',
      tempoMinutos: 8,
      ingredientesVinculados: ['carne', 'azeite', 'sal'],
    },
    {
      numero: 2,
      titulo: 'Enrole na massa de pastel',
      descricao:
        'Coloque cada hambúrguer já frito sobre um disco de massa. Se desejar, acrescente queijo e uma rodela de tomate. Cubra com outro disco, pressione as bordas com um garfo para selar e pincele com a gema.',
      ingredientesVinculados: ['massa', 'queijo', 'tomate', 'ovo'],
    },
    {
      numero: 3,
      titulo: 'Doure na air fryer',
      descricao:
        'Acomode os pastéis na air fryer preaquecida a 180 °C e asse por 6 a 8 minutos, virando na metade do tempo, até a massa ficar dourada e crocante.',
      tempoMinutos: 7,
      ingredientesVinculados: ['massa'],
    },
  ],
  dicas: [
    'Frite a carne completamente antes de montar e não recheie demais para conseguir selar bem as bordas da massa.',
  ],
  substituicoes: [
    {
      ingrediente: 'carne bovina magra',
      substituto: 'frango moído',
      observacao: 'Frite completamente na frigideira antes de envolver na massa.',
    },
  ],
  restricoesAlimentares: [],
  tipoRefeicao: 'lanche',
  ocasioes: ['lanche da tarde', 'refeição rápida'],
} satisfies Receita
