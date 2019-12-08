# Trabalho-IDW - Live Version
Projeto da disciplina Introdução ao Desenvolvimento Web

Nome: Gabriel Silva Fontes
N USP: 10856803

A versão live do site pode ser visualizada em [idw.misterio.me](http://idw.misterio.me/)


 ## Versões:

[Stage 1: Presentation page](https://github.com/Misterio77/Trabalho-IDW/tree/presentation)

[Stage 2: Functional Mockup](https://github.com/Misterio77/Trabalho-IDW/tree/mockup)

Stage 3: Clientside only (Pulei essa entrega)

[Stage 4: Final version](https://github.com/Misterio77/Trabalho-IDW/tree/master) - Work in Progress!

## Como instalar?

O programa é servido pelo NodeJS/Express. Que cuida das rotas do Rest API e também hospeda o app Vue.

Antes de tudo, você precisa ter NodeJS/NPM instalado. [Instruções aqui](https://nodejs.org/en/download/).

Além disso, você precisa de uma database MongoDB. Você pode hospedar sua própria, usar o [Atlas](https://cloud.mongodb.com/), ou usar a minha de testes mesmo (padrão se rodado em modo dev).

Feito isso, basta clonar o repositório, entrar na pasta, e instalar as dependências com o NPM:
```
npm install
```

Agora, decida se você quer rodar em modo production ou desenvolvimento:

#### Production:
Vamos usar o webpack para otimizar e "compilar" o app Vue para production. Entre na pasta `client` e use:
```
npm run build
```
Os arquivos estáticos serão criados na pasta `server/public`, prontos para serem servidos pelo node.

Arrume as variáveis de environment como achar nescessário. Você precisa de uma URL para MongoDB, a porta para rodar o app (backend e frontend) e uma JWT string secreta. Por exemplo, no Linux:
```
export PORT=80 JWT_KEY=AngelOfMusic MONGODB_URL='mongodb+srv://abc123:123321@misterio0-ac0ai.gcp.mongodb.net/petshop
```
Agora basta iniciar o programa no modo production. Volte para a raiz do projeto e use:
```
npm run start
```

#### Desenvolvimento:
Vamos começar rodando o Vue-cli pelo script NPM para servir o frontend. Entre na pasta `client` e use:
```
npm run serve
```
Como padrão, irá rodar na porta 8080.

Agora, vamos rodar o backend em modo de desenvolvimento (com hot-reload). Na pasta raiz, use:
```
npm run dev
```
Como padrão, irá rodar na porta 5000, usar a JWT string `BrilhoAlemDaFlor` e minha database de testes.
(Não recomendo mudar a porta, já que o proxy do Vue está configurado para fazer requisições em localhost:5000, mas pode alterar se julgar nescessário.)


## Funcionalidade:

### Rest API
Modéstia a parte, a parte mais bonita do programa é o Backend. Sua stack é NodeJS, Express e MongoDB (com o ODM Mongoose).

É minha primeira vez com esse tipo de API, mas acho que consegui seguir padrões e boas práticas.

Todo o API utiliza autenticação. Os usuários tem senhas salteadas e hasheadas. Basta fazer um POST de login, com email e senha, para gerar e receber o Token e utilizar o API em nome do usuário (ou admin).

#### Sobre
O API começa em `/api/`. A partir disso, temos `usuarios`, `produtos`, `servicos`.

Usuários é o conjunto de rotas mais complexo. Os usuários armazenam informações pessoais, animais registrados, produtos e serviços adquiridos.

Diferentes rotas precisam de diferentes privilégios.

Usuários podem ler e modificar suas próprias informações (exceto seus privilégios) apenas. Administradores podem ler e modificar informações de todos.

No caso de Produtos e Serviços, todas as informações podem ser lidas livremente, mas apenas modificadas por admins.

#### Rotas
**Públicas (não precisam de Token algum)**:

`POST /api/usuarios/` - Registrar usuário. Nome, email e senha obrigatórios.

`POST /api/usuarios/login` - Autenticar como usuário. Requer nome e senha corretos. Gera e retorna o Token

###### As rotas para produtos ou ou serviços são identicas, basta colocar `produtos` ou `servicos` na URL

`GET /api/<produtos:servicos>/` - Ver todos os produtos ou serviços.

`GET /api/<produtos:servicos>/<id>/` - Ver um produto ou serviço específico.


**Requer token de usuário**:

###### Primeiramente, rotas relacionadas a autenticação:

`POST /api/usuarios/logout/` - Apaga o Token usado na requisição, efetivamente deslogando. Adicione `/todos` no fim para apagar todos os Tokens do usuário.

`GET /api/usuarios/eu/` - Equivalente de `/api/usuariios/<idUsuario>.`. Útil para obter um ID de usuário.

###### Agora, rotas que interagem com informações de usuarios.

###### Todas as rotas que envolvem ID de usuário só podem ser usadas pelo próprio usuário em si mesmo. Admins podem usar rotas de qualquer usuário.

`GET /api/usuarios/<idUsuario>/` - Obter todas as informações sobre dado usuário.

`PUT /api/usuarios/<idUsuario>/` - Modificar informações do usuário (ou criar no ID, para admins). (O campo `admin` só pode ser marcado `true` por admins).

`DELETE /api/usuarios/<idUsuario>/` - Remover usuário.

###### Por fim subrotas para obter apenas os arrays de subdocumentos de usuarios. Todas essas subrotas podem ser para `animais`, `compras`, ou `horarios`:

`GET /api/usuarios/<idUsuario>/<animais:compras:horarios>/` - Obter todos os animais, compras ou horarios de um usuário.

`POST /api/usuarios/<idUsuario>/<animais:compras:horarios>/` - Criar novo animal, compra ou horario para um usuario.

###### Você também pode obter, modificar ou excluir animais, compras ou horarios. Basta usar o ID de algum deles.

`GET /api/usuarios/<idUsuario>/<animais:compras:horarios>/<id>` - Obter informações de dado animal, compra ou horario.

`PUT /api/usuarios/<idUsuario>/<animais:compras:horarios>/<id>` - Modificar (ou criar, idempotente) dado animal, compra ou horario.

`DELETE /api/usuarios/<idUsuario>/<animais:compras:horarios>/<id>` - Remover dado animal, compra ou horario.


**Requer token de administrador**

`GET /api/usuarios` - Obtem lista (e informações pessoais) de TODOS os usuários registrados.

###### Modificar e excluir produtos e serviços:

`POST /api/<produtos:servicos>/` - Cria novo produto ou serviço.

`PUT /api/<produtos:servicos>/<id>` - Modificar (ou criar, idempotente) produto ou serviço.

`DELETE /<produtos:servicos>/<id>` - Remover produto ou serviço.


##### Diagrama
![Diagrama](https://raw.githubusercontent.com/Misterio77/Trabalho-IDW/master/assets/flowchart.svg?sanitize=true)
