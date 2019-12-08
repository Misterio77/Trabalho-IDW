/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas que precisam de ID do compra
Apenas podem ser feitos pelo usuario, ou por admins em terceiros

/api/usuarios/<ID>/compras/<ID>/
*/



const rotas = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const auth = require.main.require('./middleware/auth');
const ash = require('express-async-handler');


//Entrega um compra especificado
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
      //Pega seus compras
      const compras = usuario.compras;
      //Encontra o compra especificado
      let compra = await compras.id(request.params.idCompra);
      
      //Entregar
      result.status(200).json(compra);
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);

//Atualiza (ou cria) um compra especificado
rotas.put(  
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
      //Pega seus compras
      const compras = usuario.compras;
      //Encontra o compra especificado
      let compra = await compras.id(request.params.idCompra);
      
      //Caso exista, atualizar
      if (compra) {
        compra.set(request.body);
      }
      //Caso não exista
      else {
        //Guardar o ID dado
        request.body._id = request.params.idCompra;
        //Adicionar requisicao no array de compras
        compras.push(request.body);
      }
      
      //Usuario atualizado
      const retorno = await usuario.save();
      //Entregar (com o compra atualizado no corpo)
      result.status(200).json(retorno.compras.id(request.params.idCompra));
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);

//Apaga um compra especificado
rotas.delete(  
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
      //Pega seus compras
      const compras = usuario.compras;
      //Encontra o compra especificado
      let compra = await compras.id(request.params.idCompra);
      
      //Apagar compra
      compra.remove();
      
      //Salvar
      const retorno = await usuario.save();
      
      //Entregar
      result.status(204).send();
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);


//Exportar rotas
module.exports = rotas;
