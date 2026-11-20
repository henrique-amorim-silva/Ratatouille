# Como cadastrar receitas

As receitas são dados estáticos do frontend. Elas ficam em `src/data/recipes/`, são tipadas por `src/types/recipe.ts` e validadas por `src/data/schemas/recipeSchema.ts`.

## 1. Preparar os arquivos

1. Crie o arquivo da receita em `src/data/recipes/`, por exemplo `src/data/recipes/strogonoffDeFrango.ts`.
2. Use o padrão dos arquivos existentes: exporte um objeto constante com `satisfies Receita`.
3. Coloque a imagem em `public/images/receitas/`.
4. Importe e registre a receita em `src/data/recipes/index.ts`.

As imagens das receitas atuais e suas fontes estão documentadas em [IMAGENS-RECEITAS.md](./IMAGENS-RECEITAS.md).

Exemplo mínimo:

```ts
import type { Receita } from '../../types/recipe'

export const strogonoffDeFrango = {
  id: 'strogonoff-de-frango',
  slug: 'strogonoff-de-frango',
  titulo: 'Strogonoff de frango',
  descricaoCurta: 'Frango cremoso com arroz e batata palha.',
  descricaoCompleta: 'Uma receita prática de strogonoff para o almoço ou jantar.',
  imagem: '/images/receitas/strogonoff-de-frango.jpg',
  categoriaPrincipal: 'Pratos principais',
  categorias: ['Pratos principais'],
  subcategorias: ['Frango'],
  tags: ['frango', 'cremoso', 'prático'],
  dificuldade: 'fácil',
  tempos: {
    preparoMinutos: 15,
    cozimentoMinutos: 25,
    totalMinutos: 40,
  },
  rendimentoBase: 4,
  rendimentoLabel: '4 porções',
  ingredientes: [],
  etapas: [],
  dicas: [],
  substituicoes: [],
  restricoesAlimentares: [],
  tipoRefeicao: 'almoço',
  ocasioes: ['dia a dia'],
} satisfies Receita
```

Depois, adicione a exportação no índice:

```ts
import { strogonoffDeFrango } from './strogonoffDeFrango'

export const receitas = [boloDeCenoura, moquecaDeBanana, bowlDeQuinoa, strogonoffDeFrango].map(
  (receita) => recipeSchema.parse(receita),
)
```

O array `receitas` é validado com Zod antes de a aplicação consumir os dados.

## 2. Identificação e apresentação

- `id`: identificador estável usado em favoritos e histórico. Não deve ser alterado depois que a receita passou a ser usada.
- `slug`: parte da URL em `/receitas/:slug`. Use letras minúsculas, hífens e sem acentos.
- `titulo`, `descricaoCurta` e `descricaoCompleta`: títulos e textos em PT-BR.
- `categoriaPrincipal`: categoria principal exibida na página.
- `categorias`, `subcategorias`, `tags`, `restricoesAlimentares` e `ocasioes`: listas usadas em filtros e busca.
- `dificuldade`: somente `fácil`, `média` ou `difícil`.
- `rendimentoBase`: número usado nos cálculos de porções; deve ser maior que zero.
- `rendimentoLabel`: texto mostrado ao usuário, como `4 porções` ou `10 fatias`.

## 3. Tempos

```ts
tempos: {
  preparoMinutos: 15,
  cozimentoMinutos: 25,
  totalMinutos: 40,
}
```

Todos os valores são números não negativos. `totalMinutos` deve representar o tempo total previsto da receita.

## 4. Ingredientes

Cadastre cada ingrediente como um objeto. Use um `id` único e estável dentro da própria receita:

```ts
{
  id: 'frango',
  nome: 'filé de peito de frango',
  quantidade: 500,
  unidade: 'g',
  grupo: 'principal',
  etapa: 1,
  observacao: 'Sem osso',
  opcional: false,
  indivisivel: false,
}
```

Campos:

