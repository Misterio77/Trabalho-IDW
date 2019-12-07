/*
Trabalho IDW
Gabriel Fontes

Arquivo index do API dos horarios

/api/usuarios/<ID>/horarios
*/



const horarios = require('express').Router({'mergeParams': true});

//Rotas que executam em /
horarios.use('/', require('./raiz'));

//Rotas que executam num usuario dado
horarios.use('/:idHorario', require('./ids'));

//Exportar rotas
module.exports = horarios;
