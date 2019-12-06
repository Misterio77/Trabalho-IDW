/*
Trabalho IDW
Gabriel Fontes

Arquivo index do API dos usuarios
*/



const usuarios = require('express').Router();

//Rotas desse nivel
usuarios.get    ('/', require('./get-todos'));
usuarios.post   ('/', require('./post'));
usuarios.get    ('/:idUsuario', require('./get-um'));
usuarios.put    ('/:idUsuario', require('./put'));
usuarios.delete ('/:idUsuario', require('./delete'));

//Rotas abaixo
//usuarios.use('/:idUsuario/animais', require('./animais'));
//usuarios.use('/:idUsuario/compras', require('./compras'));

module.exports = usuarios;
