/*
Trabalho IDW
Gabriel Fontes

Método DELETE para remover um servico
*/



//Importar metodos da database
const db = require('../../db');
//Utilizamos o ASH para evitar ter que digitar try e catch toda vez
//(Ele é um wrapper que chama next(err) caso encontre um erro.)
const ash = require('express-async-handler');

module.exports = ash(async(request, result) => {
  //Buscar pelo servico com id dado, e apagar
  const servico = await db.Servicos.findByIdAndDelete(request.params.idServico);
  //Entregar
  result.status(204).send();
});
