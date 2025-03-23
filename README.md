

# node-api-auth

     

Uma API Node.js com autenticação JWT, utilizando Express e MongoDB.

## Descrição

Este projeto é uma API RESTful construída com Node.js e Express, que implementa autenticação de usuários utilizando JSON Web Tokens (JWT). O banco de dados utilizado é o MongoDB, e a aplicação está configurada para se conectar ao MongoDB Atlas. Além disso, a API oferece operações CRUD para gerenciamento de usuários e autenticação.

## Funcionalidades

Registro de novos usuários

Login de usuários com geração de JWT

Operações CRUD para gerenciamento de usuários

Proteção de rotas utilizando middleware de autenticação


### Tecnologias Utilizadas

Node.js

Express

MongoDB

Mongoose

JWT (jsonwebtoken)


### Instalação

Clone o repositório:

        git clone https://github.com/lgdacruz/node-api-auth.git

Navegue até o diretório do projeto:

        cd node-api-auth

Instale as dependências:

        npm install

### Configure as variáveis de ambiente:

Renomeie o arquivo .env.example para .env.
Preencha as variáveis de ambiente conforme necessário, incluindo as configurações do MongoDB e do serviço de e-mail.

Inicie o servidor:

        npm start
O servidor estará em execução no endereço http://localhost:3000.
