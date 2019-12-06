/*
Trabalho IDW
Gabriel Fontes

Método POST para adicionar novo servico
*/



//Importar metodos da database
const db = require('../../db');
//Utilizamos o ASH para evitar ter que digitar try e catch toda vez
//(Ele é um wrapper que chama next(err) caso encontre um erro.)
const ash = require('express-async-handler');

module.exports = ash(async(request, result) => {
  //Criar objeto com corpo dado
  const servico = new db.Servicos(request.body);
  //Enviar pra DB, e guardar na variavel pra entregar
  const retorno = await servico.save();
  //Url para enviar no header (boas praticas)
  var url = request.protocol + '://' + request.get('host') + request.originalUrl + servico._id;
  //Entregar
  result.status(201).location(url).json(retorno);
});
