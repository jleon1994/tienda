const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crear el nuevo usuario
        user = new User({ name, email, password });

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.send('Usuario registrado');
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Usuario no encontrado' });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        // Crear y devolver JWT
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
