const express = require('express');
const morgan = require('morgan');
const {students} = require('./students');
const app = express();

app.set('view engine', 'ejs');

app.listen(3000);

app.use((req, res, next) => {
    console.log('Request Made');
    console.log('Host: ${req.hostname}');
    console.log('Path: ${req.path}');
    console.log('Method: ${req.method}');
    next();
  });
app.use(morgan('dev'));

app.get('/', function (req, res) {
    //res.sendFile('./pages/index.html', {root: __dirname});
    res.render('index', {title: 'Home' ,studentdata: students});
  });
app.get('/about', function (req, res) {
    //res.sendFile('./pages/about.html', {root: __dirname});
    res.render('about', {title: 'About Us', heading: 'New Heading' });
  });
app.get('/contact', function (req, res) {
    //res.sendFile('./pages/contact.html', {root: __dirname});
    res.render('contact', {title: 'Contact Us'});
  });


app.get('/aboutus', function (req, res) {
    res.redirect('/about');
    
});


app.use((req, res) => {
    res.render('error', {title: 'Error 404'});
});


   
