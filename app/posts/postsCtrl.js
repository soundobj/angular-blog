/// <reference path="../project.ts"/>
var Blog;
(function (Blog) {
    var Posts;
    (function (Posts) {
        var PostsCtrl = (function () {
            function PostsCtrl($http, errors) {
                var _this = this;
                $http.get("/api/posts").success(function (posts) {
                    _this.posts = posts;
                }).error(errors.http);
            }
            return PostsCtrl;
        })();
        Posts.PostsCtrl = PostsCtrl;
        angular.module("Blog").controller("PostsCtrl", PostsCtrl).config(function ($stateProvider) {
            $stateProvider.state({
                name: "root.posts",
                url: "posts",
                controller: "PostsCtrl",
                controllerAs: "postsCtrl",
                templateUrl: "posts/posts.html"
            });
        });
    })(Posts = Blog.Posts || (Blog.Posts = {}));
})(Blog || (Blog = {}));
//# sourceMappingURL=postsCtrl.js.map