# Desafio Full Stack - Consulta de Processos

Este projeto implementa uma interface de consulta de processos jurídicos consumindo dados de um arquivo JSON estático. A solução foi estruturada para simular um ambiente de produção, com separação clara entre a interface do usuário e a camada de serviços.

O repositório está dividido em dois pacotes principais:
- back-sbk: API desenvolvida com NestJS.
- front-sbk: Aplicação web desenvolvida com React e Vite.

## Instruções para execução

Para rodar o projeto, é necessário ter o Node.js instalado (versão 18 ou superior).

### Backend
1. Entre na pasta back-sbk
2. Instale as dependências: npm install
3. Inicie o servidor: npm run start:dev

A API será iniciada em http://localhost:3000. A documentação dos endpoints via Swagger pode ser acessada em http://localhost:3000/api.

### Frontend
1. Em outro terminal, entre na pasta front-sbk
2. Instale as dependências: npm install
3. Inicie a aplicação: npm run dev

O acesso será pelo endereço indicado no terminal (padrão http://localhost:5173).

## Resumo técnico

A aplicação permite a busca textual em processos, filtragem por tribunal e grau, além de visualização detalhada de cada registro. A paginação foi implementada via cursor para garantir consistência e performance na navegação.

Informações detalhadas sobre as decisões de arquitetura e regras de negócio estão disponíveis nos arquivos README específicos de cada diretório.