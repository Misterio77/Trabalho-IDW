/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas que precisam de ID do horario

/api/usuarios/<ID>/horarios/<ID>/
*/



const ids = require('express').Router({'mergeParams': true});;
const db = require.main.require('./db');
const ash = require('express-async-handler');

//Entrega um horario especificado
ids.get(
  '/',
  ash(async(request, result) => {
    //Acessa um usuario
    const usuario = await db.Usuarios.findById(request.params.idUsuario);
    //Pega seus horarios
    const horarios = usuario.horarios;
    //Encontra o horario especificado
    let horario = await horarios.id(request.params.idHorario);
    
    //Entregar
    result.status(200).json(horario);
  })
);

//Atualiza (ou cria) um horario especificado
ids.put(
  '/',
  ash(async(request, result) => {
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
  })
);

//Apaga um horario especificado
ids.delete(
  '/',
  ash(async(request, result) => {
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
  })
);


//Exportar rotas
module.exports = ids;
