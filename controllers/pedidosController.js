const db = require('../db/db');

const getAllPedidos = (req, res) => {
    const sql = 'SELECT * FROM itemspedidos';
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
    });
};


const createPedidos = (req, res) => {
    const {Producto_ID, Cantidad} = req.body
    const sql = 'INSERT INTO itemspedidos (Producto_ID,Cantidad) VALUES(?,?)'
    db.query(sql, [Producto_ID, Cantidad], (err, result) => {
        if(err) throw err
        res.json({message: 'Pedido creado', ItemPedido_ID: result.insertId});
    });
};




module.exports = { 
                    getAllPedidos,
                    createPedidos, 
};
