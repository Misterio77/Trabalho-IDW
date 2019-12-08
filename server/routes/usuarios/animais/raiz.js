/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas feitas na raiz dos animais
Apenas podem ser feitos pelo usuario, ou por admins em terceiros

/api/usuarios/<ID>/animais/
*/



const rotas = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const auth = require.main.require('./middleware/auth');
const ash = require('express-async-handler');

//Entrega todos os animais de um usuario
rotas.get(  
  '/',
  auth,
  ash(async(request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (
      request.admin   ||
      (request.usuario !== undefined &&
      request.params.idUsuario === request.usuario._id)
    ) {
      //Acessa um usuario
      const usuario = await db.Usuarios.findById(request.params.idUsuario);
      //Pegar seus animais
      const animais = usuario.animais;
      //Entregar
      result.status(200).json(animais);
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);

//Adicionar um novo animal
rotas.post(
  '/',
  auth,
  ash(async(request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (
      request.admin   ||
      request.params.idUsuario === request.usuario._id
    ) {
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
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);



//Exportar rotas
module.exports = rotas;
