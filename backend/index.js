const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const cors = require('cors')

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error en la conexión:', err));


// Rutas
app.use('/api/auth', authRoutes);
app.use('/search', searchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});







  