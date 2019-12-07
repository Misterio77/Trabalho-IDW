/*
Trabalho IDW
Gabriel Fontes

Nesse arquivo estão definidas as Schemas utilizadas no MongoDB pelo Mongoose
*/



module.exports = mongoose => {
  const shortid = require('shortid'); //IDs menores
  const Produto = new mongoose.Schema({
  
    _id: {type: String, default: shortid.generate},
    nome      : String,
    descricao : String,
    estoque   : Number,
    vendidos  : Number,
    valor     : Number,
    tags      : [String]
  }, {collection: 'produtos'});
  
  const Servico = new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    nome      : String,
    descricao : String,
    valor     : Number
  }, {collection: 'servicos'});
  
  const Usuario = new mongoose.Schema({
    _id: {type: String, default: shortid.generate},
    nome     : String,
    email    : String,
    endereco : String,
    telefone : String,
    animais  : [{
      _id: {type: String, default: shortid.generate},
      nome   : String,
      raca   : String,
      idade  : Number,
      agenda : [{
        data    : Date,
        servico : {
          type  : mongoose.Schema.Types.ObjectId,
          ref   : 'servicos'
        }
      }] 
    }],
    compras  : [{
      _id: {type: String, default: shortid.generate},
      data   : Date,
      produto: {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'produtos'
      },    
    }] 
  }, {collection: 'usuarios'});
  const models = {
    Produtos : mongoose.model('Produto', Produto),
    Servicos : mongoose.model('Servico', Servico),
    Usuarios : mongoose.model('Usuario', Usuario)
  }
  return models;
}
