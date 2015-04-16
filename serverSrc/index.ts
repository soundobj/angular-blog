/**
 * Created by mark on 21/03/15.
 */
/// <reference path="../typings/tsd.d.ts" />

var express = require('express');
var exphbs = <Function>require("express-handlebars");
var bodyParser = require('body-parser');
import posts = require('./posts');


var app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
    res.render("home");
});

app.use('/api/posts', posts);

var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
