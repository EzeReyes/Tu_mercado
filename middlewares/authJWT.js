const jwt = require('jsonwebtoken');
const config = require('../config/config'); // Asegúrate de tener tu configuración de JWT en un archivo separado

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.auth_token;

    if (token) {
        jwt.verify(token, config.secretKey, (err, user) => {
            if (err) {
                return res.redirect('/auth/login');
            }

            req.user = user;
            
            next();
        });
    } else {
        res.redirect('/auth/login');
    }
};

module.exports = {authenticateJWT};
