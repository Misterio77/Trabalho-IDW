/*
Trabalho IDW
Gabriel Fontes

Arquivo index do API dos compras

/api/usuarios/<ID>/compras
*/



const compras = require('express').Router({'mergeParams': true});

//Rotas que executam em /
compras.use('/', require('./raiz'));

//Rotas que executam num usuario dado
compras.use('/:idCompra', require('./ids'));

//Exportar rotas
module.exports = compras;
