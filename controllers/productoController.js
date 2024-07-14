const db = require('../db/db');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Consulta que trae ,todos los Productos, y nos lleva a página index
const getAllProducts= (views) => (req, res) => {
    const csrfToken = req.csrfToken();
    const message = req.session.message;
    const user = req.session.user; // Usuario autenticado
    delete req.session.message;

    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.render(views, { results, message, user, csrfToken});
    });
};

const getProductForSearch = (req, res) => {
    const busqueda = req.body.busqueda;
    const csrfToken = req.csrfToken();

    console.log('Valor de la busqueda:', busqueda);
    
        const sql = 'SELECT * FROM Productos WHERE Nombre LIKE (?)';
        const queryParam = `%${busqueda}%`;
        
        db.query(sql, [queryParam], (err, resultsBusq) => {
            if (err) {
                return res.status(500).send('Ocurrio un error al obtener los datos');
            }
            res.render("pages/busqueda-item", { resultsBusq, csrfToken });
        });
    }


// consulta por ID de Producto y nos vamos a la pagina Item
const getProductById = (req, res) => {
    const csrfToken = req.csrfToken();

    const id = req.params.id;
    const sqlForID = 'SELECT * FROM `productos` WHERE `Producto_ID` = ?';
    db.query(sqlForID, [id], (err, resultsForId) => {
        if (err) throw err;
        res.render('pages/item', { resultsForId: resultsForId[0], csrfToken });
    });
};

// Cargar un producto al Carrito
const AgregarAlCarrito = (req, res) => {

    const Product_ID = req.body.Producto_ID;
    const Cantidad = parseInt(req.body.Cantidad, 10);
    const Cliente_ID = req.session.Cliente_ID;
    // console.log('Producto_ID:', Product_ID);
    // console.log('Cantidad:', Cantidad);
    // console.log('Cliente_ID:', Cliente_ID);

    const query = 'CALL AgregarAlCarrito(?, ?, ?)';
    db.query(query, [Product_ID, Cantidad, Cliente_ID], (err, results) => {
        if (err) throw err;
        return res.redirect('/pages/carrito');
    });
};




const createProduct = (req, res) => {
    const {Nombre, Descripcion, Precio, Stock, tipo, Foto_Url} = req.body
    const sql = 'INSERT INTO productos (Nombre, Descripcion, Precio, Stock, tipo, Foto_Url ) VALUES(?, ?, ?, ?, ?, ?)'
    db.query(sql, [Nombre, Descripcion, Precio, Stock, tipo, Foto_Url], (err, result) => {
        if(err) throw err
        res.json({message: 'Producto agregado correctamente', productoID: result.insertId});
    });
};

const updateProduct = (req, res) => {
    const csrfToken = req.csrfToken();
    const {id} = req.params;
    const {Nombre, Descripcion, Precio, Stock, tipo} = req.body
    const sql = 'UPDATE productos SET Nombre=?, Descripcion=?, Precio=? , Stock=?, tipo=? WHERE Producto_ID=?';
    db.query(sql, [Nombre, Descripcion, Precio, Stock, tipo, id], (err, result) => {
        if(err) throw err
        res.json({message: 'Pelicula modificada correctamente', movieId: result.insertId, csrfToken});
    });
};

const deleteProduct = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE from productos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({message: 'Producto Eliminado'});
})
}



module.exports = {
                getAllProducts,
                getProductForSearch,
                getProductById, 
                AgregarAlCarrito,
                createProduct,
                updateProduct,
                deleteProduct,
};