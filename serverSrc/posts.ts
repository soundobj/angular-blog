/// <reference path="../typings/express/express.d.ts" />

import express = require('express');
import data = require('./data');


var router = express.Router();

router.get('/', (req,res) => {
    data.posts.list((err,posts) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.send(posts);
        }
    });
});

router.get('/:id', (req,res) => {
    data.posts.get(req.params.id, (err,post) => {
        if (err) {
            res.sendStatus(500);
        } else if (!post) {
            res.sendStatus(404);
        } else {
            res.send(post);
        }
    })
});

router.post('/', (req,res) => {
    data.posts.add(req.body, (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

router.put('/:id', (req,res) => {
    data.posts.update(req.body, (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

module.exports = router;