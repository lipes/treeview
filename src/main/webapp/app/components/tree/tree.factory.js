(function(){
    'use strict';

    angular
        .module('tree')
        .factory('TreeFactory', TreeFactory)

    TreeFactory.$inject = ['$filter', '$q'];

    function TreeFactory($filter, $q) {
        return {
            getDados: getDados
        }

        function getDados(data) { 
            var filtered = [];
            var referencia = [];
            angular.forEach(data, function(value){
                var item = {};
                item.text = value.descricaoCategoria;
                item.idCategoria = value.idCategoria;
                item.codigoCategoria = value.codigoCategoria;
                item.observacaoCategoria = value.observacaoCategoria;
                item.idPaiCategoria = value.idPaiCategoria;

                if(item.idPaiCategoria === 0){
                    filtered.push(item);
                    referencia[item.idCategoria] = $filter("filter")(filtered, {idCategoria: item.idCategoria})[0];
                }else{
                    if(!referencia[item.idPaiCategoria].nodes) referencia[item.idPaiCategoria].nodes = [];
                    referencia[item.idPaiCategoria].nodes.push(item);
                    referencia[item.idCategoria] = $filter("filter")(referencia[item.idPaiCategoria].nodes, {idCategoria: item.idCategoria})[0];
                }
            });
            return filtered;
        }
    }
})();