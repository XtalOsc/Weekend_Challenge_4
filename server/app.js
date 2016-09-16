var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});
var path = require('path');
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/toDo';

app.use(express.static('public'));

app.listen('8080', function(){
  console.log('listening on port 8080');
});
