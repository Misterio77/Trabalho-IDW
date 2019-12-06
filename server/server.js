/*
Trabalho IDW
Gabriel Fontes

Arquivo principal do programa. Aqui estão ativados os middlewares e as rotas.
*/

//Imports
const express = require('express');
const cors = require('cors');

const app = express();

const db = require('./db');


//Usar middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rotas do api
app.use('/api', require('./routes'));

//Listen na porta especificada ou 5000 (padrao)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}, env ${process.env.NODE_ENV}`));
