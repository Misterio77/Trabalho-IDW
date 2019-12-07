/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas que precisam de ID do produto

/api/produtos/<ID>/
*/



const ids = require('express').Router({'mergeParams': true});;
const db = require.main.require('./db');
const ash = require('express-async-handler');

//Entrega um produto especifico
ids.get(
  '/',
  ash(async(request, result) => {
    //Buscar pelo produto com id dado
    const produto = await db.Produtos.findById(request.params.idProduto);
    //Entregar
    result.status(200).json(produto);
  })
);

//Atualiza (ou cria) um produto especificado
ids.put(
  '/',
ash(async(request, result) => {
  //Buscar pelo produto com id dado, e atualizar com o corpo dado
  const produto = await db.Produtos.findByIdAndUpdate(
    request.params.idProduto,
    request.body,
    {
      //Crie caso n exista
      'upsert': true,
      //Opcao para retornar o modificado
      'new': true,
      //Utilizar o novo metodo ao inves do obsoleto
      //'https://mongoosejs.com/docs/deprecations.html#findandmodify'
      'useFindAndModify': false
    }
  );
  //Entregar
  result.status(200).json(produto);
})
);

//Apaga um produto especificado
ids.delete(
  '/',
  ash(async(request, result) => {
    //Buscar pelo produto com id dado, e apagar
    const produto = await db.Produtos.findByIdAndDelete(request.params.idProduto);
    //Entregar
    result.status(204).send();
  })
);

module.exports = ids;
