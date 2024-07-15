const { validationResult, check } = require('express-validator');
const db = require('../db/db');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const { emailRegistro, emailOlvidePassword} = require('../helpers/emails');
const { users } = require('./adminController');



// ------------------------------------------------------------------------------------------------------------------

// Página Login
const loginGet = async (req, res) => {
    const csrfToken = req.csrfToken();

    res.render('auth/login', { errors: [], formData: {}, csrfToken  })
}

// ------------------------------------------------------------------------------------------------------------------


const login = (req, res) => {
    const csrfToken = req.csrfToken();

    // Validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Obtener los errores y los datos del formulario
        const errorMessages = errors.array();
        const formData = req.body;
    

    // Renderizar la vista con los errores y los datos del formulario
    return res.render('auth/login', {
        errors: errorMessages,
        formData: formData,
    });
}

    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    const sql = 'SELECT Cliente_ID, Email, Password, Nombre, Apellido, role FROM Users WHERE Email = ?';

    db.query(sql, [Email], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la consulta de la base de datos' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Cliente no encontrado' });
        }

        const user = results[0];
        console.log('Resultados de la consulta SQL:', user.role);
        console.log('Contraseña hash desde la base de datos:', user.Password);
        console.log('Contraseña ingresada:', Password);

        if (!Password || !user.Password) {
            return res.status(400).json({ error: 'Email o contraseña no válidos' });
        }

        try {
            const passwordIsValid = bcrypt.compareSync(Password, user.Password);
            console.log('Contraseña válida:', passwordIsValid);

            if (!passwordIsValid) {
                return res.status(401).json({ auth: false, token: null, error: 'Contraseña incorrecta' });
            }

            const token = jwt.sign({ id: user.Cliente_ID }, config.secretKey, { expiresIn: config.tokenExpiresIn });
            res.cookie('auth_token', token, { httpOnly: true, secure: true });

        // Verificar las credenciales del usuario y mostrar las vistas según sus privilegios 
        
        if (user.role === 'admin') {
            req.session.message = `Bienvenido ${user.Nombre} al panel de administración`;
            req.session.user = user;
            req.session.Cliente_ID = user.Cliente_ID;
            // console.log(req.session.Cliente_ID)
            res.redirect('/admin/panel')
        } else if (user.role === 'user') {
            req.session.message = `Bienvenido ${user.Nombre}, ${user.Apellido}`;
            req.session.user = user;
            req.session.Cliente_ID = user.Cliente_ID;
            // console.log(req.session.Cliente_ID)
            res.redirect('/')
        }
    else {
        res.send('Username or password is incorrect');
    }
        } catch (compareErr) {
            console.error('Error comparando contraseñas:', compareErr);
            return res.status(500).json({ error: 'Error al comparar contraseñas' });
        }
    });
};

// -----------------------------------------------------------
// Cerrar Sesión
const logout = (req, res) => {
    const csrfToken = req.csrfToken();

    // Eliminar el token de la cookie (asumiendo que el token está almacenado en una cookie llamada 'token')
    res.clearCookie('auth_token');
    
    // Destruir la sesión
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/admin/panel'); // Redirigir en caso de error
        }
        
        // Redirigir a la página de inicio de sesión
        res.redirect('auth/login');
    });
};


// ------------------------------------------------------------

// Página Register

const registerGet = (req, res) => {
    const csrfToken = req.csrfToken();
    res.render('auth/register', { errors: [], formData: {}, csrfToken })
}

// -----------------------------------------------------------

const register = (req, res) => {
    const csrfToken = req.csrfToken();

    // Validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Obtener los errores y los datos del formulario
        const errorMessages = errors.array();
        const formData = req.body;

        // Renderizar la vista con los errores y los datos del formulario
        return res.render('auth/register', {
            errors: errorMessages,
            formData: formData
        });
    }

    const { Nombre, Direccion, Telefono, EmailRegistro, Apellido } = req.body;

    let { PasswordRegistro } = req.body;

    PasswordRegistro = bcrypt.hashSync(PasswordRegistro, 8);

    const sql = 'INSERT INTO Users (Nombre, Direccion, Telefono, Email, Password, Apellido) VALUES(?, ?, ?, ?, ?, ?)';

    db.query(sql, [Nombre, Direccion, Telefono, EmailRegistro, PasswordRegistro, Apellido], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al registrar el cliente', details: err.message });
        }

        // Obteniendo el ID del cliente insertado
        const ID = result.insertId;

        // Generando el token JWT
        const token = jwt.sign({ id: ID }, config.secretKey, { expiresIn: config.tokenExpiresIn });
        
        // Guardar el token en una cookie
        res.cookie('auth_token', token, { httpOnly: true, secure: true });

        // Insertando el token en la base de datos
        const updateSql = 'UPDATE Users SET token = ? WHERE Cliente_ID = ?';
            db.query(updateSql, [token, ID], (err, result) => {
                
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar el token del cliente' });
        }
                    res.render('auth/confirmar', 
                        { message: 'Registro exitoso',
                        token: token, 
                        csrfToken,
                        result
                    });
    })
        

        await emailRegistro ({
            nombre: Nombre,
            email: EmailRegistro,
            token: token
            })
        .catch(error => console.log('Error enviando email: ', error));

    });
};


