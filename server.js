const path = require('path');
const express = require ('express');
const dotenv = require ('dotenv');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const database = require('./server/database/db');

const app = express();
dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));

//setting up the response body parser (to make our responses follow a standard)
app.use(bodyParser.urlencoded({ extended:true }));

//setting our view engine to ejs
app.set('view engine', 'ejs');


//loading assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));

//loading routes
app.use('/', require('./server/routes/router'));


//end points
app.get('/api/books', (req, res) => {
    const sql = 'SELECT b.id,b.title,b.price,b.author_id,a.name as author,a.nationality,a.age FROM books b INNER JOIN authors a ON b.author_id= a.id;';
    database.execute(sql).then(result => {
        //here we saw using postman that the response data was sent by the online data base in the first index of an array and this is why we accessed result[0]
        console.log(result[0]);
        res.send(result[0]);
    }).catch(err => {
        /*
        // in the case of an error we first start by setting the status to 500 (internal server error)
        // and the we proceed by serning a response with a message attribute containing the error message thrown by the library
        */
        res.status(500).send({
            message: err.message
        });
    });
});

app.post('/api/addbook', (req, res)=> {
    console.log(88888888888);
    const sql= `INSERT INTO books (title,price,author_id) VALUES('${req.body.title}',${req.body.price}, ${req.body.author_id});`;
    database.execute(sql).then(result=>{
        res.status(201).redirect('/books');
    }).catch(err => { 
        res.status(500).send({ 
             message: err.message 
        });
   });
});

app.get('/api/book',(req , res)=> {
    const sql= `SELECT * FROM books WHERE id = ${req.query.id};`;
    database.execute(sql).then(result=> {
        res.send(result[0]);
    }).catch(err => { 
        res.status(500).send({ 
             message: err.message 
        });
   });
});

app.post('/api/editbook',(req, res)=>{
    const sql= `UPDATE books SET title='${req.body.title}',author_id='${req.body.author_id}',price=${req.body.price} WHERE id= ${req.body.id};`;
    database.execute(sql).then(result=>{
        res.status(201).redirect('/books');
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});

    app.get ('/api/deletebook', (req, res)=> {
        const sql= `DELETE FROM books WHERE id=${req.query.id};`;
        database.execute(sql).then(result=>{
            res.status(202).redirect('/books');
        }).catch(err=>{
            res.status(500).send({
                message: err.message
            });
        });
    });

app.get('/api/authors', (req, res) => {
    const sql = 'SELECT * FROM authors';
    database.execute(sql).then(result => {
        res.send(result[0]);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
