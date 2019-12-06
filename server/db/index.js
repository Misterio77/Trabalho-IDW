/*
Trabalho IDW
Gabriel Fontes

Nesse módulo conectamos a database e importamos os modelos
Para usar os modelos, basta importar "./db"
*/



const mongoose = require('mongoose');

const host = 'misterio0-ac0ai.gcp.mongodb.net';
const database = 'test';
const usuario  = 'abc123';
const senha    = '123321';

mongoose.connect(`mongodb+srv://${usuario}:${senha}@${host}/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(console.error.bind(console, "erro de database: "));

const models = require('./models')(mongoose);

module.exports = models;
