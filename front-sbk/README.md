# Documentação do Frontend

Interface desenvolvida em React para consulta e visualização de processos jurídicos, focada em usabilidade e fluidez.

## Abordagem Técnica

A aplicação foi construída sobre o ecossistema Vite para um ambiente de desenvolvimento e build ágil. A parte visual utiliza Tailwind CSS e componentes do shadcn/ui, garantindo uma interface limpa e responsiva.

### Gerenciamento de Requisições
Para a busca por texto, foi implementado um controle de cancelamento de requisições utilizando AbortController. Isso é essencial para evitar condições de corrida (race conditions) quando o usuário digita rapidamente, garantindo que o estado da aplicação sempre reflita o resultado da última busca disparada.

### Experiência do Usuário
A navegação entre páginas e a aplicação de filtros foram desenhadas para evitar quebras visuais. Durante o carregamento de novos dados, a lista atual permanece em tela com um indicador visual de processamento, em vez de ser removida. Isso mantém o contexto do usuário e evita o "pulo" de layout (layout shift).

### Estrutura de Código
A lógica de comunicação com o backend e o gerenciamento de estado da paginação estão encapsulados em Hooks customizados. Isso mantém os componentes de visualização focados apenas na renderização, facilitando a manutenção e possíveis ajustes na lógica de busca.

## Trade-offs
Para este escopo, o uso de estado nativo do React foi suficiente. Em cenários de maior complexidade de dados e cache, a introdução de uma biblioteca de gerenciamento de estado de servidor seria o próximo passo natural para evolução do projeto.

## Execução
```bash
npm install
npm run dev
```
