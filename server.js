'use strict';
var path = require('path');
var express = require('express');
Promise = require('bluebird');
//global.fs sert à définir la variable fs comme variable globale
global.mongoose = Promise.promisifyAll(require('mongoose'));
global.logLib = require('./lib/log');
global.exphbs = require('express-handlebars');

//On promisify l'utilisation de FileSystem
global.fs = Promise.promisifyAll(require('fs'));

global.app = express();

var hbs = exphbs.create({
    helpers: {
        renderName: function (user) {
            return 'Nom : ' + user.name;
        },
        renderLastName: function (user) {
            return 'Prénom : ' + user.lastname;
        }
    },
    //toujours déclaré le layout par defaut
    defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

var bodyParser = require('body-parser');
//Récupérer les données d'un formulaire, ect.. doc du body parser
//doc: https://github.com/expressjs/body-parser parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
mongoose.connect('mongodb://localhost/phone_book');

// import models
global.models = require('./models');

// import routing
require('./routing/callback');
require('./routing/users');


app.listen(8080);