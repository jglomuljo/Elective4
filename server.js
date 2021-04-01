const express = require('express');
const morgan = require('morgan');
const app = express();
const weather = require('weather-js');
const animal = require('cute-animals');

const path = require('path');
app.use(express.static(path.join(__dirname,'public')));


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
  
  res.render('index', {title: 'Home', heading: 'Home'});
    
  });


app.get('/about', function (req, res) {
  var anim = animal('adj adj animal');
   res.render('about', {title: 'Generate an Animal', heading: 'Generate an Animal', animl: anim });
  });

app.get('/other', function (req, res) {
  weather.find({search: 'Davao, PH', degreeType: 'C'}, function(err, result) {
    if(err){
        console.log(err);
        res.render('other', {title: 'Weather', heading: 'Weather', weather: 'Nothing'});
    }
    else{
        //console.log(result);
        res.render('other', {title: 'Weather', heading: 'Weather', weather: result});
    
    }
    console.log(result);
  });
});

app.use((req, res) => {
    res.render('error', {title: 'Error 404'});
});


   
