// Instanciando dependências
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); 
const adminRoutes = require('./routes/AdminRoutes');

// Iniciando servidor express
const app = express();
const PORT = process.env.PORT || 3000;

// Configurando middlewares
app.use(bodyParser.json());
app.use(cors());

// Servir arquivos estáticos (imagens)
app.use('/uploads', express.static('uploads'));

// Usar as rotas
app.use('/api', productRoutes);
app.use('/api', adminRoutes);

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/impermaq', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Verificação na conexão do MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Inicializar servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
