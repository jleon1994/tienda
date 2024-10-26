const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'Acceso denegado, no hay token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Error de autenticación:', err);
        res.status(401).json({ msg: 'Token no válido' });
    }
};

module.exports = authMiddleware;
