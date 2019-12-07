/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas feitas na raiz dos produtos

/api/produtos/
*/



const raiz = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const ash = require('express-async-handler');

//Entrega todos os produtos
raiz.get(
  '/',
  ash(async (request, result) => {
    //Encontra todos os produtos
    const produtos = await db.Produtos.find({});
    //Entregar
    result.status(200).json(produtos);
  })
);

//Adicionar novo produto
raiz.post(
  '/',
  ash(async(request, result) => {
    //Criar objeto com corpo dado
    const produto = new db.Produtos(request.body);
    //Enviar pra DB, e guardar na variavel pra entregar
    const retorno = await produto.save();
    //Url para enviar no header (boas praticas)
    var url = request.protocol + '://' + request.get('host') + request.originalUrl + produto._id;
    //Entregar
    result.status(201).location(url).json(retorno);
  })
);

module.exports = raiz;
