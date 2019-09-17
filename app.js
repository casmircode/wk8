const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
//references to the routers
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
app.listen(8080, ()=>{
    console.log('Server is running......');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const url = "mongodb://" + process.argv[2] + ":27017/" + process.argv[3]
mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully to database.........');
});

//Configuring Endpoints
//Actor RESTFul endpoints
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne); 
app.put('/actors/:id', actors.updateOne); 
app.post('/actors/:id/movies', actors.addMovie); 
app.delete('/actors/:id', actors.deleteOne); 

//Movie RESTFul endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne); 