/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas que precisam de ID do animal

/api/usuarios/<ID>/animais/<ID>/
*/



const ids = require('express').Router({'mergeParams': true});;
const db = require.main.require('./db');
const ash = require('express-async-handler');

//Entrega um animal especificado
ids.get(
  '/',
  ash(async(request, result) => {
    console.log(request.params.idAnimal);
    //Buscar pelo animal com id dado
    const animal = await db.Animais.findById(
      request.params.idAnimal
    );
    //Entregar
    result.status(200).json(animal);
  })
);

//Atualiza (ou cria) um animal especificado
ids.put(
  '/',
  ash(async(request, result) => {
    //Buscar pelo animal dado, e atualizar
    const animal = await db.Animais.findByIdAndUpdate(
      request.params.idAnimal,
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
    result.status(200).json(animal);
  })
);

//Apaga um animal especificado
ids.delete(
  '/',
  ash(async(request, result) => {
    //Buscar pelo animal com id dado, e apagar
    const animal = await db.Animais.findByIdAndDelete(request.params.idAnimal);
    //Entregar
    result.status(204).send();
  })
);


//Subrotas (para um dado animal)
//ids.use('/agenda', require('./agenda'));

//Exportar rotas
module.exports = ids;

