/*
Trabalho IDW
Gabriel Fontes

Método GET para obter um usuario por ID
*/



//Importar metodos da database
const db = require('../../db');
//Utilizamos o ASH para evitar ter que digitar try e catch toda vez
//(Ele é um wrapper que chama next(err) caso encontre um erro.)
const ash = require('express-async-handler');

module.exports = ash(async(request, result) => {
  //Buscar pelo usuario com id dado
  const usuario = await db.Usuarios.findById(request.params.idUsuario);
  //Entregar
  result.status(200).json(usuario);
});
