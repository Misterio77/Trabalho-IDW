/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas feitas na raiz dos horarios

/api/usuarios/<ID>/horarios/
*/



const raiz = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const ash = require('express-async-handler');

//Entrega todos os horarios de um usuario
raiz.get(
  '/',
  ash(async (request, result) => {
    //Acessa um usuario
    const usuario = await db.Usuarios.findById(request.params.idUsuario);
    //Pegar seus horarios
    const horarios = usuario.horarios;
    
    
    //Entregar
    result.status(200).json(horarios);
  })
);

//Adicionar um novo horario
raiz.post(
  '/',
  ash(async(request, result) => {
    //Acessar usuario
    const usuario = await db.Usuarios.findById(request.params.idUsuario);
    //Pegar seus horarios
    const horarios = usuario.horarios;
    
    //Adicionar requisicao no array de horarios
    horarios.push(request.body);
    //Salvar
    const retorno = await usuario.save();
    
    //Entregar
    result.status(201).json(retorno.horarios);
  })
);


//Exportar rotas
module.exports = raiz;
