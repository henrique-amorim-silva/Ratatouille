import type { Receita } from '../../types/recipe'

export const risotoDeCogumelos = {
  id: 'risoto-cremoso-de-cogumelos',
  slug: 'risoto-cremoso-de-cogumelos',
  titulo: 'Risoto cremoso de cogumelos',
  descricaoCurta: 'Arroz arbóreo cozido aos poucos com cogumelos dourados e parmesão.',
  descricaoCompleta:
    'Um risoto reconfortante com cogumelos frescos, caldo quente e finalização cremosa de manteiga e parmesão. Sirva assim que ficar pronto.',
  imagem: '/images/receitas/risoto-de-cogumelos.jpg',
  categoriaPrincipal: 'Pratos principais',
  categorias: ['Pratos principais', 'Vegetarianas'],
  subcategorias: ['Massas e grãos', 'Sem carne'],
  tags: ['risoto', 'cogumelos', 'arroz', 'vegetariana', 'conforto'],
  dificuldade: 'média',
  tempos: {
    preparoMinutos: 15,
    cozimentoMinutos: 30,
    totalMinutos: 45,
  },
  rendimentoBase: 4,
  rendimentoLabel: '4 porções',
  ingredientes: [
    {
      id: 'caldo',
      nome: 'caldo de legumes',
      quantidade: 1,
      unidade: 'l',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'cogumelos',
      nome: 'cogumelos frescos fatiados',
      quantidade: 300,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'azeite',
      nome: 'azeite de oliva',
      quantidade: 15,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'cebola',
      nome: 'cebola picada',
      quantidade: 1,
      unidade: 'unidade',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'arroz',
      nome: 'arroz arbóreo',
      quantidade: 320,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'vinho',
      nome: 'vinho branco seco',
      quantidade: 120,
      unidade: 'ml',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'manteiga',
      nome: 'manteiga gelada',
      quantidade: 30,
      unidade: 'g',
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
      titulo: 'Doure os cogumelos',
      descricao:
        'Aqueça o azeite em uma frigideira e doure os cogumelos em etapas. Tempere com sal e reserve.',
      ingredientesVinculados: ['cogumelos', 'azeite', 'sal'],
    },
    {
      numero: 2,
      titulo: 'Refogue o arroz',
      descricao:
        'Mantenha o caldo aquecido em outra panela. Refogue a cebola até ficar macia, junte o arroz e mexa por 1 minuto.',
      ingredientesVinculados: ['caldo', 'cebola', 'arroz'],
    },
    {
      numero: 3,
      titulo: 'Cozinhe aos poucos',
      descricao:
        'Acrescente o vinho e mexa até evaporar. Adicione uma concha de caldo por vez, mexendo até o arroz absorver antes de juntar mais. Cozinhe até ficar al dente.',
      tempoMinutos: 25,
      ingredientesVinculados: ['vinho', 'caldo'],
    },
    {
      numero: 4,
      titulo: 'Finalize e sirva',
      descricao:
        'Misture os cogumelos, a manteiga e o parmesão. Ajuste o sal e a pimenta e sirva imediatamente.',
      ingredientesVinculados: ['cogumelos', 'manteiga', 'parmesao', 'sal'],
    },
  ],
  dicas: ['Mexa com frequência e mantenha o caldo quente para o cozimento ficar uniforme.'],
  substituicoes: [
    {
      ingrediente: 'vinho branco',
      substituto: 'caldo de legumes',
      observacao: 'Use a mesma quantidade.',
    },
  ],
  restricoesAlimentares: ['vegetariana'],
  tipoRefeicao: 'jantar',
  ocasioes: ['jantar especial', 'refeição em família'],
} satisfies Receita
