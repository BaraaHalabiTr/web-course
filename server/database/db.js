const mysql = require('mysql2');
const dotenv = require ('dotenv');
dotenv.config({ path: '././config.env' });

//creating a pool to access the database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
});

//exporting all pool functions as a promise in order to use then catch function
module.exports = pool.promise();