const axios = require('axios');

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: 'Token is required' });

    try {
        const response = await axios.get('http://localhost:3001/api/v1/validate', {
            headers: { Authorization: token }
        });

        req.user = response.data.user; // Guardamos los datos del usuario autenticado
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token: product-service/middlewares/authenticate.js' });
    }
};

module.exports = authenticate;