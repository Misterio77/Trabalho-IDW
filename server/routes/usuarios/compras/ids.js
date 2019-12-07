/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas que precisam de ID do compra

/api/usuarios/<ID>/compras/<ID>/
*/



const ids = require('express').Router({'mergeParams': true});;
const db = require.main.require('./db');
const ash = require('express-async-handler');

//Entrega um compra especificado
ids.get(
  '/',
  ash(async(request, result) => {
    //Acessa um usuario
    const usuario = await db.Usuarios.findById(request.params.idUsuario);
    //Pega seus compras
    const compras = usuario.compras;
    //Encontra o compra especificado
    let compra = await compras.id(request.params.idCompra);
    
    //Entregar
    result.status(200).json(compra);
  })
);

//Atualiza (ou cria) um compra especificado
ids.put(
  '/',
  ash(async(request, result) => {
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
  })
);

//Apaga um compra especificado
ids.delete(
  '/',
  ash(async(request, result) => {
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
  })
);


//Exportar rotas
module.exports = ids;
