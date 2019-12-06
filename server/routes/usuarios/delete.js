/*
Trabalho IDW
Gabriel Fontes

Método DELETE para remover um usuario
*/



//Importar metodos da database
const db = require('../../db');
//Utilizamos o ASH para evitar ter que digitar try e catch toda vez
//(Ele é um wrapper que chama next(err) caso encontre um erro.)
const ash = require('express-async-handler');

module.exports = ash(async(request, result) => {
  //Buscar pelo usuario com id dado, e apagar
  const usuario = await db.Usuarios.findByIdAndDelete(request.params.idUsuario);
  //Entregar
  result.status(204).send();
});
