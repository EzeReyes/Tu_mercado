const express = require("express");

const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

router.get('/', pedidosController.getAllPedidos);
// router.get('/:id', productoController.getProductById);
router.post('/', pedidosController.createPedidos);
// router.put('/:id', productoController.updateProduct);
// router.delete('/:id', productoController.deleteProduct);


module.exports = router;