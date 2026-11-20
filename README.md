# Ratatouille

Aplicação de receitas culinárias em React, TypeScript e Vite. Os dados pessoais são armazenados
localmente no navegador, sem backend.

## Recursos

- Catálogo, favoritos e lista de compras.
- Planejamento semanal por dia e refeição, com ingredientes consolidados por quantidade.
- Histórico de preparos e anotações locais em cada receita.
- Exportação e restauração de backup JSON validado com Zod.
- PWA instalável, com recursos em cache para uso offline e aviso de nova versão.

## Desenvolvimento

```sh
npm install
npm run dev
```

Validação:

```sh
npm run test:run
npm run lint
npm run build
```

O backup inclui favoritos, preferências, lista de compras, planejamento, histórico e anotações.
A restauração substitui esses dados neste navegador; mantenha uma cópia do arquivo exportado.
