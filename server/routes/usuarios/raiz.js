/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas feitas na raiz dos usuarios

/api/usuarios/
*/



const raiz = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const ash = require('express-async-handler');

//Entrega todos os usuarios
raiz.get(
  '/',
  ash(async (request, result) => {
    //Encontra todos os Usuarios
    const usuarios = await db.Usuarios.find({}).populate('horarios.servico');
    //Entregar
    result.status(200).json(usuarios);
  })
);

//Adicionar um novo usuario
raiz.post(
  '/',
  ash(async(request, result) => {
    //Criar objeto com corpo dado
    const usuario = new db.Usuarios(request.body);
    //Enviar pra DB, e guardar na variavel pra entregar
    const retorno = await usuario.save();

    //Entregar
    result.status(201).json(retorno);
  })
);


//Exportar rotas
module.exports = raiz;
