const express = require('express');
const morgan = require('morgan');
const {students} = require('./students');
const app = express();
const weather = require('weather-js');

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
  weather.find({search: 'Davao, PH', degreeType: 'C'}, function(err, result) {
    if(err){
        console.log(err);
        res.render('index', {title: 'Home', heading: 'Weather', weather: 'Nothing'});
    }
    else{
        //console.log(result);
        res.render('index', {title: 'Home', heading: 'Weather', weather: result});
    
    }
    console.log(result);
  });

    
  });


app.get('/about', function (req, res) {
  
   res.render('about', {title: 'About Us', heading: 'New Heading-About Us' });
  });

  
app.get('/contact', function (req, res) {
    //res.sendFile('./pages/contact.html', {root: __dirname});
    res.render('contact', {title: 'Contact Us', fullname: 'Beidou Ningguang'});
  });


app.get('/aboutus', function (req, res) {
    res.redirect('/about');
    
});


app.use((req, res) => {
    res.render('error', {title: 'Error 404'});
});


   
