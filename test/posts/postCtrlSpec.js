describe("PostsCtrl", function() {

    beforeEach(module("Blog"));

    var scope, controller, errors;

    beforeEach(angular.mock.inject(
        function($rootScope, $controller) {
            scope = $rootScope.$new();
            errors = {
                called: false,
                http: function (status, data, headers) {
                    errors.called = true;
                }
            };
            controller = $controller("PostsCtrl", {$scope: scope, errors: errors});
        }
    ));

    describe("the Happy Path", function() {

        var httpBackend;

        beforeEach(angular.mock.inject(
            function($httpBackend) {
                httpBackend = $httpBackend;

                httpBackend.expectGET("/api/posts")
                    .respond(200, [{id: 42, title: "Foo"}]);
            }
        ));

        it("should GET /api/posts", function() {
            httpBackend.flush();
        });

        it("should set the 'posts' property", function() {

            httpBackend.flush();
            expect(controller.posts).not.toBeUndefined();

        });
    });

    describe("the Sad Path", function() {

        var httpBackend;

        beforeEach(angular.mock.inject(
            function($httpBackend) {
                httpBackend = $httpBackend;

                httpBackend.expectGET("/api/posts")
                    .respond(500, "Internal Server Error");
            }
        ));

        it("should report errors", function() {
            httpBackend.flush();
            expect(errors.called).toBeTruthy();

        });
    });
});