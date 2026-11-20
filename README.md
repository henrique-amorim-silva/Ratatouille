# Ratatouille

Ratatouille é uma aplicação web gratuita para descobrir, preparar e planejar receitas culinárias.

O projeto funciona inteiramente no navegador: não possui API, autenticação, banco de dados remoto ou conta de usuário. Receitas são dados estáticos; preferências e favoritos ficam no `localStorage`; listas, planejamento, histórico e anotações ficam no IndexedDB.

## Funcionalidades

- Catálogo com busca, categorias, dificuldade, tempo máximo e ingrediente.
- Ordenação por nome, tempo ou rendimento.
- Página de detalhes com ajuste dinâmico de porções.
- Lista de compras com ingredientes faltantes.
- Planejamento semanal por dia e refeição.
- Favoritos persistidos no dispositivo.
- Modo de preparo passo a passo com etapas vinculadas aos ingredientes.
- Conversor de unidades e equivalências de cozinha.
- Correspondência de receitas por ingredientes disponíveis.
- Histórico de preparos e anotações por receita.
- Sorteio de receita surpresa e sugestões relacionadas por categoria e ingredientes.
- Impressão otimizada da ficha da receita.
- Tema claro/escuro selecionável e salvo no dispositivo.
- Exportação e restauração de backup JSON.
- PWA instalável, suporte offline para recursos em cache e aviso de atualização.
- Tema claro/escuro, interface responsiva e navegação semântica.

## Stack

- React 19
- TypeScript com `strict: true`
- Vite
- Tailwind CSS
- React Router DOM
- Zustand
- Zod
- Lucide React
- IndexedDB via `idb`
- Vitest e React Testing Library
- Playwright
- ESLint e Prettier

## Arquitetura

O projeto separa apresentação, regras de negócio e persistência:

- `src/pages/`: telas e composição das rotas.
- `src/components/`: componentes reutilizáveis de interface.
- `src/layouts/`: estrutura compartilhada da aplicação.
- `src/routes/`: definição das rotas públicas.
- `src/domain/`: regras puras de porções, busca, filtros, planejamento e listas.
- `src/data/`: receitas estáticas e schemas Zod.
- `src/types/`: contratos compartilhados de dados.
- `src/store/`: estado global pequeno com Zustand.
- `src/services/`: acesso a `localStorage`, IndexedDB e backups.
- `src/hooks/` e `src/context/`: integrações de contexto e reutilização.
- `public/`: imagens locais e ativos da PWA.
- `e2e/`: fluxos críticos validados pelo Playwright.

As regras de negócio em `src/domain/` não importam React. Isso permite testar cálculos e transformações independentemente da interface.

### Fluxo de dados

1. Cada receita é criada como objeto tipado em `src/data/recipes/`.
2. `src/data/recipes/index.ts` valida os objetos com `recipeSchema.parse(...)`.
3. Páginas e componentes recebem os dados validados.
4. Cálculos específicos ficam em `src/domain/`.
5. Estado simples usa Zustand e navegador.
6. Dados persistentes extensos usam IndexedDB.

### Persistência

| Informação                | Armazenamento  |
| ------------------------- | -------------- |
| Favoritos e preferências  | `localStorage` |
| Lista de compras          | IndexedDB      |
| Planejamento de refeições | IndexedDB      |
| Histórico de preparos     | IndexedDB      |
| Anotações das receitas    | IndexedDB      |

A restauração de backup valida o JSON com Zod antes de alterar os dados existentes. A operação tenta preservar os dados locais anteriores em caso de falha.

## Pré-requisitos

- Node.js 20 ou superior
- npm

## Executar localmente

```sh
npm install
npm run dev
```

O Vite exibirá o endereço local no terminal. Por padrão, a aplicação fica disponível em `http://localhost:5173`.

## Scripts disponíveis

```sh
npm run dev
npm run build
npm run preview
npm run test:run
npm run test:e2e
npm run lint
npm run format
npm run format:check
npx tsc --noEmit
```

### Testes unitários

```sh
npm run test:run
```

Os testes cobrem regras do domínio, armazenamento e componentes críticos.

### Testes end-to-end

```sh
npm run test:e2e
```

O Playwright inicia o servidor de desenvolvimento na porta `4174`, conforme `playwright.config.ts`.

### Build de produção

```sh
npm run build
npm run preview
```

O build executa a verificação TypeScript e gera os arquivos estáticos no diretório de saída do Vite.

## Publicar no GitHub Pages

O workflow `.github/workflows/pages.yml` executa lint, verificação de tipos, testes e build. Ao enviar alterações para `master`, publica automaticamente o conteúdo de `dist/` no GitHub Pages. Pull requests executam as verificações sem publicar.

Em **Settings → Pages**, selecione **GitHub Actions** como fonte de publicação. Para repositórios de projeto, o Vite detecta o nome do repositório e configura o _base path_; repositórios `usuario.github.io` e builds locais usam `/`. Para substituir o caminho (por exemplo, ao usar domínio personalizado), defina a variável de repositório `VITE_BASE_PATH` em **Settings → Secrets and variables → Actions → Variables**.

O build gera `404.html` a partir do `index.html` para que o GitHub Pages carregue a aplicação ao acessar diretamente ou recarregar uma rota SPA. O React Router e os recursos da PWA usam o mesmo _base path_.

Em Vercel ou Cloudflare Pages, use `npm run build` como comando de build e `dist` como diretório de saída. Configure `VITE_BASE_PATH=/` (padrão) e uma regra de fallback de rotas SPA para `/index.html` no provedor.

## PWA

A configuração em `vite.config.ts` registra o manifesto e os recursos offline. Os ativos JavaScript, CSS, HTML, imagens SVG e fontes necessárias são armazenados pelo Workbox.

Atualizações são aplicadas com uma confirmação da aplicação, evitando recarregamentos inesperados durante o uso.

## Cadastrar receitas

As novas receitas são arquivos TypeScript estáticos validados por Zod.

Consulte o guia completo: [Como cadastrar receitas](docs/COMO-CADASTRAR-RECEITAS.md).

Resumo do fluxo:

1. Adicionar o objeto em `src/data/recipes/`.
2. Colocar a imagem em `public/images/receitas/`.
3. Importar e incluir a receita em `src/data/recipes/index.ts`.
4. Executar o build ou a aplicação para validar o schema.

## Decisões técnicas

- Frontend-only: reduz custos de hospedagem, elimina a necessidade de servidor e mantém o uso gratuito.
- Dados locais: simplifica distribuição, demonstra privacidade por padrão e permite personalização sem conta.
- Zod em dados e backups: identifica dados inválidos durante o desenvolvimento e protege a restauração de JSON externo.
- Domínio independente de React: facilita testes, reutilização e manutenção das regras.
- Zustand: oferece estado global pequeno sem a complexidade de soluções maiores.
- IndexedDB: adequado para estruturas maiores e listas relacionadas, enquanto `localStorage` atende preferências simples.
- PWA: permite instalação e uso offline de recursos já carregados sem criar dependência de backend.
- Arquivos estáticos de receita: tornam o catálogo previsível e simples de versionar, revisar e ampliar.
