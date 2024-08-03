const express = require('express');
const multer = require('multer');
const router = express.Router();
const Product = require('../models/Product'); // Certifique-se de que o caminho está correto

// Configuração do multer para armazenamento de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Defina o diretório de armazenamento de imagens
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Defina o nome do arquivo
    }
});

const upload = multer({ storage: storage });

// CREATE - Criar um novo produto
router.post('/products', upload.single('image'), async (req, res) => {
    try {
        const productData = req.body;
        if (req.file) {
            productData.image_main = req.file.path; // Salve o caminho da imagem principal
        }
        const product = new Product(productData);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
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
            return res.status(404).send();
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

// UPDATE - Atualizar um produto pelo ID
router.put('/products/:id', upload.single('image'), async (req, res) => {
    try {
        const productData = req.body;
        if (req.file) {
            productData.image_main = req.file.path; // Atualize o caminho da imagem principal
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
