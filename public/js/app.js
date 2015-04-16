/// <reference path="project.ts"/>
var RootCtrl = (function () {
    function RootCtrl() {
        this.brand = "ATS blog";
        this.navStates = [
            { state: "root.posts", title: "Posts" }
        ];
    }
    return RootCtrl;
})();
angular.module("Blog", ["ui.router"]).controller("RootCtrl", RootCtrl).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "root",
        url: "/",
        controller: "RootCtrl",
        controllerAs: "rootCtrl",
        templateUrl: "root.html"
    });
    $urlRouterProvider.otherwise("/");
}).run(function ($state, $rootScope) {
    $rootScope.$state = $state;
});

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

/// <reference path="../project.ts"/>
var Blog;
(function (Blog) {
    var Posts;
    (function (Posts) {
        var EditCtrl = (function () {
            function EditCtrl() {
            }
            return EditCtrl;
        })();
        Posts.EditCtrl = EditCtrl;
        angular.module("Blog").controller("PostEditCtrl", EditCtrl).config(function ($stateProvider) {
            $stateProvider.state({
                name: "root.posts.edit",
                url: "/{id}",
                controller: "PostEditCtrl",
                controllerAs: "editCtrl",
                templateUrl: "posts/edit.html"
            });
        });
    })(Posts = Blog.Posts || (Blog.Posts = {}));
})(Blog || (Blog = {}));

/// <reference path="../project.ts"/>
var Blog;
(function (Blog) {
    var ErrorService = (function () {
        function ErrorService() {
            // (h: string) => string function that takes a string and returns a stint
            this.http = function (status, data, headers) {
                console.log("HTTP error: status = " + status);
            };
        }
        return ErrorService;
    })();
    Blog.ErrorService = ErrorService;
    angular.module("Blog").service("errors", ErrorService);
})(Blog || (Blog = {}));

/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angular-ui-router/angular-ui-router.d.ts" />
/// <reference path="app.ts" />
/// <reference path="posts/postsCtrl.ts" />
/// <reference path="posts/EditCtrl.ts" />
/// <reference path="errors/ErrorService.ts" />
