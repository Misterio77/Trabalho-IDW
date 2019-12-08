/*
Trabalho IDW
Gabriel Fontes

Este modulo (middleware) retorna usuario, token e status de admin do usuario autenticado
*/

const jwt = require('jsonwebtoken');
const db = require.main.require('./db');

module.exports = async(request, response, next) => {
  const autorization = await request.header('Authorization');
  if (autorization) {
    try {
      const token = autorization.replace('Bearer ', '');
      const data = jwt.verify(token, process.env.JWT_KEY);
      const usuario = await db.Usuarios.findOne({ _id: data._id, 'tokens.token': token });
      if (!usuario) {
        throw new Error();
      }
      
      //Verificar se é admin
      request.admin = usuario.admin;
      console.log(usuario._id, usuario.nome);
      console.log('admin: ', request.admin);
      
      //Devolver usuario e token
      request.usuario = usuario;
      request.token = token;
      next();
    }
    catch (error) {
      response.status(401).send({error: 'Você não tem permissão ou sua requisição é inválida'});
    }
  }
  else {
    next();
  }
};
