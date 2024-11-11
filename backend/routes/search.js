// backend/routes/search.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Endpoint de búsqueda
router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    const results = await Product.find({ name: { $regex: query, $options: 'i' } });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error en la búsqueda' });
  }
});

module.exports = router;
