/*
Trabalho IDW
Gabriel Fontes

Método GET para obter um produto por ID
*/



//Importar metodos da database
const db = require('../../db');
//Utilizamos o ASH para evitar ter que digitar try e catch toda vez
//(Ele é um wrapper que chama next(err) caso encontre um erro.)
const ash = require('express-async-handler');

module.exports = ash(async(request, result) => {
  //Buscar pelo produto com id dado
  const produto = await db.Produtos.findById(request.params.idProduto);
  //Entregar
  result.status(200).json(produto);
});
