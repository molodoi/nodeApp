'use strict';
var pow = require('pow-mongodb-fixtures');
var fixtures = pow.connect('phone_book');

var id = pow.createObjectId;

fixtures.load({
    users: [
        {
            "_id": id(),
            "name": "Krokro",
            "lastname": "Mimi",
            "age": "55",
            "job": "Technical",
            "Tel": "0328491500"
        },
        {
            "_id": id(),
            "name": "Obamix",
            "lastname": "Barack",
            "age": "55",
            "job": "Technical",
            "Tel": "0328491500"
        },
        {
            "_id": id(),
            "name": "Buck",
            "lastname": "Jule",
            "age": "55",
            "job": "Technical",
            "Tel": "0328491500"
        }
    ]
});