const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  image_main: { type: String }, // Array de URLs de imagens
  imagens: [{ type: String }], // Array de URLs de imagens
  descricao: { type: String },
  especificacoes: { type: String },
  acessorios: { type: String },
  condicao: { type: String, enum: ['Novo', 'Usado'], required: true }

});

const Produto = mongoose.model('produto', produtoSchema);

module.exports = Produto;
