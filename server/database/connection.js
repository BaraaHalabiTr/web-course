const mysql = require('mysql2');
// const dotenv = require ('dotenv');
// dotenv.config({ path: '../../config.env' });
const pool = mysql.createPool({
    host:'sql6.freesqldatabase.com',
    user: 'sql6516983',
    database:'sql6516983',
     password: 'uYr2QSJLgv'
});

// let sql= 'SELECT * FROM books;' ;
// pool.execute(sql, (err, res) => {
//     if(err) throw err ;
//     console.log(res);
// });

module.exports=pool.promise();