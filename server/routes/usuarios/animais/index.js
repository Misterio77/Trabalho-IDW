/*
Trabalho IDW
Gabriel Fontes

Arquivo index do API dos animais

/api/usuarios/<ID>/animais
*/



const animais = require('express').Router({'mergeParams': true});

//Rotas que executam em /
animais.use('/', require('./raiz'));

//Rotas que executam num usuario dado
animais.use('/:idAnimal', require('./ids'));

//Exportar rotas
module.exports = animais;