- `id`: identificador obrigatório e único.
- `nome`: nome exibido e usado pela busca.
- `quantidade`: número maior ou igual a zero. Use `null` para quantidades livres, como `sal a gosto`.
- `unidade`: unidade exibida ao lado da quantidade. Para `quantidade: null`, use `a gosto`.
- `grupo` e `observacao`: opcionais.
- `etapa`: número inteiro positivo e opcional.
- `opcional`: indique `true` quando o ingrediente não seja necessário.
- `indivisivel`: use `true` para itens que não devem ser fracionados no ajuste de porções, como ovos inteiros ou unidades de limão.

O ajuste automático divide ou multiplica a quantidade conforme o número de porções. Para manter uma condição rara de arredondamento ou unidade, o domínio em `src/domain/portions.ts` gera avisos apropriados.

## 5. Etapas de preparo

```ts
etapas: [
  {
    numero: 1,
    titulo: 'Prepare o frango',
    descricao: 'Corte o frango em cubos e tempere com sal e pimenta.',
    tempoMinutos: 10,
    ingredientesVinculados: ['frango', 'sal'],
  },
]
```

- `numero`: inteiro positivo e único na ordem das etapas.
- `titulo`: opcional.
- `descricao`: texto obrigatório.
- `tempoMinutos`: opcional e não negativo.
- `ingredientesVinculados`: IDs que existem no array `ingredientes`.

O Zod verifica todos os IDs vinculados. Uma etapa não pode referenciar um ingrediente inexistente. Ingredientes sem vínculo podem usar `[]`.

## 6. Dicas e substituições

```ts
dicas: ['Deixe a frigideira bem quente antes de adicionar o frango.']

substituicoes: [
  {
    ingrediente: 'creme de leite',
    substituto: 'creme de leite leve',
    observacao: 'A textura ficará um pouco menos encorpada.',
  },
]
```

Os dois campos são obrigatórios no objeto, mas podem ser arrays vazios. `observacao` é opcional.

## 7. Imagens locais

1. Use imagens próprias, licenciadas ou autorizadas.
2. Salve o arquivo em `public/images/receitas/`.
3. Informe o caminho público começando com `/`:

```ts
imagem: '/images/receitas/strogonoff-de-frango.jpg'
galeria: ['/images/receitas/strogonoff-de-frango-1.jpg']
```

Prefira JPG ou WebP com proporção adequada para os cards e arquivos otimizados. `galeria` é opcional. A interface deve continuar funcionando se ela não existir.

Não use caminhos relativos como `../../public` ou o caminho absoluto do computador.

## 8. Link do YouTube

O campo opcional deve conter uma URL válida:

```ts
youtubeUrl: 'https://www.youtube.com/watch?v=EXEMPLO'
```

O Zod usa `z.url()` para rejeitar valores inválidos. Quando nenhuma capa ou player estiver implementado na tela, o campo pode permanecer cadastrado no dado para uso futuro.

## 9. Informação nutricional

```ts
nutricao: {
  origem: 'estimada',
  porcao: '1 porção',
  caloriasKcal: 480,
  carboidratosG: 52,
  proteinasG: 35,
  gordurasG: 18,
  fibrasG: 4,
  sodioMg: 620,
}
```

`origem` aceita apenas `calculada`, `informada` ou `estimada`. Os campos numéricos são opcionais e não podem ser negativos. Sempre indique a origem e evite apresentar uma estimativa como resultado certificado.

## 10. Validar com Zod

O índice centraliza a validação:

```ts
recipeSchema.parse(receita)
```

Ao executar o projeto ou o build, o Zod:

- rejeita campos ausentes;
- valida enums e números;
- exige pelo menos um ingrediente e uma etapa;
- impede IDs duplicados de ingredientes;
- impede vínculos de etapa com IDs inexistentes;
- valida URLs do YouTube.

Execute a validação por meio do projeto:

```sh
npm run dev
npm run build
npm run test:run
```

Se `recipeSchema.parse(...)` encontrar um erro, corrija o campo apontado no objeto ou no vínculo da etapa antes de continuar.
