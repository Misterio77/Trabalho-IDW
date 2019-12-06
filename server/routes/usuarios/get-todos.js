/*
Trabalho IDW
Gabriel Fontes

Método GET para obter todos os usuarios
*/



//Importar metodos da database
const db = require('../../db');
//Utilizamos o ASH para evitar ter que digitar try e catch toda vez
//(Ele é um wrapper que chama next(err) caso encontre um erro.)
const ash = require('express-async-handler');

module.exports = ash(async (request, result) => {
  //Encontra todos os Usuarios
  const usuarios = await db.Usuarios.find({});
  //Entregar
  result.status(200).json(usuarios);
});
