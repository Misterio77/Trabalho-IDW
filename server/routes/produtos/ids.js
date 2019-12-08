/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas que precisam de ID do produto
São acessiveis por todos, mas só modificáveis por admins

/api/produtos/<ID>/
*/



const rotas = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const auth = require.main.require('./middleware/auth');
const ash = require('express-async-handler');

//Entrega um produto especifico
rotas.get(
  '/',
  ash(async(request, result) => {
    //Buscar pelo produto com id dado
    const produto = await db.Produtos.findById(request.params.idProduto);
    //Entregar
    result.status(200).json(produto);
  })
);

//Atualiza (ou cria) um produto especificado
rotas.put(
  '/',
  auth,
  ash(async (request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (request.admin) {
      //Buscar pelo produto com id dado, e atualizar com o corpo dado
      const produto = await db.Produtos.findByIdAndUpdate(
        request.params.idProduto,
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
      result.status(200).json(produto);
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);

//Apaga um produto especificado
rotas.delete(
  '/',
  auth,
  ash(async (request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (request.admin) {
      //Buscar pelo produto com id dado, e apagar
      const produto = await db.Produtos.findByIdAndDelete(request.params.idProduto);
      //Entregar
      result.status(204).send();
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);

module.exports = rotas;
