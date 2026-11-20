# Diretrizes do Projeto — App de Receitas Culinárias

## Regras de Resposta e Economia de Tokens
- Seja objetivo, direto e evite explicações longas ou repetições.
- Trabalhe APENAS na etapa solicitada no prompt atual. Não gere código de etapas futuras.
- Sempre informe o caminho do arquivo antes de mostrar o código.
- Ao sugerir comandos de terminal, agrupe-os em um único bloco.

## Stack Obrigatória
- React + TypeScript (`strict: true`) + Vite
- Tailwind CSS
- React Router DOM
- Zustand (estado global)
- Zod (validação de schema)
- Lucide React (ícones)
- Vitest + React Testing Library + Playwright (testes)
- ESLint + Prettier

## Arquitetura e Boas Práticas
- 100% Frontend (sem backend, sem APIs pagas, sem autenticação).
- Regras de negócio puras devem ficar isoladas em `src/domain/` (sem importar React).
- Dados estáticos das receitas em `src/data/recipes/` validados por schemas Zod em `src/data/schemas/`.
- Preferências simples e favoritos no `localStorage`; lista de compras, histórico, anotações e planejador no `IndexedDB`.
- UI Mobile First, semântica, acessível e com suporte a modo escuro.
- Escreva código e textos da interface em Português (PT-BR).