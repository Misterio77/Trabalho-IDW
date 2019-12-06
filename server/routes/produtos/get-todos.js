/*
Trabalho IDW
Gabriel Fontes

Método GET para obter todos os produtos, filtrando com tags opcionalmente
*/



//Importar metodos da database
const db = require('../../db');
//Utilizamos o ASH para evitar ter que digitar try e catch toda vez
//(Ele é um wrapper que chama next(err) caso encontre um erro.)
const ash = require('express-async-handler');

module.exports = ash(async (request, result) => {
  //Caso tenhamos tags de busca
  if (request.query.tags) {
    //Transformar as tags em JSON
    const tags = JSON.parse(request.query.tags);
    //Buscar por produtos com TODAS as tags dadas
    const produtos = await db.Produtos.find({
      tags: {
        $all: tags
      }
    });
    //Entregar
    result.status(200).json(produtos);
  }
  //Caso nao tenhamos tags
  else {
    //Encontra todos os Produtos
    const produtos = await db.Produtos.find({});
    //Entregar
    result.status(200).json(produtos);
  }
});
