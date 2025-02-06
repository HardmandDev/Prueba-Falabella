const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: 'Token is required' });

    const tokenWithoutBearer = token.split(' ')[1];

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid or expired token: auth-service/middlewares/authenticate.js' });

        req.user = decoded; // Almacenar la información del usuario decodificada en `req.user`
        next();
    });
};

module.exports = authenticate;
