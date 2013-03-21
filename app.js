var express = require('express');
var app = module.exports = express();
var register_routes = require('./routes.js');

console.log("ZZ's express app!");

app.listen(4000);

register_routes(app)
