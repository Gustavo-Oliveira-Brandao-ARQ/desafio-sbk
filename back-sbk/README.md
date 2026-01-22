# Documentação do Backend

Esta API foi desenvolvida utilizando NestJS e tem como objetivo processar e servir dados de processos jurídicos de forma eficiente.

## Implementação e Arquitetura

A estrutura segue o padrão de repositórios para isolar a fonte de dados (JSON) do restante da lógica de aplicação. Isso permite que, se houver necessidade de migrar para um banco de dados relacional ou documental, a alteração fique restrita à camada de infraestrutura.

### Definição da Tramitação Atual
Um ponto central do desafio foi estabelecer um critério para selecionar a tramitação vigente de um processo. A lógica implementada prioriza registros ativos, utilizando a data de distribuição e o grau do processo como critérios de desempate sequenciais. Essa regra está centralizada na classe TramitacaoRule para garantir que o dado exibido na listagem seja idêntico ao do detalhamento.

### Performance e Paginação
Como o conjunto de dados é fixo e carregado em memória na inicialização, as operações de filtro e busca operam com baixa latência. Para o gerenciamento de grandes volumes na interface, optou-se pela paginação via cursor (codificado em Base64). Essa escolha evita os problemas comuns de performance e inconsistência de dados encontrados em paginações baseadas em offset.

### Validação e Segurança
Todos os parâmetros de entrada nos endpoints de listagem são validados e tipados. O uso do ValidationPipe garante que o limite de registros seja respeitado e que tipos de dados incorretos sejam rejeitados antes de atingirem a camada de serviço.

## API e Documentação

A API expõe três rotas principais:
- Listagem geral com suporte a busca e filtros.
- Consulta de tribunais únicos presentes na base (usada para popular filtros no front).
- Detalhamento de um processo específico via número identificador.

O contrato completo da API está disponível através do Swagger na rota /api.

## Execução
```bash
npm install
npm run start:dev
```

## Testes Automatizados

O projeto inclui testes unitários para validar a lógica de seleção de tramitação (regra de negócio crítica). Para executá-los:

```bash
npm run test
```
