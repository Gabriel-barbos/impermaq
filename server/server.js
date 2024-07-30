//instanciando dependencias

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); 


//iniciando servidor express
const app = express();
const PORT = process.env.PORT || 3000;

//configurando middlewares
app.use(bodyParser.json());
app.use(cors());


// Usar as rotas
app.use('/api', productRoutes);


//conexao com mongo
mongoose.connect('mongodb://localhost:27017/impermaq', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


//check na conexão do mongo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
