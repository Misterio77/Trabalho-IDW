/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas que precisam de ID do horario
Apenas podem ser feitos pelo usuario, ou por admins em terceiros

/api/usuarios/<ID>/horarios/<ID>/
*/



const rotas = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const auth = require.main.require('./middleware/auth');
const ash = require('express-async-handler');

//Entrega um horario especificado
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
      //Pega seus horarios
      const horarios = usuario.horarios;
      //Encontra o horario especificado
      let horario = await horarios.id(request.params.idHorario);
      
      //Entregar
      result.status(200).json(horario);
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);

//Atualiza (ou cria) um horario especificado
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
      //Pega seus horarios
      const horarios = usuario.horarios;
      //Encontra o horario especificado
      let horario = await horarios.id(request.params.idHorario);
      
      //Caso exista, atualizar
      if (horario) {
        horario.set(request.body);
      }
      //Caso não exista
      else {
        //Guardar o ID dado
        request.body._id = request.params.idHorario;
        //Adicionar requisicao no array de horarios
        horarios.push(request.body);
      }
      
      //Usuario atualizado
      const retorno = await usuario.save();
      //Entregar (com o horario atualizado no corpo)
      result.status(200).json(retorno.horarios.id(request.params.idHorario));
    }
    else {
      result.status(401).send({error: 'Você não tem permissão para isso.'})
    }
  })
);

//Apaga um horario especificado
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
      //Pega seus horarios
      const horarios = usuario.horarios;
      //Encontra o horario especificado
      let horario = await horarios.id(request.params.idHorario);
      
      //Apagar horario
      horario.remove();
      
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
