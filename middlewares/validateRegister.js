const { check } = require('express-validator');

const validateRegister = [
    check('Nombre').notEmpty().withMessage('Debe ingresar su Nombre'),
    check('Apellido').notEmpty().withMessage('Debe ingresar su Apellido'),
    check('Direccion').notEmpty().withMessage('Agrega una Dirección'),
    check('Telefono').notEmpty().withMessage('Debe ingresar un número telefónico'),
    check('EmailRegistro').isEmail().withMessage('Lo que ingresaste no es un Email'),
    check('PasswordRegistro').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').matches(/\d/).withMessage('La contraseña debe contener al menos un número'),
];

const validateLogin = [
    check('Email').isEmail().withMessage('Lo que ingresaste no es un Email'),
    check('Password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').matches(/\d/).withMessage('La contraseña debe contener al menos un número'),
]

const validateResetPass = [
    check('Email').isEmail().withMessage('Lo que ingresaste no es un Email'),
]



module.exports = {
    validateRegister,
    validateLogin,
    validateResetPass
};
