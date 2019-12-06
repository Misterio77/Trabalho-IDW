/*
Trabalho IDW
Gabriel Fontes

Método DELETE para remover um produto
*/



//Importar metodos da database
const db = require('../../db');
//Utilizamos o ASH para evitar ter que digitar try e catch toda vez
//(Ele é um wrapper que chama next(err) caso encontre um erro.)
const ash = require('express-async-handler');

module.exports = ash(async(request, result) => {
  //Buscar pelo produto com id dado, e apagar
  const produto = await db.Produtos.findByIdAndDelete(request.params.idProduto);
  //Entregar
  result.status(204).send();
});
