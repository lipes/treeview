(function() {
'use strict';

    angular
        .module('tree')
        .controller('HomeController', HomeController);

    HomeController.inject = ["CategoriaService", "$scope"];

    function HomeController(CategoriaService, $scope) {
        var vm = this;
    }
})();