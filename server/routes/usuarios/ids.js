/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas que precisam de ID do usuario
Todas essas (e as sub rotas) são acessiveis apenas pelo administrador ou dono das informações

/api/usuarios/<ID>/
*/



const rotas = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const auth = require.main.require('./middleware/auth')
const ash = require('express-async-handler');

//GET - Entrega um usuario especificado, usuario autenticado pode ver ele proprio, admins podem ver todos
rotas.get(
  '/',
  auth,
  ash(async (request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (
      request.admin   ||
      (request.usuario !== undefined &&
      request.params.idUsuario === request.usuario._id)
    ) {
      //Buscar pelo usuario com id dado
      const usuario = await db.Usuarios.findById(
        request.params.idUsuario
      );
      //Entregar
      result.status(200).json(usuario);
    }
    else {
      result.status(401).send({
        error: 'Você não tem permissão para isso.'
      })
    }
  })
);

//PUT - Atualiza (ou cria) um usuario especificado. O próprio usuário ou admins podem fazer, mas apenas admins podem modificar terceiros ou fazer admins
rotas.put(
  '/',
  auth,
  ash(async (request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (
      request.admin   ||
      (request.usuario !== undefined &&
      request.params.idUsuario === request.usuario._id)
    ) {
      //Buscar pelo usuario dado
      const usuario = await db.Usuarios.findById(request.params.idUsuario);
      let token = request.token;

      if (request.body.senha) {
        usuario.senha = request.body.senha;
        usuario.tokens = [];
        token = await usuario.gerarToken();
      }

      //Caso requisitado por admin, pode ser passado true, caso contrário, false
      usuario.admin = (request.admin && request.body.admin) ? true : false;
      
      if (request.body.nome) usuario.nome = request.body.nome;
      if (request.body.email) usuario.email = request.body.email;
      if (request.body.imagem) usuario.imagem = request.body.imagem;
      if (request.body.endereco) usuario.endereco = request.body.endereco;
      if (request.body.telefone) usuario.telefone = request.body.telefone;
      if (request.body.animais) usuario.animais = request.body.animais;
      if (request.body.horarios) usuario.horarios = request.body.horarios;
      if (request.body.compras) usuario.compras = request.body.compras;

      await usuario.save();
      //Entregar
      result.status(200).json({
        usuario,
        token
      });
    }
    else {
      result.status(401).send({
        error: 'Você não tem permissão para isso.'
      })
    }
  })
);

//DELETE - Apaga um usuario. Apenas admins podem apagar terceiros
rotas.delete(
  '/',
  auth,
  ash(async (request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (
      request.admin   ||
      (request.usuario !== undefined &&
      request.params.idUsuario === request.usuario._id)
    ) {
      //Buscar pelo usuario com id dado, e apagar
      const usuario = await db.Usuarios.findByIdAndDelete(request.params.idUsuario);
      //Entregar
      result.status(204).send();
    }
    else {
      result.status(401).send({
        error: 'Você não tem permissão para isso.'
      })
    }
  })
);


//Subrotas (para um dado usuario)
rotas.use('/animais', require('./animais'));
rotas.use('/compras', require('./compras'));
rotas.use('/horarios', require('./horarios'));

//Exportar rotas
module.exports = rotas;
