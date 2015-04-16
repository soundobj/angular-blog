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
//# sourceMappingURL=ErrorService.js.map