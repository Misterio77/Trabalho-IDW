/*
Trabalho IDW
Gabriel Fontes

Nesse arquivo estão definidas as Schemas utilizadas no MongoDB pelo Mongoose
*/
module.exports = mongoose => {
  const shortid = require('shortid'); //IDs menores
  const validator = require('validator')
  const bcrypt = require('bcryptjs')
  const jwt = require('jsonwebtoken')

  
  //Representa os produtos
  const ProdutoSchema = new mongoose.Schema({
    _id:        {type: String, default: shortid.generate},
    nome:       String,
    imagem:     {type: String, default: 'https://misterio.me/assets/default.jpg'},
    descricao:  String,
    estoque:    Number,
    vendidos:   Number,
    valor:      Number,
    tags:       [String]
  }, {
    collection: 'produtos'
  });
  
  //Representa os servicos
  const ServicoSchema = new mongoose.Schema({
    _id:        {type: String, default: shortid.generate},
    nome:       String,
    imagem:     {type: String, default: 'https://misterio.me/assets/default.jpg'},
    descricao:  String,
    valor:      Number
  }, {
    collection: 'servicos'
  });
  
  //Representa os usuarios
  const UsuarioSchema = new mongoose.Schema({
    _id:        {type: String, default: shortid.generate},
    nome: {
      type:     String,
      required: true,
      trim:     true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
        if (!validator.isEmail(value)) {
          throw new Error({error: 'Email invalido'})
        }
      }
    },
    senha: {
      type: String,
      required: true,
      minLength: 7
    },
    tokens: [{
      token: {
        type: String,
        required: true
    }
    }],
    admin:      {type: Boolean, default: false},
    imagem:     {type: String, default: 'https://misterio.me/assets/default.jpg'},
    endereco:   String,
    telefone:   String,
    animais: [{
      _id:      {type: String, default: shortid.generate},
      nome:     String,
      imagem:   String,
      raca:     String,
      idade:    Number,
    }],
    horarios: [{
      _id:      {type: String, default: shortid.generate},
      data:     Date,
      servico:  {type: String, ref: 'Servico'}
    }],
    compras: [{
      _id:      {type: String, default: shortid.generate},
      data:     Date,
      produto:  {type: String, ref: 'Produto'}
    }]
  }, {
    collection: 'usuarios'
  });
  
  
  
  
  //Metodos para autenticar
  UsuarioSchema.pre('save', async function (next) {
    // Hashear a senha antes de salvar o usuario
    const usuario = this;
    if (usuario.isModified('senha')) {
      usuario.senha = await bcrypt.hash(usuario.senha, 8);
    }
    next();
  });
  
  UsuarioSchema.methods.gerarToken = async function() {
    // Criar um token de autenticacao cada vez que o usuario logar
    const usuario = this;
    const token = jwt.sign({_id: usuario._id}, process.env.JWT_KEY);
    usuario.tokens = usuario.tokens.concat({token});
    await usuario.save();
    return token;
  }

  UsuarioSchema.statics.buscarPorCredenciais = async (email, senha) => {
    // Buscar um usuario por email e senha
    const usuario = await models.Usuarios.findOne({ email} ).exec();
    if (!usuario) {
      throw new Error({ error: 'Credenciais invalidas' });
    }
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw new Error({ error: 'Credenciais invalidas' });
    }
    return usuario;
  }
  
  
  
  const models = {
    Produtos: mongoose.model('Produto', ProdutoSchema),
    Servicos: mongoose.model('Servico', ServicoSchema),
    Usuarios: mongoose.model('Usuario', UsuarioSchema)
  }
  return models;
}
