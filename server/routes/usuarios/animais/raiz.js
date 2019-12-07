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
    //Encontra todos os Animais
    const animais = await db.Usuarios.findById(
      request.params.idUsuario
    )
      .animais;
    console.log(animais);
    //Entregar
    result.status(200).json(animais);
  })
);

//Adicionar um novo animal
raiz.post(
  '/',
  ash(async(request, result) => {
    //Criar objeto com corpo dado
    const animal = new db.Animais(request.body);
    //Enviar pra DB, e guardar na variavel pra entregar
    const retorno = await animal.save();
    //Url para enviar no header (boas praticas)
    var url = request.protocol
      + '://'
      + request.get('host')
      + request.originalUrl
      + animal._id;

    //Entregar
    result.status(201).location(url).json(retorno);
  })
);


//Exportar rotas
module.exports = raiz;
