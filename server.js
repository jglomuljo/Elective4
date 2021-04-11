const express = require('express');
const morgan = require('morgan');
const app = express();
const animal = require('cute-animals');
const mongoose = require('mongoose');
const request = require('request');
const path = require('path');
const Person = require('./models/addper');

//connect to mongodb
const dbURI = 'mongodb+srv://user:user@sa2021.bsmac.mongodb.net/persdata?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(morgan('dev'));

function timeanddate(objects)
    {
        var timeFormat = {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, timeZone: objects["timezone"]}
        var dateFormat = {year: 'numeric', month: 'long', day: 'numeric', timeZone: objects["timezone"]}

        var datetime = new Date(objects["datetime"])
        
        var date = new Intl.DateTimeFormat('en-US', dateFormat).format(datetime)
        var time = new Intl.DateTimeFormat('en-US', timeFormat).format(datetime)

        return [time, date];
    }

function separate(str){
  var strng = str.split('/')[1];
  return strng;
}



//undefined - problem
app.locals.date;
app.locals.nationality;
app.locals.findthe;

app.get('/', function (req, res) {
  res.render('index', {title: 'Lakbay Na'});
  }); 


app.get('/portal', (req, res) => {
    request('http://worldtimeapi.org/api/timezone/'+findthe.country, function(error, response, body) {
        const info = JSON.parse(body)
        img = separate(findthe.country)
        information = timeanddate(info)
        Person.find()
            .then((result) => {
                res.render('portal', {title: 'Lakbay Portal', time: information[0], date: information[1], image: img, persons: result})
            })
            .catch((err) => {
                console.log(err);
            })
    })
    console.log(findthe.country)
});


app.post('/portal', (req,res) => {
  findthe = req.body
  res.redirect('portal')
});


app.get('/form', function (req, res) {
  if(findthe.country == "Asia/Manila"){
    nationality = 'Filipino';
  }
  else if(findthe.country == "Asia/Seoul"){
    nationality = 'South Korean';
  }
  else if(findthe.country == "Asia/Jakarta"){
    nationality = 'Indonesian';
  }
  else if(findthe.country == "Asia/Jerusalem"){
    nationality = 'Israeli';
  }
  else if(findthe.country == "Asia/Dubai"){
    nationality = 'Emirati';
  }
  res.render("form", {title: 'Add New Person', nationality: nationality});
});


// app.get('/viewperson', function (req, res) {
//   var anim = animal('adj adj animal');
//    res.render('viewperson', {title: 'Generate an Animal', heading: 'Generate an Animal', animl: anim });
//   });

app.post('/addpip', (req,res) => {
  const pip = new Person(req.body);
  console.log(req.body);
  pip.save()
    .then((result) => {
      res.redirect('/portal');
    })
    .catch((err) => {
      console.log(err);
    })
});
  
// app.use((req, res) => {
//     res.render('error', {title: 'Error 404'});
// });

app.get('/viewperson/:id', (req,res) => {
  const idpers_id = req.params.id;
  console.log(idpers_id)
  Person.findById(idpers_id)
    .then(result => {
      console.log(result);
      res.render('viewperson', {title: 'View', preview: result}); 
    })
    .catch (err=> {
      console.log(err);
    })
});

app.post('/viewaction', (req, res)=> {
  res.render('viewperson');
})



// demo

// app.get('/add-pers', (req, res) =>{
//   const pers = new Person({
//     fullname: 'Jelly Mons',
//     nationality: 'South Korean',
//     birthdate: '08/28/1999'
//   });
//   pers.save()
//     .then((result)=> {
//       res.send(result)
//     })
//     .catch((err) =>{
//       console.log(err)
//     })
// });


