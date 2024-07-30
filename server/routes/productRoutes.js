const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Certifique-se de que o caminho está correto

// CREATE - Criar um novo produto
router.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
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
router.patch('/products/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'images', 'description', 'specifications', 'accessories'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send();
        }

        updates.forEach((update) => product[update] = req.body[update]);
        await product.save();
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
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
