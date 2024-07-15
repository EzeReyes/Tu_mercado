const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
const {getAllProducts, getProductById, getProductForSearch, AgregarAlCarrito} = require('../controllers/productoController');
const { logout } = require("../controllers/usuarioController");
const { authenticateJWT } = require("../middlewares/authJWT");

// Ruta para la vista index;
router.get('/', getAllProducts("index"));
router.get('/logout', logout);

// Ruta para la vista productos;
router.get('/pages/productos',authenticateJWT, getAllProducts("pages/productos"));
router.post('/pages/productos', authenticateJWT, AgregarAlCarrito);
router.get('/pages/item/:id', getProductById);
router.post('/pages/busqueda-item', getProductForSearch);

module.exports = router;