import type { Receita } from '../../types/recipe'

export const boloDeBananaFit = {
  id: 'bolo-de-banana-fit',
  slug: 'bolo-de-banana-fit',
  titulo: 'Bolo de banana fit com 4 ingredientes',
  descricaoCurta: 'Bolo simples de banana e aveia, sem açúcar adicionado.',
  descricaoCompleta:
    'Um bolo prático feito apenas com banana, farinha de aveia, ovo e fermento em pó. Duas bananas entram na massa e a terceira vai em rodelas por cima.',
  imagem: '/images/receitas/bolo-de-banana-fit.jpg',
  categoriaPrincipal: 'Bolos',
  categorias: ['Bolos', 'Lanches', 'Saudáveis', 'Vegetarianas', 'Sobremesas', 'Air fryer'],
  subcategorias: ['Bolos simples', 'Sem açúcar adicionado'],
  tags: ['fit', 'fitness', 'banana', 'aveia', 'lanche'],
  dificuldade: 'fácil',
  tempos: {
    preparoMinutos: 10,
    cozimentoMinutos: 25,
    totalMinutos: 35,
  },
  rendimentoBase: 6,
  rendimentoLabel: '6 fatias',
  ingredientes: [
    {
      id: 'banana',
      nome: 'bananas maduras',
      quantidade: 6,
      unidade: 'unidade',
      observacao: 'duas para a massa e uma para cobrir',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'farinha-de-aveia',
      nome: 'farinha de aveia',
      quantidade: 200,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
    {
      id: 'ovo',
      nome: 'ovo',
      quantidade: 1,
      unidade: 'unidade',
      opcional: false,
      indivisivel: true,
    },
    {
      id: 'fermento',
      nome: 'fermento em pó',
      quantidade: 8,
      unidade: 'g',
      opcional: false,
      indivisivel: false,
    },
  ],
  etapas: [
    {
      numero: 1,
      titulo: 'Amasse as bananas',
      descricao:
        'Amasse quatro bananas maduras com um garfo até formar um purê. Reserve duas bananas para a cobertura.',
      ingredientesVinculados: ['banana'],
    },
    {
      numero: 2,
      titulo: 'Misture a massa',
      descricao:
        'Misture o ovo e a farinha de aveia ao purê de banana até ficar homogêneo. Acrescente o fermento por último e misture delicadamente apenas até incorporar.',
      ingredientesVinculados: ['banana', 'ovo', 'farinha-de-aveia', 'fermento'],
    },
    {
      numero: 3,
      titulo: 'Finalize a cobertura',
      descricao:
        'Transfira a massa para uma forma pequena forrada com papel-manteiga ou própria para air fryer. Corte a banana reservada em rodelas e distribua por cima.',
      ingredientesVinculados: ['banana'],
    },
    {
      numero: 4,
      titulo: 'Asse o bolo',
      descricao:
        'Asse em forno preaquecido a 180 °C por 25 a 30 minutos ou na air fryer a 160 °C por 18 a 22 minutos, até firmar e um palito sair limpo do centro.',
      ingredientesVinculados: [],
    },
  ],
  dicas: [
    'Use bananas bem maduras para deixar o bolo naturalmente mais doce, sem acrescentar açúcar.',
    'O tempo pode variar conforme o aparelho e o tamanho da forma; faça o teste do palito antes de retirar.',
  ],
  substituicoes: [],
  restricoesAlimentares: ['vegetariana'],
  tipoRefeicao: 'lanche',
  ocasioes: ['café da manhã', 'lanche da tarde'],
} satisfies Receita