// ------------------------------------------------------------------------------------------------------------------




// Función que comprueba una cuenta
const  confirmar = (req, res, next) => {
    const csrfToken = req.csrfToken();
    const token = req.params.token;
    // Verificar si el token es válido
    const sqlForToken = 'SELECT * FROM Users WHERE Token = ?';
    db.query(sqlForToken, [token], (err, result) => {
        const user = result[0];

        if (err) {
            return res.render('auth/error-confirmar');
}
if(result.length===0) {
    res.render('auth/error-confirmar');
} else {

    // Confirmar la cuenta

    const sqlModifyToken = 'UPDATE Users SET Token = null, Confirmado = true WHERE Token = ?';

    db.query(sqlModifyToken, [token], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar el token del cliente', err });
        }
    // next();
        res.render('auth/cuenta-confirmada')
    })  
}
})
}

const confirmarGet = (req, res) => res.render('auth/cuenta-confirmada')



// ------------------------------------------------------------------------------------------------------------------


// Renderización de la Página OlvidePassword
const olvidePassword = (req, res) => {
    const csrfToken = req.csrfToken();

    res.render('auth/olvide-password', { 
        errors: [],
        formData: {},
        csrfToken
        })
}

// Lógica para resetear el password
const resetPassword = (req, res) => {
    const csrfToken = req.csrfToken();

    // Validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Obtener los errores y los datos del formulario
        const errorMessages = errors.array();
        const formData = req.body;
    
    return res.render('auth/olvide-password', { 
        errors: errorMessages, 
        formData: formData, 
        csrfToken })
    }

    // Buscar el usuario

    const { Email } = req.body;

    const sql = 'SELECT Cliente_ID, Email, Password, Nombre FROM Users WHERE Email = ?';

    db.query(sql, [Email], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en la consulta de la base de datos' });
        }

// Si se trata de un email, pero no esta en la base, cambiamos el mensaje que se muestra en el front
        if (results.length === 0) {
            errorMessages = [{ msg: 'Ese Cliente no existe' }];
            return res.render('auth/olvide-password', { errors: errorMessages, formData: {Email}})
        }
        const user = results[0];
        console.log('Resultados de la consulta SQL:', results);
        console.log('Contraseña hash desde la base de datos:', user.Password);

    // Generar un token y enviar el email

        const token = jwt.sign({ id: user.Cliente_ID }, config.secretKey, { expiresIn: config.tokenExpiresIn });

        const Cliente_ID = user.Cliente_ID;
    
        // Insertando el token en la base de datos

        const updateSql = 'UPDATE Users SET token = ? WHERE Cliente_ID = ?';
        db.query(updateSql, [token, Cliente_ID], (err, result) => {
            
            if (err) {
                return res.status(500).json({ error: 'Error al actualizar el token del cliente' });
    }
    // Enviar email
    emailOlvidePassword({
        email: user.Email,
        nombre: user.Nombre,
        token: token
        })

    // Renderizar un mensaje
    res.render('auth/restablece-password')
    });
})    
};

// ------------------------------------------------------------------------------------


const comprobarToken = (req, res)  => {
    const { token } = req.params;
    const sqlToken = 'SELECT * FROM Users WHERE Token = ?';
    const csrfToken = req.csrfToken();

    db.query(sqlToken, [token], (err, result) => {
        if(result.length === 0) {
            return res.render('auth/error-restablecer')
        }
        res.render('auth/reset-password', {
            errors: [],
            formData: {}, 
            csrfToken
            })
        })
}


