// importación de librerias 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');

// Importación de Rutas
const ProductosRoute = require('../routes/productosRoute');
const sobreNosotrosRoute = require('../routes/sobreNosotrosRoute');
const contactoRoute = require('../routes/contactoRoute');
const carritoRoute = require('../routes/carritoRoute');
const usuarioRoute = require('../routes/usuarioRoute');
const adminRoute = require('../routes/adminRoute');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
    
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: Tipo de archivo no soportado');
    },
    limits: {
        fileSize: 100000
    }
});

// Configuración de la sesión
app.use(session({
    secret: 'mi-secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Configuración de CSRF
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Middleware para manejar los errores de CSRF
app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403).send('CSRF token inválido.');
});

// Router
app.use('/', ProductosRoute);
app.use('/pages', sobreNosotrosRoute);
app.use('/pages', contactoRoute);
app.use('/pages', carritoRoute);
app.use('/auth', usuarioRoute);
app.use('/user', usuarioRoute);
app.use('/admin', adminRoute);

// Configuración del motor de vistas
app.set('view engine', 'ejs');

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
});
