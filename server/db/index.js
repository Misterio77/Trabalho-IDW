/*
Trabalho IDW
Gabriel Fontes

Nesse módulo conectamos a database e importamos os modelos
Para usar os modelos, basta importar "./db"
*/


const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(console.error.bind(console, "erro de database: "));
mongoose.set('useCreateIndex', true);

const models = require('./models')(mongoose);

module.exports = models;
