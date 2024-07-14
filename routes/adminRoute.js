const { loginAdmin, panel, getProductById, productos, users, updateProductById, eliminarProducto, crear, crearView, crearProducto, getUserById, editarUsuario, agree } = require("../controllers/adminController");
const multer = require('multer');
const express = require('express')
const {authenticateJWT} = require('../middlewares/authJWT')
const path = require('path');


// subir foto

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/productos')
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
const router = express.Router();

router.get('/login', loginAdmin);
router.get('/panel',authenticateJWT, panel);
router.get('/editar-producto/:id',authenticateJWT, getProductById);
router.post('/editar-producto/:id',authenticateJWT, updateProductById);
router.get('/productos',authenticateJWT, productos);
router.post('/productos',authenticateJWT, eliminarProducto);
router.get('/crear-producto',authenticateJWT, crearView);
router.post('/crear-producto',authenticateJWT, upload.single('img-producto'), crearProducto);
router.get('/producto-agregado', agree);
router.get('/users', users);
router.get('/editar-usuario/:id', getUserById);
router.post('/editar-usuario/:id',authenticateJWT, upload.single('archivo'), editarUsuario);




module.exports = router;