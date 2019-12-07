/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas feitas na raiz dos servicos

/api/servicos/
*/



const raiz = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const ash = require('express-async-handler');

//Entrega todos os servicos
raiz.get(
  '/',
  ash(async (request, result) => {
    //Encontra todos os servicos
    const servicos = await db.Servicos.find({});
    //Entregar
    result.status(200).json(servicos);
  })
);

//Adicionar novo servico
raiz.post(
  '/',
  ash(async(request, result) => {
    //Criar objeto com corpo dado
    const servico = new db.Servicos(request.body);
    //Enviar pra DB, e guardar na variavel pra entregar
    const retorno = await servico.save();
    //Url para enviar no header (boas praticas)
    var url = request.protocol + '://' + request.get('host') + request.originalUrl + servico._id;
    //Entregar
    result.status(201).location(url).json(retorno);
  })
);

module.exports = raiz;
