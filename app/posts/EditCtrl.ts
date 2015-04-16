/// <reference path="../project.ts"/>

module Blog.Posts {

    export class EditCtrl {

        constructor() {

        }

    }

    angular.module("Blog")
        .controller("PostEditCtrl", EditCtrl)
        .config(($stateProvider: ng.ui.IStateProvider) => {
            $stateProvider
                .state({
                    name: "root.posts.edit",
                    url: "/{id}",
                    controller: "PostEditCtrl",
                    controllerAs: "editCtrl",
                    templateUrl: "posts/edit.html"
                })
        })
    ;

}