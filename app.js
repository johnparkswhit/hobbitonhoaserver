require('dotenv').config()
var express = require('express'); 
var app = express(); 
var user = require('./controllers/usercontroller');
var sequelize = require('./db');
var home = require('./controllers/homecontroller');

sequelize.sync();

app.use(express.json());

app.use(require('./middleware/headers'))

app.use('/user', user);
app.use('/home', home);
app.use(require('./middleware/validate-session'))

app.listen(3000, function(){
    console.log('App is listening on 3000') 
})

