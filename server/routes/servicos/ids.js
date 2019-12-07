/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas que precisam de ID do servico

/api/servicos/<ID>/
*/



const ids = require('express').Router({'mergeParams': true});;
const db = require.main.require('./db');
const ash = require('express-async-handler');

//Entrega um servico especifico
ids.get(
  '/',
  ash(async(request, result) => {
    //Buscar pelo servico com id dado
    const servico = await db.Servicos.findById(request.params.idServico);
    //Entregar
    result.status(200).json(servico);
  })
);

//Atualiza (ou cria) um servico especificado
ids.put(
  '/',
ash(async(request, result) => {
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
})
);

//Apaga um servico especificado
ids.delete(
  '/',
  ash(async(request, result) => {
    //Buscar pelo servico com id dado, e apagar
    const servico = await db.Servicos.findByIdAndDelete(request.params.idServico);
    //Entregar
    result.status(204).send();
  })
);

module.exports = ids;
