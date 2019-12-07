/*
Trabalho IDW
Gabriel Fontes

Arquivo index do API dos servicos

/api/servicos
*/



const servicos = require('express').Router({'mergeParams': true});

//Rotas que executam em
servicos.use('/', require('./raiz'));

//Rotas que executam num dado servico
servicos.use('/:idServico', require('./ids'));

//Exportar rotas
module.exports = servicos;
