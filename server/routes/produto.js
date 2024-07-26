const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// Criar um novo produto
router.post('/', async (req, res) => {
  try {
    const produto = new Produto(req.body);
    await produto.save();
    res.status(201).send(produto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obter todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.status(200).send(produtos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Obter um produto pelo ID
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).send();
    }
    res.status(200).send(produto);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Atualizar um produto pelo ID
router.put('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!produto) {
      return res.status(404).send();
    }
    res.status(200).send(produto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Excluir um produto pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) {
      return res.status(404).send();
    }
    res.status(200).send(produto);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
