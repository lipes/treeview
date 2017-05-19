(function() {
'use strict';

    angular
        .module('tree')
        .service('CategoriaService', CategoriaService);

    CategoriaService.inject = ["$http"];

    function CategoriaService($http) {
        return {
            listar: listar,
            deletar: deletar,
            cadastrar: cadastrar
        }

        function listar() {
			return $http({
				method : 'GET',
				url : "categorias"
			});
		}

        function deletar(arrayRemove) {
			return $http({
				method : 'DELETE',
				url : "categorias",
                data: arrayRemove,
                headers: {'Content-Type': 'application/json'}
			});
		}

        function cadastrar(data) {
			return $http({
				method : 'POST',
				url : "categorias",
                data: data,
                headers: {'Content-Type': 'application/json'}
			});
		}
    }
})();