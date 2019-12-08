/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas feitas na rotas dos compras
Apenas podem ser feitos pelo usuario, ou por admins em terceiros

/api/usuarios/<ID>/compras/
*/



const rotas = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const auth = require.main.require('./middleware/auth');
const ash = require('express-async-handler');


//Entrega todos os compras de um usuario
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
      const usuario = await db.Usuarios.findById(request.params.idUsuario).populate({
        path:'compras.produto',
        model: 'Produto'
      });
      //Pegar seus compras
      const compras = usuario.compras;
      //Entregar
      result.status(200).json(compras);
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);

//Adicionar um novo compra
rotas.post(  
  '/',
  auth,
  ash(async(request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (
      request.admin   ||
      (request.usuario !== undefined &&
      request.params.idUsuario === request.usuario._id)
    ) {
      //Acessar usuario
      const usuario = await db.Usuarios.findById(request.params.idUsuario).populate({
        path:'compras.produto',
        model: 'Produto'
      });
      //Pegar seus compras
      const compras = usuario.compras;
      
      //Adicionar requisicao no array de compras
      compras.push(request.body);
      //Salvar
      const retorno = await usuario.save();
      
      //Entregar
      result.status(201).json(retorno.compras);
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);


//Exportar rotas
module.exports = rotas;
