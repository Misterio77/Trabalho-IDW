/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas feitas na raiz dos animais

/api/usuarios/<ID>/animais/
*/



const raiz = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const ash = require('express-async-handler');

//Entrega todos os animais de um usuario
raiz.get(
  '/',
  ash(async (request, result) => {
    //Acessa um usuario
    const usuario = await db.Usuarios.findById(request.params.idUsuario);
    //Pegar seus animais
    const animais = usuario.animais;
    //Entregar
    result.status(200).json(animais);
  })
);

//Adicionar um novo animal
raiz.post(
  '/',
  ash(async(request, result) => {
    //Acessar usuario
    const usuario = await db.Usuarios.findById(request.params.idUsuario);
    //Pegar seus animais
    const animais = usuario.animais;
    
    //Adicionar requisicao no array de animais
    animais.push(request.body);
    //Salvar
    const retorno = await usuario.save();
    
    //Entregar
    result.status(201).json(retorno.animais);
  })
);


//Exportar rotas
module.exports = raiz;