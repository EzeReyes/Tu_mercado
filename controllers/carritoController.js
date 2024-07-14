const db = require('../db/db');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


    // Página Carrito
const mostrarCarrito = (req, res) => {
    const csrfToken = req.csrfToken();
    const Cliente_ID = req.session.Cliente_ID 
    const sqlCarrito = 'SELECT p.Producto_ID, p.Nombre, p.Descripcion, p.Precio, p.Foto_Url, c.Cantidad FROM Carrito c JOIN Productos p ON c.Producto_ID = p.Producto_ID WHERE c.Cliente_ID = ?';
    const sqlTotal = 'SELECT SUM(p.Precio * c.Cantidad) AS total FROM Carrito c JOIN Productos p ON c.Producto_ID = p.Producto_ID WHERE c.Cliente_ID = ?';

    db.query(sqlCarrito, [Cliente_ID], (err, resultsCarrito) => {
        if (err) throw err;
        
        db.query(sqlTotal, [Cliente_ID], (err, resultsSuma) => {
            if (err) throw err;
            console.log(resultsCarrito)
            const total = resultsSuma[0].total || 0;  // Maneja el caso en el que el total es NULL
            res.render('pages/carrito', { resultsCarrito, total, csrfToken });


});
});
}


// eliminar Producto por ID, desde el carrito
const eliminarProducto = (req, res) => {
    const { id } = req.body;
    const sqlGetQuantity = 'SELECT Cantidad FROM carrito WHERE Producto_ID = ?';
    const sqlDelete = 'DELETE from carrito WHERE Producto_ID = ?';
    const sqlUpdateStock = 'UPDATE Productos SET Stock = Stock + ? WHERE Producto_ID = ?';

db.query(sqlGetQuantity, [id], (err, getResult) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Ocurrio un error al obtener los datos');
    }

const quantity = getResult[0].Cantidad;
// console.log(`La cantidad es: ${quantity}`);

db.query(sqlUpdateStock, [quantity, id], (err,upDateResult) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Ocurrió un error al actualizar el stock del producto');
    }

db.query(sqlDelete, [id], (err, deleteResult) => {

    if (err) {
        console.error(err);
        return res.status(500).send('Ocurrió un error al eliminar el producto del carrito');
    }
    // Redirigir a la página del carrito después de la eliminación
                mostrarCarrito(req, res);
});
});
});
}


module.exports = {
    mostrarCarrito,
    eliminarProducto
}