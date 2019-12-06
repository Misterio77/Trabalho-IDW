//Imports
const express = require('express');
const cors = require('cors');

//Instanciar express
const app = express();

//Usar middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rotas do api
const produtos = require('./api/loja/produtos');
app.use('/api/loja/produtos', produtos);

//Production


//Listen na porta especificada ou 5000 (padrao)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}, env ${process.env.NODE_ENV}`));