const nuevoPassword2 = async (req, res) => {
    const csrfToken = req.csrfToken();
    
    // Validación
    const errors = validationResult(req);
    if (!errors.isEmpty())  {
        // Obtener los errores y los datos del formulario
        const errorMessages= errors.array();
        const formData = req.body;

        // Renderizar la vista con los errores y los datos del formulario
        return res.render('auth/reset-password', { 
            errors: errorMessages, 
            formData: formData, 
            csrfToken } );
    }

    const { token } = req.params;
    let { password } = req.body;

    // Hash de la nueva contraseña
    password = bcrypt.hashSync(password, 8);

    const sqlSelect = 'SELECT * FROM Users WHERE Token = ?';
    const sqlUpdate = 'UPDATE Users SET Token = null, Confirmado = true, Password = ? WHERE Token = ?';

    try {
        // Deshabilitar el modo seguro
        await db.promise().query('SET SQL_SAFE_UPDATES = 0');

        // Consultar el usuario por token
        const [rows] = await db.promise().query(sqlSelect, [token]);
        if (rows.length === 0) {
            return res.render('auth/error-restablecer');
        }

        // Actualizar el token y la contraseña
        await db.promise().query(sqlUpdate, [password, token]);

        // Volver a habilitar el modo seguro (opcional)
        await db.promise().query('SET SQL_SAFE_UPDATES = 1');

        // Renderizar la vista de confirmación de cuenta
        return res.render('auth/cuenta-confirmada');
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al actualizar el token del cliente' });
    }
};


    const validateNewPass = [
        check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').matches(/\d/).withMessage('La contraseña debe contener al menos un número'),
    ]

    // Función que inserta img recibida por multer a la base de datos Users

const cargarFotoADB = (req, res) => {
    const Cliente_ID = req.session.Cliente_ID;

    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    const foto = req.file.filename; // Cambiado a `req.file.filename` para obtener el nombre correcto del archivo subido.

    db.query('UPDATE Users SET foto_user = ? WHERE Cliente_ID = ?', [foto, Cliente_ID], (err) => {
        if (err) {
            console.error('Error inserting into the database:', err);
            return res.status(500).send('Error inserting into the database');
        }
        res.redirect(req.originalUrl);
    });
};

    const perfil = (req, res) => {
        const csrfToken = req.csrfToken();
        const Cliente_ID = req.session.Cliente_ID;
        const sqlUser = 'SELECT * FROM Users WHERE Cliente_ID = ?';

        db.query(sqlUser, [Cliente_ID], (err, results) => {
            if(err) {
                    return res.status(500).json({ error: 'Error al actualizar los datos del usuario' });
        }   
        console.log(results.Nombre)
        res.render('user/perfil', { results, csrfToken })
        })
    }

    const getEditar = (req, res) => {
        const csrfToken = req.csrfToken();
        const Cliente_ID = req.session.Cliente_ID;
        const sqlUser = 'SELECT * FROM Users WHERE Cliente_ID = ?';
        db.query(sqlUser, [Cliente_ID], (err, resultsSelect) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los datos del usuario' });
            }
    
            const formData = resultsSelect;
            res.render('user/editar-perfil', {resultsSelect: formData, csrfToken, formData})
    })
}
    

    const editar = async (req, res) => {
        const Cliente_ID = req.session.Cliente_ID;
        let updatePhoto;
        const currentPhoto = req.body.currentPhoto;
        const { Nombre, Apellido, Direccion, Telefono, Email, Password } = req.body;

        if (req.file) {
            updatePhoto = req.file.filename; // Obtén el nombre correcto del archivo subido.
        } else {
            updatePhoto = currentPhoto;
        }        

        const PasswordHass = bcrypt.hashSync(Password, 8);

        const sqlUpdate = 'UPDATE Users SET Foto_user = ?, Nombre = ?, Apellido = ?, Direccion = ?, Telefono = ?, Email = ?, Password = ? WHERE Cliente_ID = ?';
    
            db.query(sqlUpdate, [updatePhoto, Nombre, Apellido, Direccion, Telefono, Email, PasswordHass, Cliente_ID], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar los datos del usuario', err });
                }
    
                res.json({ message: 'Usuario modificado' });
            });
        }
    
        // const funcionQueHashea = (p) => {
        //     const passHass = bcrypt.hashSync(p, 8);
        //     console.log(`La contraseña para ${p} es ${passHass} `)
        // }
        // funcionQueHashea('robin2024')


module.exports = {
    loginGet,
    login,
    logout,
    registerGet,
    register,
    confirmar,
    confirmarGet,
    olvidePassword,
    resetPassword, 
    comprobarToken,
    nuevoPassword2,
    validateNewPass,
    perfil,
    getEditar,
    cargarFotoADB,
    editar
}