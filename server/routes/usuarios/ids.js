/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas que precisam de ID do usuario

/api/usuarios/<ID>/
*/



const ids = require('express').Router({'mergeParams': true});;
const db = require.main.require('./db');
const ash = require('express-async-handler');

//Entrega um usuario especificado
ids.get(
  '/',
  ash(async(request, result) => {
    console.log(request.params.idUsuario);
    //Buscar pelo usuario com id dado
    const usuario = await db.Usuarios.findById(
      request.params.idUsuario
    );
    //Entregar
    result.status(200).json(usuario);
  })
);

//Atualiza (ou cria) um usuario especificado
ids.put(
  '/',
  ash(async(request, result) => {
    //Buscar pelo usuario dado, e atualizar
    const usuario = await db.Usuarios.findByIdAndUpdate(
      request.params.idUsuario,
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
    result.status(200).json(usuario);
  })
);

//Apaga um usuario especificado
ids.delete(
  '/',
  ash(async(request, result) => {
    //Buscar pelo usuario com id dado, e apagar
    const usuario = await db.Usuarios.findByIdAndDelete(request.params.idUsuario);
    //Entregar
    result.status(204).send();
  })
);


//Subrotas (para um dado usuario)
ids.use('/animais', require('./animais'));
//ids.use('/compras', require('./compras'));

//Exportar rotas
module.exports = ids;

