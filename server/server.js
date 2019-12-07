/*
Trabalho IDW
Gabriel Fontes

BACKEND

Arquivo principal do Backend
Stack:
  Node.JS e Express
  MongoDB (pelo Mongoose)

Neste arquivo, importamos as rotas, ativamos os middlewares e mandamos o aplicativo ouvir na porta especificada pelo deployment

O frontend (pasta 'client') é empacotado aqui (pasta 'server/public'), e servimos por aqui também.
*/

//Imports
const express = require('express');
const cors = require('cors');

const app = express();


//Usar middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rotas do api
app.use('/api', require('./routes'));

//Listen na porta especificada ou 5000 (padrao)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
