/*
Trabalho IDW
Gabriel Fontes

Arquivo principal do API, que conecta todas as partes
*/



const routes = require('express').Router();

//GET Teste
routes.get('/', (request, result) => {
  result.status(200).json({ message: 'Conectado!' });
});

//Rotas do API
routes.use('/produtos', require('./produtos'));
routes.use('/servicos', require('./servicos'));
routes.use('/usuarios', require('./usuarios'));


module.exports = routes;

