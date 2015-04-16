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
//# sourceMappingURL=EditCtrl.js.map