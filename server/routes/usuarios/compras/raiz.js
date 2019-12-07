/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas feitas na raiz dos compras

/api/usuarios/<ID>/compras/
*/



const raiz = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const ash = require('express-async-handler');

//Entrega todos os compras de um usuario
raiz.get(
  '/',
  ash(async (request, result) => {
    //Acessa um usuario
    const usuario = await db.Usuarios.findById(request.params.idUsuario);
    //Pegar seus compras
    const compras = usuario.compras;
    //Entregar
    result.status(200).json(compras);
  })
);

//Adicionar um novo compra
raiz.post(
  '/',
  ash(async(request, result) => {
    //Acessar usuario
    const usuario = await db.Usuarios.findById(request.params.idUsuario);
    //Pegar seus compras
    const compras = usuario.compras;
    
    //Adicionar requisicao no array de compras
    compras.push(request.body);
    //Salvar
    const retorno = await usuario.save();
    
    //Entregar
    result.status(201).json(retorno.compras);
  })
);


//Exportar rotas
module.exports = raiz;
