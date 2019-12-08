/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas que precisam de ID do animal
Apenas podem ser feitos pelo usuario, ou por admins em terceiros

/api/usuarios/<ID>/animais/<ID>/
*/



const rotas = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const auth = require.main.require('./middleware/auth');
const ash = require('express-async-handler');

//Entrega um animal especificado
rotas.get(  
  '/',
  auth,
  ash(async(request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (
      request.admin   ||
      (request.usuario !== undefined &&
      request.params.idUsuario === request.usuario._id)
    ) {
      //Acessa um usuario
      const usuario = await db.Usuarios.findById(request.params.idUsuario);
      //Pega seus animais
      const animais = usuario.animais;
      //Encontra o animal especificado
      let animal = await animais.id(request.params.idAnimal);
      
      //Entregar
      result.status(200).json(animal);
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);
//Atualiza (ou cria) um animal especificado
rotas.put(  
  '/',
  auth,
  ash(async(request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (
      request.admin   ||
      (request.usuario !== undefined &&
      request.params.idUsuario === request.usuario._id)
    ) {
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
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);

//Apaga um animal especificado
rotas.delete(  
  '/',
  auth,
  ash(async(request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (
      request.admin   ||
      (request.usuario !== undefined &&
      request.params.idUsuario === request.usuario._id)
    ) {
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
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);



//Exportar rotas
module.exports = rotas;
