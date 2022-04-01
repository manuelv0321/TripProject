//import express from "express";
const express = require('express');
const routes = require('./routes');
var body_parser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();


//conectar mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
})

//crear aplicacion de express
const app = express();



app.use(body_parser.json())
app.use('/', routes());

var port = process.env.PORT || 9000;
app.listen(port);
