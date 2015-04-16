/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/async/async.d.ts" />
var fs = require('fs');
var path = require('path');
var async = require('async');
const utf8 = { encoding: 'utf8' };
var PostData = (function () {
    function PostData() {
    }
    PostData.prototype.list = function (listCb) {
        fs.readdir('posts', function (err, entries) {
            if (err) {
                listCb(err);
                return;
            }
            async.map(entries, function (entry, cb) {
                var dataFile = path.join('posts', entry, 'data.json');
                fs.readFile(dataFile, utf8, function (err, json) {
                    var post = JSON.parse(json);
                    post.id = entry;
                    cb(null, post);
                });
            }, function (err, posts) {
                if (err) {
                    listCb(err);
                }
                else {
                    listCb(null, posts.filter(function (p) { return !!p; }));
                }
            });
        });
    };
    PostData.prototype.get = function (id, getCb) {
        var dir = path.join('posts', id);
        fs.exists(dir, function (exists) {
            if (!exists) {
                getCb(null, null);
                return;
            }
            fs.readFile(path.join(dir, 'data.json'), utf8, function (err, data) {
                if (err) {
                    getCb(err, null);
                    return;
                }
                var post = JSON.parse(data);
                fs.readFile(path.join(dir, 'content.md'), utf8, function (err, content) {
                    if (err) {
                        getCb(err, null);
                    }
                    else {
                        post.markdown = content;
                        getCb(null, post);
                    }
                });
            });
        });
    };
    PostData.prototype.add = function (post, addCb) {
        var dir = path.join('posts', post.id);
        fs.mkdir(dir, function (err) {
            if (err) {
                addCb(err);
                return;
            }
            fs.writeFile(path.join(dir, 'content.md'), post.markdown, function (err) {
                if (err) {
                    addCb(err);
                    return;
                }
                delete post.markdown;
                fs.writeFile(path.join(dir, 'data.json'), JSON.stringify(post), function (err) {
                    addCb(err);
                });
            });
        });
    };
    return PostData;
})();
exports.posts = new PostData();
