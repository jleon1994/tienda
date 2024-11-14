const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Asegúrate de que la ruta sea correcta

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error en la conexión:', err));

// Array de productos
const products = [
    {
        name: "Camiseta Negra Algodon",
        description: "Camiseta de algodón 100%, color negro",
        category: "Básicas",
        size: ["S", "M", "L", "XL"],
        color: ["Negro"],
        price: 30000,
        stock: 100,
        images: ["https://hmcolombia.vtexassets.com/arquivos/ids/3743623/Camiseta-Loose-Fit---Negro---H-M-CO.jpg?v=638538614671830000", "url_imagen2"],
        rating: 4.5,
        reviews: 20,
    },
    
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
