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
require('dotenv').config()


const app = express();

const port = process.env.PORT || 5000;

//Usar middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rotas do api
app.use('/api', require('./routes'));

//Handle production
if(process.env.NODE_ENV === 'production') {
  //Static folder
  app.use(express.static(__dirname + '/public'));
  
  //Handle SPA
  app.get(/.*/, (req,res) => res.sendFile(__dirname + '/public/index.html'));
}

//Listen na porta especificada ou 5000 (padrao)

app.listen(port, () => console.log(`Ouvindo na porta ${port}, no modo ${process.env.NODE_ENV}`));
