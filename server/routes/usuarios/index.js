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

//Handle production
if(process.env.NODE_ENV === 'production') {
  //Static folder
  app.use(express.static(__dirname + '/public'));
  
  //Handle SPA
  app.get(/.*/, (req,res) => res.sendFile(__dirname + '/public/index.html'));
}

//Exportar rotas
module.exports = usuarios;
