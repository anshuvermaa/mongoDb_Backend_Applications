const express = require('express');
const routes=require('./routes/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app=express();


if(process.env.NODE_ENV !== 'test'){
    mongoose.connect('mongodb://localhost/muber')

}


// app.use(bodyParser.json()); should be called before routes important




app.use(bodyParser.json());
routes(app);
//if previous middleware throw error then err
// 422 unprocessable entity
app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
})



app.post('/api');
app.put('/api');
app.delete('/api');




module.exports = app;

