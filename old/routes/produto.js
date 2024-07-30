const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');
const multer = require('multer');


// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});









// Criar um novo produto com imagens
router.post('/', upload.fields([{ name: 'image_main', maxCount: 1 }, { name: 'imagens', maxCount: 10 }]), async (req, res) => {
  try {
    const image_main = req.files['image_main'] ? `/uploads/${req.files['image_main'][0].filename}` : null;
    const imagens = req.files['imagens'] ? req.files['imagens'].map(file => `/uploads/${file.filename}`) : [];
    
    const produto = new Produto({
      ...req.body,
      image_main,
      imagens
    });
    
    await produto.save();
    res.status(201).send(produto);
  } catch (error) {
    res.status(400).send(error);
  }
});


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
