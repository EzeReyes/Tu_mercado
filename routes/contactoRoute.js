const express = require("express");
const router = express.Router();

const { contactoGet } = require("../controllers/contactoGet");

// Ruta Sobre Nosotros
router.get('/contacto', contactoGet);


module.exports = router;

