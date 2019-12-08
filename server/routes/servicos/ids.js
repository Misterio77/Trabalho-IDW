/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas que precisam de ID do servico
São acessiveis por todos, mas só modificáveis por admins

/api/servicos/<ID>/
*/



const rotas = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const auth = require.main.require('./middleware/auth');
const ash = require('express-async-handler');

//Entrega um servico especifico
rotas.get(
  '/',
  ash(async(request, result) => {
    //Buscar pelo servico com id dado
    const servico = await db.Servicos.findById(request.params.rotaservico);
    //Entregar
    result.status(200).json(servico);
  })
);

//Atualiza (ou cria) um servico especificado
rotas.put(
  '/',
  auth,
  ash(async (request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (request.admin) {
      //Buscar pelo servico com id dado, e atualizar com o corpo dado
      const servico = await db.Servicos.findByIdAndUpdate(
        request.params.rotaservico,
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
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);

//Apaga um servico especificado
rotas.delete(
  '/',
  auth,
  ash(async (request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (request.admin) {
      //Buscar pelo servico com id dado, e apagar
      const servico = await db.Servicos.findByIdAndDelete(request.params.rotaservico);
      //Entregar
      result.status(204).send();
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);

module.exports = rotas;
