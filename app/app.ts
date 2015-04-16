/// <reference path="project.ts"/>

class RootCtrl {
    public brand= "ATS blog";
    public navStates = [
        {state: "root.posts", title: "Posts"}
    ];
}

angular.module("Blog",["ui.router"])
    .controller("RootCtrl",RootCtrl)
    .config(($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
        $stateProvider
            .state({
                name: "root",
                url: "/",
                controller: "RootCtrl",
                controllerAs: "rootCtrl",
                templateUrl: "root.html"
            })
        $urlRouterProvider.otherwise("/");
    })
    // will make the state visible to all controllers and the html views.
    .run(($state: ng.ui.IStateService, $rootScope: any) => {
        $rootScope.$state = $state;
    })
;