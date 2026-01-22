# Desafio Full Stack - Consulta de Processos

Este projeto implementa uma interface de consulta de processos jurídicos consumindo dados de um arquivo JSON estático. A solução foi estruturada para simular um ambiente de produção, com separação clara entre a interface do usuário e a camada de serviços.

O repositório está dividido em dois pacotes principais:
- **back-sbk**: API desenvolvida com NestJS.
- **front-sbk**: Aplicação web desenvolvida com React e Vite.

## Instruções para execução

Para rodar o projeto, é necessário ter o Node.js instalado (versão 18 ou superior).

### Backend
1. Entre na pasta `back-sbk`
2. Instale as dependências: `npm install`
3. Inicie o servidor: `npm run start:dev`

A API será iniciada em `http://localhost:3000`. A documentação dos endpoints via Swagger pode ser acessada em `http://localhost:3000/api`.

**Testes Automatizados (Bônus):**
Para validar a lógica crítica de negócio (seleção de tramitação), execute:
```bash
npm run test
```

### Frontend
1. Em outro terminal, entre na pasta `front-sbk`
2. Instale as dependências: `npm install`
3. Inicie a aplicação: `npm run dev`

O acesso será pelo endereço indicado no terminal (padrão `http://localhost:5173`).

---

# Detalhes do Backend

A API REST foi construída com **NestJS**, focando em arquitetura limpa e performance.

### Implementação e Arquitetura

A estrutura segue o padrão de **Repositórios** (`ProcessosRepository`) para isolar a fonte de dados (JSON) do restante da lógica de aplicação. Isso permite que, se houver necessidade de migrar para um banco de dados relacional ou documental, a alteração fique restrita à camada de infraestrutura, sem impactar a regra de negócio.

### Definição da Tramitação Atual (Regra de Negócio)
Um ponto central do desafio foi estabelecer um critério para selecionar a tramitação vigente de um processo. A lógica implementada (`TramitacaoRule`) segue a seguinte ordem de prioridade:
1.  **Status Ativo:** Tramitações marcadas como ativas têm precedência.
2.  **Data de Distribuição:** Critério de desempate pela data mais recente.
3.  **Grau:** Critério final de desempate pelo maior grau numérico.

### Performance e Paginação
Como o conjunto de dados é fixo e carregado em memória na inicialização, as operações de filtro e busca operam com baixa latência. Para o gerenciamento de grandes volumes na interface, optou-se pela **paginação via cursor** (codificado em Base64). Essa escolha evita os problemas comuns de performance e inconsistência de dados encontrados em paginações baseadas em offset.

### Validação e Segurança
Todos os parâmetros de entrada são validados. O uso do `ValidationPipe` global com `class-validator` garante que tipos incorretos ou campos não permitidos sejam rejeitados antes de atingirem a camada de serviço.

### Rotas da API

A documentação interativa (Swagger) está disponível em `/api`.

#### Processos
- **`GET /processos`**
  - **Descrição:** Retorna uma lista paginada de processos.
  - **Parâmetros:**
    - `q` (opcional): Busca textual (número, partes, classe, assunto).
    - `tribunal` (opcional): Sigla do tribunal.
    - `grau` (opcional): G1 ou G2.
    - `limit` (opcional): Limite de registros (default 20).
    - `cursor` (opcional): Cursor para próxima página.
  
- **`GET /processos/:numeroProcesso`**
  - **Descrição:** Retorna os detalhes completos de um processo.
  - **Parâmetro de Rota:** `numeroProcesso` (string).

#### Domínio
- **`GET /processos/tribunais`**
  - **Descrição:** Retorna a lista de siglas de tribunais disponíveis na base de dados para uso em filtros.

---

# Detalhes do Frontend

Interface desenvolvida em **React** (Vite) com **shadcn/ui** e **Tailwind CSS**, focada em usabilidade e fluidez.

### Gerenciamento de Requisições
Para a busca por texto, foi implementado um controle de cancelamento de requisições utilizando `AbortController`. Isso é essencial para evitar condições de corrida (*race conditions*) quando o usuário digita rapidamente, garantindo que o estado da aplicação sempre reflita o resultado da última busca disparada.

### Experiência do Usuário (UX)
A navegação e a filtragem foram desenhadas para evitar quebras visuais. Adotou-se um padrão similar ao *Stale-While-Revalidate*: durante o carregamento de novos dados, a lista atual permanece em tela com opacidade reduzida em vez de ser removida. Isso mantém o contexto do usuário e evita o *layout shift*.

### Filtros Dinâmicos
As opções do filtro de Tribunais são carregadas diretamente do endpoint `/processos/tribunais`, garantindo que o usuário veja apenas opções válidas baseadas nos dados reais, ao invés de uma lista estática.

### Estrutura e Hooks
A lógica de comunicação com o backend e o gerenciamento de estado da paginação estão encapsulados no hook customizado `useProcessos`. Isso mantém os componentes de visualização (como `ProcessosListPage`) focados apenas na renderização.
