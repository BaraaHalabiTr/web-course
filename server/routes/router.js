//router.js is a separate file that handles routes that lead to page, NOT API endpoint that respond with data

const express = require('express');
const route = express.Router();
const axios = require('axios');

route.get('/books', (req , res) => {
    //here we start the route by calling the api end point that we created in server.js @line 33
    axios.get('http://localhost:3000/api/books').then(response => {
        //after we make sure that we recieved the requested data we proceed by rendering the page and sending the data we got with it 
        res.render('books', { books : response.data });
        //note we set response.data because the body parser library puts the data we send in a data attribute
    });
});

route.get('/editbook',(req , res)=> {
    axios.get(`http://localhost:3000/api/book?id=${req.query.id}`).then(response=> {
        axios.get('http://localhost:3000/api/authors').then(authors=>{
            res.render('editbook',{ book:response.data[0],authors:authors.data });
        })
    });
});

route.get('/addbook', (req , res)=>{
    axios.get('http://localhost:3000/api/authors').then(response=>{
        res.render('addbook',{authors : response.data});
    });
});

module.exports = route;