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

Estado:
O Backend está 100% feito, funcionando perfeitamente com autenticação e tudo.
O Frontend ainda não está acabado, provavelmente não está pronto a tempo da entrega. Está bem bagunçado e estou no processo de reestruturar. Mas, ao menos, o básico de login/logout e interação com o backend está feito.

## Como instalar?

O programa é servido pelo NodeJS/Express. Que cuida das rotas do Rest API e também hospeda o app Vue.

Antes de tudo, você precisa ter NodeJS/NPM instalado. [Instruções aqui](https://nodejs.org/en/download/).

Além disso, você precisa de uma database MongoDB. Você pode hospedar sua própria, usar o [Atlas](https://cloud.mongodb.com/), ou usar a minha mesmo.

Clone ou baixe o repositório da sua maneira preferida. Se você quer ir pelo git:
```
git clone https://github.com/Misterio77/Trabalho-IDW
```
Entre na pasta:
```
cd Trabalho-IDW
```

Feito isso, precisamos instalar as dependencias do backend e do frontend. A partir da pasta raiz, use:
```
npm install
cd client
npm install
```

Agora, decida se você quer rodar em modo production ou desenvolvimento:

#### Production:
Vamos usar o webpack para otimizar e "compilar" o app Vue para production. Ainda na pasta `client`, use:
```
npm run build
```
Os arquivos estáticos serão criados na pasta `server/public`, prontos para serem servidos pelo node.

No production, a porta padrão do backend é 8080. O frontend será servido por meio dele.

O frontend buscará o backend na mesmo host e porta que ele está sendo servido.

Caso queira, arrume as variáveis de environment como achar nescessário, em sua IDE, cloud, etc.
Você também pode dar uma olhada no arquivo `.env`, que tem as variáveis para produção que eu setei (inclui uma database no MongoDB Atlas).

Agora basta iniciar o backend no modo production. Volte para a raiz do projeto e use:
```
npm run start
```
Pronto!

#### Desenvolvimento:
Vamos começar rodando script NPM 'serve' para servir o frontend. Ainda na pasta `client`, use:
```
npm run serve
```
Assim como no production, ele busca o backend no mesmo host e porta. Porém, como no modo dev rodamos os dois separadamente, ele usará a `localhost:5000` como proxy do `/api`.

Agora, vamos rodar o backend em modo de desenvolvimento (com hot-reload). Na pasta raiz, use:
```
npm run dev
```
Como padrão, irá rodar na porta 5000, usar a JWT string `BrilhoAlemDaFlor` e minha database de testes (também no atlas).
Caso queira mudar a porta do backend, você também deve mudar o proxy em `client/vue.config.js`


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

`GET /api/usuarios/eu/` - Equivalente de `/api/usuariios/<idUsuario>`. Útil para obter um ID de usuário.

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

