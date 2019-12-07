/*
Trabalho IDW
Gabriel Fontes

Arquivo index do API dos produtos

/api/produtos
*/



const produtos = require('express').Router({'mergeParams': true});

//Rotas que executam em
produtos.use('/', require('./raiz'));

//Rotas que executam num dado produto
produtos.use('/:idProduto', require('./ids'));

//Exportar rotas
module.exports = produtos;
