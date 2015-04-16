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
//# sourceMappingURL=app.js.map