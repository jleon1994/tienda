const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Asegúrate de que la ruta sea correcta

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error en la conexión:', err));

// Array de productos
const products = [
    { name: "Camiseta Básica Blanca", description: "Camiseta de algodón", price: 15.99, stock: 50, category: "Camisetas", imageUrl: "link1" },
    
];

async function insertProducts() {
    try {
        await Product.insertMany(products);
        console.log('Productos agregados correctamente');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error al insertar productos:', err);
    }
}

insertProducts();
