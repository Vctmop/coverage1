const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
//Inicializaciónes
const app = express();

//Settings
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
//Routes
app.use(require('./routes/'));

//Static Files
app.use(express.static(path.join(__dirname,'public')));

//Starting server
app.listen(5000,()=>{
    console.log('server on port 4000');
});