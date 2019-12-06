/*
Trabalho IDW
Gabriel Fontes

Arquivo index do API dos servicos
*/



const servicos = require('express').Router();


//Rotas desse nivel
servicos.get    ('/', require('./get-todos'));
servicos.post   ('/', require('./post'));
servicos.get    ('/:idServico', require('./get-um'));
servicos.put    ('/:idServico', require('./put'));
servicos.delete ('/:idServico', require('./delete'));


module.exports = servicos;
