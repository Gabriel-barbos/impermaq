const express = require('express');
const multer = require('multer');
const router = express.Router();
const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');

// Caminho para o diretório de uploads
const uploadDir = path.join(__dirname, '../uploads');

// Garantir que o diretório de uploads existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do multer para armazenamento de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// CREATE - Criar um novo produto
router.post('/products', upload.array('images', 5), async (req, res) => {
    try {
        const productData = req.body;
        if (req.files) {
            productData.images = req.files.map(file => `/uploads/${file.filename}`); // Salvar caminhos das imagens
        }
        const product = new Product(productData);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        console.error(error); // Log de erro para debug
        res.status(500).send({ error: 'Failed to create product', details: error.message });
    }
});

// READ - Obter todos os produtos
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// READ - Obter um produto pelo ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor', error });
    }
});



// UPDATE - Atualizar um produto pelo ID
router.put('/products/:id', upload.array('images', 5), async (req, res) => {
    try {
        const productData = req.body;
        if (req.files) {
            productData.images = req.files.map(file => `/uploads/${file.filename}`); // Atualize os caminhos das imagens
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
        if (!updatedProduct) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).send({ message: 'Failed to update product', error });
    }
});

// DELETE - Deletar um produto pelo ID
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).send();
        }

        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
