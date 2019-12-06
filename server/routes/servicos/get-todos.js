/*
Trabalho IDW
Gabriel Fontes

Método GET para obter todos os servicos
*/



//Importar metodos da database
const db = require('../../db');
//Utilizamos o ASH para evitar ter que digitar try e catch toda vez
//(Ele é um wrapper que chama next(err) caso encontre um erro.)
const ash = require('express-async-handler');

module.exports = ash(async (request, result) => {
  //Encontra todos os servicos
  const servicos = await db.Servicos.find({});
  //Entregar
  result.status(200).json(servicos);
});
