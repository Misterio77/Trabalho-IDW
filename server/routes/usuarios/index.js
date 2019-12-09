/*
Trabalho IDW
Gabriel Fontes

Arquivo index do API dos usuarios

/api/usuarios
*/



const usuarios = require('express').Router({'mergeParams': true});

//Rotas que executam em /
usuarios.use('/', require('./raiz'));

//Rotas que executam num usuario dado
usuarios.use('/:idUsuario', require('./ids'));

//Exportar rotas
module.exports = usuarios;
