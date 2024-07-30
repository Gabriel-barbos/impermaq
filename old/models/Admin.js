// models/Admin.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  celular: {
    type: String,
    required: true,
  },
  // Adicione outros campos necessários para a coleção admin
});

module.exports = mongoose.model('Admin', AdminSchema);
