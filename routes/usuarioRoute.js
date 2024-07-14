const express = require('express');
const multer = require('multer');
const { loginGet, login, registerGet, register, olvidePassword, confirmar, resetPassword, comprobarToken, validateNewPass, editar, nuevoPassword2, logout, perfil, cargarFotoADB, getEditar, confirmarGet } = require("../controllers/usuarioController");
const { validateRegister, validateLogin, validateResetPass  } = require('../middlewares/validateRegister');
const {middleware} = require('../middlewares/authMiddlewares');
const { authenticateJWT } = require('../middlewares/authJWT');
const router = express.Router();
const path = require('path');
const { editarUsuario } = require('../controllers/adminController');



// subir foto

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



router.get('/login', loginGet);

router.post('/login', validateLogin, login);

router.get('/register', registerGet);

router.post('/register', validateRegister, register);

router.get('/confirmar/:token', confirmar);

router.get('/confirmar-cuenta', confirmar);

router.get('/cuenta-confirmada', confirmarGet);

router.get('/olvide-password', olvidePassword);

router.post('/olvide-password', validateResetPass, resetPassword);

// Almacena un nuevo password
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', validateNewPass, nuevoPassword2);
router.get('/error-restablecer', (req, res) => res.render('error-restablecer'));
router.post('/reset-password', validateNewPass, nuevoPassword2);

// Perfil de Usuario
router.get('/perfil', authenticateJWT, perfil);
router.post('/perfil', authenticateJWT, upload.single('archivo'), cargarFotoADB);
router.get('/editar-perfil', authenticateJWT, getEditar);
router.post('/editar-perfil', authenticateJWT, upload.single('archivo'), editarUsuario);


module.exports = router;