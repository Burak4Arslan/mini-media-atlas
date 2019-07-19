const express = require('express');
const validator = require('validator');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000

const fd = path.join(__dirname,'../public')

app.use(express.static(fd));

app.set('view engine','hbs');

app.get('', (req,res)=> {

    res.render('login');

})

app.get('/sign', (req,res)=> {

    res.render('sign');

})

app.get('/home', (req,res)=> {

    res.render('home');

})

app.listen(port, () => {

    console.log("Server is up and running on port " + port);

})