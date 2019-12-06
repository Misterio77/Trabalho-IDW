/*
Trabalho IDW
Gabriel Fontes

Método PUT para atualizar/criar um servico (idempotente)
*/



//Importar metodos da database
const db = require('../../db');
//Utilizamos o ASH para evitar ter que digitar try e catch toda vez
//(Ele é um wrapper que chama next(err) caso encontre um erro.)
const ash = require('express-async-handler');

module.exports = ash(async(request, result) => {
  //Buscar pelo servico com id dado, e atualizar com o corpo dado
  const servico = await db.Servicos.findByIdAndUpdate(
    request.params.idServico,
    request.body,
    {
      //Crie caso n exista
      'upsert': true,
      //Opcao para retornar o modificado
      'new': true,
      //Utilizar o novo metodo ao inves do obsoleto
      //'https://mongoosejs.com/docs/deprecations.html#findandmodify'
      'useFindAndModify': false
    }
  );
  //Entregar
  result.status(200).json(servico);
});
