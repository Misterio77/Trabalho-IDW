/*
Trabalho IDW
Gabriel Fontes

Arquivo index do API dos produtos
*/



const produtos = require('express').Router();


//Rotas desse nivel
produtos.get    ('/', require('./get-todos'));
produtos.post   ('/', require('./post'));
produtos.get    ('/:idProduto', require('./get-um'));
produtos.put    ('/:idProduto', require('./put'));
produtos.delete ('/:idProduto', require('./delete'));


module.exports = produtos;
