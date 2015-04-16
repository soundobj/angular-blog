/// <reference path="../typings/express/express.d.ts" />
var express = require('express');
var data = require('./data');
var router = express.Router();
router.get('/', function (req, res) {
    data.posts.list(function (err, posts) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.send(posts);
        }
    });
});
router.get('/:id', function (req, res) {
    data.posts.get(req.params.id, function (err, post) {
        if (err) {
            res.sendStatus(500);
        }
        else if (!post) {
            res.sendStatus(404);
        }
        else {
            res.send(post);
        }
    });
});
router.post('/', function (req, res) {
    data.posts.add(req.body, function (err) {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.sendStatus(201);
        }
    });
});
module.exports = router;
