/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas feitas na raiz dos servicos
São acessiveis por todos, mas só modificáveis por admins

/api/servicos/
*/



const rotas = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const auth = require.main.require('./middleware/auth');
const ash = require('express-async-handler');

//Entrega todos os servicos
rotas.get(
  '/',
  ash(async (request, result) => {
    //Encontra todos os servicos
    const servicos = await db.Servicos.find({});
    //Entregar
    result.status(200).json(servicos);
  })
);

//Adicionar novo servico
rotas.post(
  '/',
  auth,
  ash(async (request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (request.admin) {

      //Criar objeto com corpo dado
      const servico = new db.Servicos(request.body);
      //Enviar pra DB, e guardar na variavel pra entregar
      const retorno = await servico.save();
      //Url para enviar no header (boas praticas)
      var url = request.protocol + '://' + request.get('host') + request.originalUrl + servico._id;
      //Entregar
      result.status(201).location(url).json(retorno);
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);

module.exports = rotas;
