/// <reference path="../project.ts"/>

module Blog.Posts {

    export interface Post {
        id: number;
        title: string;
    }


    export class PostsCtrl {

        public posts: Post[];

        constructor($http: ng.IHttpService, errors: ErrorService) {
            $http.get<Post[]>("/api/posts")

                .success((posts) => {
                    this.posts = posts;
                })

                .error(errors.http)
            ;
        }
    }

    angular.module("Blog")
        .controller("PostsCtrl", PostsCtrl)
        .config(($stateProvider: ng.ui.IStateProvider) => {
            $stateProvider.state({
                name: "root.posts",
                url: "posts",
                controller: "PostsCtrl",
                controllerAs: "postsCtrl",
                templateUrl: "posts/posts.html"
            });
    });
}