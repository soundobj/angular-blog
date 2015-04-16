/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/async/async.d.ts" />

import fs = require('fs');
import path = require('path');
import async = require('async');

interface Post {
    id: string;
    title: string;
    date: Date;
    markdown?: string;
}

const utf8 = {encoding: 'utf8'};

class PostData {
    public list(listCb: (err, posts?: Post[]) => any) {
        fs.readdir('posts', (err, entries) => {
            if (err) {
                listCb(err);
                return;
            }
            async.map(entries,
                (entry, cb) => {
                    var dataFile = path.join('posts', entry, 'data.json');
                    fs.readFile(dataFile, utf8, (err, json) => {
                        var post = <Post>JSON.parse(json);
                        post.id = entry;
                        cb(null, post);
                    });
                },
                (err, posts: Post[]) => {
                    if (err) {
                        listCb(err);
                    } else {
                        listCb(null, posts.filter(p => !!p));
                    }
                }
            );
        });
    }

    public get(id: string, getCb: (err,post) => any) {
        var dir = path.join('posts', id);
        fs.exists(dir, (exists) => {
            if (!exists) {
                getCb(null, null);
                return;
            }
            fs.readFile(path.join(dir, 'data.json'), utf8, (err, data) => {
                if (err) {
                    getCb(err, null);
                    return;
                }
                var post = <Post>JSON.parse(data);
                fs.readFile(path.join(dir, 'content.md'), utf8, (err, content) => {
                    if (err) {
                        getCb(err, null);
                    } else {
                        post.markdown = content;
                        getCb(null, post);
                    }
                });
            });
        });
    }

    public add(post: Post, addCb: (err) => any) {
        var dir = path.join('posts', post.id);
        fs.mkdir(dir, (err) => {
            if (err) {
                addCb(err);
                return;
            }
            fs.writeFile(path.join(dir, 'content.md'), post.markdown, (err) => {
                if (err) {
                    addCb(err);
                    return;
                }
                delete post.markdown;
                fs.writeFile(path.join(dir, 'data.json'), JSON.stringify(post), (err) => {
                    addCb(err);
                });
            });
        });
    }

    public update(post: Post, addCb: (err) => any) {
        var dir = path.join('posts', post.id);
        fs.exists(dir, (exists) => {
            if (!exists) {
                this.add(post, addCb);
                return;
            }
            fs.writeFile(path.join(dir, 'content.md'), post.markdown, (err) => {
                if (err) {
                    addCb(err);
                    return;
                }
                delete post.markdown;
                fs.writeFile(path.join(dir, 'data.json'), JSON.stringify(post), (err) => {
                    addCb(err);
                });
            });
        });
    }
}

export var posts = new PostData();