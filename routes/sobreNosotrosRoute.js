const express = require("express");
const router = express.Router();

const {sobreGet} = require('../controllers/sobreGet');

// Ruta Sobre Nosotros
router.get('/sobreNosotros', sobreGet);


module.exports = router;


