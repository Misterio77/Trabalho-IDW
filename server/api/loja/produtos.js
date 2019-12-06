const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//const databaseURL = 'mongodb://127.0.0.1';
const databaseURL = 'mongodb+srv://abc123:2112@misterio0-ac0ai.gcp.mongodb.net/'

//Obter todos os produtos, ou apenas os com as tags dadas
router.get('/', async (req, res) => {
  //Puxar produtos da database
  const produtos = await carregarProdutos();

  try {
    //Caso o request tenha tags
    if (req.query.tags) {
      const tags = JSON.parse(req.query.tags);

      res.json(await produtos.find({
        tags: {
          $all: tags
        }
      }));
    }
    //Caso contrário
    else {
      res.json(await produtos.find({}));
    }
  }
  catch (err) {
    //Lidar com erros (argumentos mal formatados)
    res.status(400).json({
      msg: "Argumento mal formatado",
      err
    });
  }
});

//Obter um produto apenas
router.get('/:id', async (req, res) => {
  //Puxar produtos da database
  const produtos = await carregarProdutos();

    //Apenas encontrar o que combine com o ID dado
    console.log(await produtos.find({ _id: new mongodb.ObjectID(req.params.id) }));
});

//Criar novo produto
router.post('/', async (req, res) => {
  //Puxar produtos da database
  const produtos = await carregarProdutos();

  //O pedido só é aceito se tags for um array, ou não for dada
  if (req.body.tags === undefined || Array.isArray(req.body.tags)) {
    //Enviar informações
    await produtos.insertOne({
      nome: req.body.nome,
      tags: req.body.tags,
      estoque: req.body.estoque
    });
    //Devolver produtos e status OK
    res.status(201).send(
      await produtos.find({})
    );
  }
  else {
    res.status(415).json({
      msg: "Tags deve ser um Array"
    })
  }
});

//Alterar um produto
router.put('/:id', async (req, res) => {
  //Puxar produtos da database
  const produtos = await carregarProdutos();

  //Apenas encontrar o que combine com o ID dado
  res.send(await produtos.updateOne({
    _id: new mongodb.ObjectID(req.params.id)
  }, {
    $set: {
      nome: req.body.nome,
      tags: req.body.tags,
      estoque: req.body.estoque
    }
  }));
});

//Conectar database
async function carregarProdutos() {
  const client = await mongodb.MongoClient.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db('test')
    .collection('produtos');
}

module.exports = router;
