const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Produto = require('./models/Produto'); // Ajuste o caminho conforme necessário


const app = express();

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/server/uploads'); // Pasta onde as imagens serão armazenadas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/api/produtos', upload.fields([
  { name: 'image_main', maxCount: 1 },
  { name: 'imagens', maxCount: 10 },
]), async (req, res) => {
  try {
    const produto = new Produto({
      nome: req.body.nome,
      descricao: req.body.descricao,
      especificacoes: req.body.especificacoes,
      acessorios: req.body.acessorios,
      condicao: req.body.condicao,
      image_main: req.files['image_main'] ? req.files['image_main'].map(file => file.path) : [],
      imagens: req.files['imagens'] ? req.files['imagens'].map(file => file.path) : [],
    });

    await produto.save();
    res.status(201).send(produto);
  } catch (error) {
    res.status(400).send({ error: 'Erro ao criar produto' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/impermaq', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Modelo para armazenar imagens no MongoDB
const imagemModel = mongoose.model('Imagem', {
  filename: String,
  contentType: String,
  data: Buffer
});

// Rota para upload de imagens
app.post('/api/upload', upload.array('file'), (req, res) => {
  const files = req.files;

  files.forEach((file) => {
    const imagem = new imagemModel({
      filename: file.originalname,
      contentType: file.mimetype,
      data: file.buffer
    });

    imagem.save((err) => {
      if (err) {
        console.error('Erro ao salvar imagem', err);
      } else {
        console.log('Imagem salva com sucesso');
      }
    });
  });

  res.status(200).send({ files: req.files });
});

// Rota para produtos
const produtoRoutes = require('./routes/produto');
app.use('/api/produtos', produtoRoutes);

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});