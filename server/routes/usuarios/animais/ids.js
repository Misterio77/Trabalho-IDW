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
    //Acessa um usuario
    const usuario = await db.Usuarios.findById(request.params.idUsuario);
    //Pega seus animais
    const animais = usuario.animais;
    //Encontra o animal especificado
    let animal = await animais.id(request.params.idAnimal);
    
    //Entregar
    result.status(200).json(animal);
  })
);

//Atualiza (ou cria) um animal especificado
ids.put(
  '/',
  ash(async(request, result) => {
    //Acessa um usuario
    const usuario = await db.Usuarios.findById(request.params.idUsuario);
    //Pega seus animais
    const animais = usuario.animais;
    //Encontra o animal especificado
    let animal = await animais.id(request.params.idAnimal);
    
    //Caso exista, atualizar
    if (animal) {
      animal.set(request.body);
    }
    //Caso não exista
    else {
      //Guardar o ID dado
      request.body._id = request.params.idAnimal;
      //Adicionar requisicao no array de animais
      animais.push(request.body);
    }
    
    //Usuario atualizado
    const retorno = await usuario.save();
    //Entregar (com o animal atualizado no corpo)
    result.status(200).json(retorno.animais.id(request.params.idAnimal));
  })
);

//Apaga um animal especificado
ids.delete(
  '/',
  ash(async(request, result) => {
    //Acessa um usuario
    const usuario = await db.Usuarios.findById(request.params.idUsuario);
    //Pega seus animais
    const animais = usuario.animais;
    //Encontra o animal especificado
    let animal = await animais.id(request.params.idAnimal);
    
    //Apagar animal
    animal.remove();
    
    //Salvar
    const retorno = await usuario.save();
    
    //Entregar
    result.status(204).send();
  })
);


//Exportar rotas
module.exports = ids;
