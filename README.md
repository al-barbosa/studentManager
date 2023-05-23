
# Gerenciador de inscrições

Este diretório contém o código do FrontEnd e BackEnd para o Um gerenciador de inscrições. 

No FrontEnd foi feito usado React para a criação das páginas e componentes.

Já no BackEnd, foi criado um banco de dados em MySQL com auxílio do Sequelizer como ORM.

Em ambos, o projeto foi escrito em TypeScript.

## Descrição
O projeto tem como objetivo servir dois tipos de usuários: Alunos e administradores.

Para os administradores, o projeto apresenta as funcionalidades:
- Um Dashboard com o total de horas registradas por cada aluno
- Tabela com o nome de cada aluno registrado, bem como categorias nas quais o aluno está registrado, data do último login e data de criação do usuário
- Formulário para criação de um novo aluno
- Listagem de solicitações feitas por alunos para se inscreverem em novas categorias, podendo o administrador rejeitar ou aceitar a solicitação

Já para os alunos, as funcionalidades são:
- Verificar em quais categorias está já inscrito
- Listagem de pedidos de inscrição em aberto
- Solicitação inscrição em uma nova categoria, excluindo as que já está registrado ou as que já têm solicitações em aberto 

## Requisitos

-   Node.js
-   MySQL

## Instruções de uso
Para a correta ligação entre o a página e a API, é necessário primeiro garantir que o BackEnd esteja rodando corretamente. 
Após isso, basta inicializar o FrontEnd para ter acesso à aplicação.


### BackEnd
Para instalar a API, entre na pasta correspontende e siga o README dela.

`cd backend/` 

### FrontEnd
Para instalar e rodar a página, entre na pasta correspondente e siga as instruções no README.

`cd frontend/`

## Como usar
Com a aplicação e a API rodando, é possível acessar alguns dos perfis criados para teste no BackEnd. Abaixo, estão os emails criados. Em todos os casos, a senha é sempre 123456. É importante lembrar de, na tela de login, informar se será feito ingresso como usuário ou administrador.

| Email  | Categoria |
| ------------- | ------------- |
| carlos@email.com  | Aluno  |
| maria@email.com  | Aluno  |
| luiz@email.com  | Aluno  |
| flavio@email.com  | Aluno  |
| rafaela@email.com  | Aluno  |
| eduarda@email.com  | Administrador  |
| helena@email.com  | Administrador  |
| guilherme@email.com  | Administrador  |
