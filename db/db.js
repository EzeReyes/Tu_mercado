const mysql = require('mysql2');
const dotenv = require ('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASS ?? '1234',
    database: process.env.BD_NOMBRE,
});

connection.connect((err) => {
    if(err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
})

module.exports = connection;