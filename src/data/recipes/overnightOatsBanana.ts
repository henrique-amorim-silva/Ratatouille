import type { Receita } from '../../types/recipe'

export const overnightOatsBanana = {
  id: 'overnight-oats-de-banana',
  slug: 'overnight-oats-de-banana',
  titulo: 'Overnight oats de banana',
  descricaoCurta: 'Aveia cremosa com chia, banana e iogurte, preparada na noite anterior.',
  descricaoCompleta:
    'Um café da manhã prático que descansa na geladeira durante a noite. A aveia e a chia absorvem o leite e formam uma mistura cremosa, finalizada com banana.',
  imagem: '/images/receitas/overnight-oats-banana.jpg',
  categoriaPrincipal: 'Cafés da manhã',
  categorias: ['Cafés da manhã', 'Saudáveis', 'Vegetarianas'],
  subcategorias: ['Aveia', 'Preparo antecipado'],
  tags: ['fit', 'fitness', 'aveia', 'banana', 'café da manhã'],
  dificuldade: 'fácil',
  tempos: {
    preparoMinutos: 10,
    cozimentoMinutos: 0,
    totalMinutos: 10,
  },
  rendimentoBase: 2,
  rendimentoLabel: '2 porções',
  ingredientes: [
    {
      id: 'aveia',
      nome: 'aveia em flocos',
      quantidade: 80,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'leite',
      nome: 'leite ou bebida vegetal sem açúcar',
      quantidade: 180,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'iogurte',
      nome: 'iogurte natural',
      quantidade: 100,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'chia',
      nome: 'sementes de chia',
      quantidade: 10,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'banana',
      nome: 'banana madura',
      quantidade: 1,
      unidade: 'unidade',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'canela',
      nome: 'canela em pó',
      quantidade: null,
      unidade: 'a gosto',
      opcional: true,
      indivisivel: false,
    },
  ],
  etapas: [
    {
      numero: 1,
      titulo: 'Misture a base',
      descricao:
        'Divida a aveia e a chia em dois potes com tampa. Acrescente o leite e o iogurte e misture bem.',
      ingredientesVinculados: ['aveia', 'chia', 'leite', 'iogurte'],
    },
    {
      numero: 2,
      titulo: 'Deixe descansar',
      descricao:
        'Tampe os potes e deixe na geladeira por pelo menos 6 horas, de preferência durante a noite.',
      ingredientesVinculados: [],
    },
    {
      numero: 3,
      titulo: 'Finalize e sirva',
      descricao:
        'Na hora de servir, misture a aveia, distribua a banana em rodelas e finalize com canela.',
      ingredientesVinculados: ['banana', 'canela'],
    },
  ],
  dicas: ['Se a mistura ficar muito espessa, adicione um pouco de leite antes de servir.'],
  substituicoes: [
    {
      ingrediente: 'banana',
      substituto: 'morangos ou maçã picada',
      observacao: 'Acrescente a fruta somente na hora de servir.',
    },
  ],
  restricoesAlimentares: ['vegetariana'],
  tipoRefeicao: 'café da manhã',
  ocasioes: ['café da manhã', 'lanche rápido'],
} satisfies Receita
