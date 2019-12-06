/*
Trabalho IDW
Gabriel Fontes

Método POST para adicionar novo produto
*/



//Importar metodos da database
const db = require('../../db');
//Utilizamos o ASH para evitar ter que digitar try e catch toda vez
//(Ele é um wrapper que chama next(err) caso encontre um erro.)
const ash = require('express-async-handler');

module.exports = ash(async(request, result) => {
  //Criar objeto com corpo dado
  const produto = new db.Produtos(request.body);
  //Enviar pra DB, e guardar na variavel pra entregar
  const retorno = await produto.save();
  //Url para enviar no header (boas praticas)
  var url = request.protocol + '://' + request.get('host') + request.originalUrl + produto._id;
  //Entregar
  result.status(201).location(url).json(retorno);
});
