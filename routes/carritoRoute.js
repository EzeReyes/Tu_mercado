const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const {authenticateJWT} = require('../middlewares/authJWT')


const router = express.Router();
const { mostrarCarrito, eliminarProducto } = require("../controllers/carritoController");

router.get('/carrito',authenticateJWT, mostrarCarrito);
router.post('/carrito',authenticateJWT, eliminarProducto);

module.exports = router;
