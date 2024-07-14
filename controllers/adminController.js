const db = require('../db/db');
const bcrypt = require('bcrypt');

const loginAdmin = (req, res) => {
    const csrfToken = req.csrfToken();

    res.render('admin/login', {csrfToken})
}


const panel = (req, res) => {
const message = req.session.message;
delete req.session.message;
const user = req.session.user; // Usuario autenticado

    res.render('admin/panel', {message: message, user: user})
}


// -----------------------------------------------------


// Consulta que trae ,todos los Productos 
const productos = (req, res) => {    
    const csrfToken = req.csrfToken();

    const sql = 'SELECT * FROM productos';
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.render('admin/productos', { results, csrfToken});
    });
};



// Consulta por ID de Productos
const getProductById = (req, res) => {
    const csrfToken = req.csrfToken();

    const id = req.params.id;
    const sqlForID = 'SELECT * FROM `productos` WHERE `Producto_ID` = ?';
    
    // Consulta para obtener el producto por ID
    db.query(sqlForID, [id], (err, resultsForId) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener el producto por ID' });
        }
        
        if (resultsForId.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Aquí renderizas la vista para editar el producto con los datos obtenidos
        res.render('admin/editar-producto', { result: resultsForId[0], csrfToken });
    });
};

// Controlador para actualizar el producto
const updateProductById = (req, res) => {
    const csrfToken = req.csrfToken();
    const id = req.params.id;
    const { Nombre, Descripcion, Precio, Stock } = req.body;

    // Consulta para actualizar el producto
    const updateProducto = 'UPDATE Productos SET Nombre = ?, Descripcion = ?, Precio = ?, Stock = ? WHERE Producto_ID = ?';

    db.query(updateProducto, [Nombre, Descripcion, Precio, Stock, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el producto' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto actualizado correctamente', csrfToken });
    });
};


// Crear Producto

const crearProducto = (req, res) => {

    const { Nombre, Descripcion, Precio, Stock } = req.body;
    
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const nombre = req.file.filename; // Cambiado a `req.file.filename` para obtener el nombre correcto del archivo subido.

    const sqlCreate = 'INSERT INTO Productos (Nombre, Descripcion, Precio, Stock, Foto_Url) VALUES (?, ?, ?, ?, ?)';
    db.query(sqlCreate, [Nombre, Descripcion, Precio, Stock, nombre], (err, result) => {
        if (err) {
            console.error('Error al insertar datos en la base de datos: ', err.message);
            return res.status(500).send('Error al crear el producto');
        }
        
        // Al ser un INSERT, no se puede acceder a los valores desde result, se obtiene como propiedades, del req.body, en este caso Nombre 
        res.render('admin/producto-agregado', {result, Nombre});
    });
};


const agree = (req, res) => {
    res.render('admin/producto-agregado')
}

const crearView = (req, res) => {
    const csrfToken = req.csrfToken();
    res.render('admin/crear-producto', {csrfToken} );
};



// ------------ELIMINAR PRODUCTO

const eliminarProducto = (req, res) => {
    const { id } = req.body;
    const sql = 'SELECT * FROM Productos WHERE Producto_ID = ?';
    const sqlDelete = 'DELETE FROM Productos WHERE Producto_ID = ?';

    console.log(id);

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Ocurrió un error al obtener los datos');
        }

        if (results.length === 0) {
            return res.status(404).send('Producto no encontrado');
        }

        db.query(sqlDelete, [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Ocurrió un error al eliminar el producto');
            }

            // Asumir que 'productos' es una función que renderiza la página con la lista actualizada de productos
            productos(req, res);
        });
    });
};

// -----------------------------------------------------
const users = (req, res) => {
    const csrfToken = req.csrfToken();
    
    const sql = "SELECT * FROM Users WHERE role != 'admin'";
    db.query(sql, (err, results) => {
            if(err) throw err;
            res.render('admin/users', { results, csrfToken});
        });
    };


    const getUserById = (req, res) => {
        const csrfToken = req.csrfToken();
    
        const id = req.params.id;
        const sqlForID = 'SELECT * FROM `Users` WHERE `Cliente_ID` = ?';
        
        // Consulta para obtener el producto por ID
        db.query(sqlForID, [id], (err, resultsForId) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener el producto por ID' });
            }
            
            if (resultsForId.length === 0) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            const formData = resultsForId;

            // Aquí renderizas la vista para editar el producto con los datos obtenidos
            res.render('admin/editar-usuario', { resultsForId: formData, csrfToken, formData });
        });
    };
    


    const editarUsuario = async (req, res) => {
        const id = req.params.id;
        let updatePhoto;
        const currentPhoto = req.body.currentPhoto;
        const { Nombre, Apellido, Direccion, Telefono, Email, Password } = req.body;

        if (req.file) {
            updatePhoto = req.file.filename; // Obtén el nombre correcto del archivo subido.
        } else {
            updatePhoto = currentPhoto;
        }        

        let PasswordHass;
        if (Password) {
            PasswordHass = bcrypt.hashSync(Password, 8);
        } else {
            PasswordHass = req.body['stored-pass'];
        }
        
        const sqlUpdate = 'UPDATE Users SET Foto_user = ?, Nombre = ?, Apellido = ?, Direccion = ?, Telefono = ?, Email = ?, Password = ? WHERE Cliente_ID = ?';
    
            db.query(sqlUpdate, [updatePhoto, Nombre, Apellido, Direccion, Telefono, Email, PasswordHass, id], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar los datos del usuario', err });
                }
    
                res.json({ message: 'Usuario modificado' });
            });
        }

module.exports = {
    loginAdmin,
    panel,
    getProductById,
    updateProductById,
    crearView,
    crearProducto,
    agree,
    eliminarProducto,
    productos, 
    users,
    getUserById, 
    editarUsuario
}