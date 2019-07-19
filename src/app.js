const express = require('express');
const validator = require('validator');

const app = express();


app.get('', (req,res)=> {

    res.render('login');

})

app.get('/sign', (req,res)=> {

    res.render('sign');

})

app.get('home', (req,res)=> {

    res.render('home');

})