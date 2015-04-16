/// <reference path="../project.ts"/>

module Blog {

    export class ErrorService {
        // (h: string) => string function that takes a string and returns a stint
        public http = (status: number, data: any, headers: (h: string) => string ) => {
            console.log("HTTP error: status = " + status);
        }

    }

    angular.module("Blog")
        .service("errors", ErrorService)
    ;
}