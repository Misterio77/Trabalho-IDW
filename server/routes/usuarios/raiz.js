/*
Trabalho IDW
Gabriel Fontes

Aqui concentram as rotas feitas na raiz dos usuarios
Algumas são especiais para autenticados, outras sao publicas, e um GET all é apenas para admins

/api/usuarios/
*/



const rotas = require('express').Router({'mergeParams': true});
const db = require.main.require('./db');
const auth = require.main.require('./middleware/auth');
const ash = require('express-async-handler');

//GET - Entrega todos os usuarios (apenas para admins)
rotas.get(
  '/',
  auth,
  ash(async (request, result) => {
    //Caso seja o usuario especificado ou seja admin
    if (request.admin) {
      //Encontra todos os Usuarios
      const usuarios = await db.Usuarios.find({});
      //Entregar
      result.status(200).json(usuarios);
    }
    else {
      result.status(401).send({
        error: 'Você não tem permissão para isso.'
      })
    }
  })
);

//POST - Registra um novo usuario. Apenas admins podem adicionar admins.
rotas.post(
  '/',
  auth,
  ash(async (request, result) => {
    //Criar objeto com corpo dado
    const usuario = new db.Usuarios(request.body);

    //Caso requisitado por admin, pode ser passado true, caso contrário, false
    usuario.admin = (request.admin && request.body.admin) ? true : false;

    //Enviar pra DB
    await usuario.save();
    const token = await usuario.gerarToken();

    //Entregar
    result.status(201).json({
      usuario,
      token
    });
  })
);

//Rotas especiais para logados =====

//GET - Entrega o usuario cujo token foi usado
rotas.get(
  '/eu',
  auth,
  ash(async (request, result) => {
    //Buscar pelo usuario com id dado
    const usuario = await db.Usuarios.findById(request.usuario._id);
    //Entregar
    result.status(200).json(usuario);
  })
);

//POST - Recebe usuario e senha, cria devolve o token
rotas.post(
  '/login',
  ash(async (request, result) => {
    try {
      const {
        email,
        senha
      } = request.body;
      const usuario = await db.Usuarios.buscarPorCredenciais(email, senha);
      const token = await usuario.gerarToken();
      result.status(200).send({
        usuario,
        token
      })
    }
    catch {
      result.status(401).send({
        error: 'Login falhou. Cheque as credenciais.'
      })
    }
  })
);

//POST - Remove o token fornecido
rotas.post(
  '/logout',
  auth,
  ash(async (request, result) => {
    request.usuario.tokens = request.usuario.tokens.filter((token) => {
      return token.token != request.token;
    })
    await request.usuario.save();
    result.send();
  })
);

//POST - Remove todos os tokens do usuario cujo token foi fornecido
rotas.post(
  '/logout/todos',
  auth,
  ash(async (request, result) => {
    request.usuario.tokens.splice(0, request.usuario.tokens.length);
    await request.usuario.save();
    result.send();
  })
);


//Exportar rotas
module.exports = rotas;
