(function() {
'use strict';

    angular
        .module('tree')
        .filter("buscaTree", function(){
            return function(items,id){
                var filtered = [];
                var achou = false;
                var recursiveFilter = function(items,id,type){
                    angular.forEach(items,function(item){
                        achou = false;
                        if(item.text.toUpperCase().match(id.toUpperCase()) && !type){
                            filtered.push(item);
                            achou = true;
                        }
                        if(angular.isArray(item.nodes) && item.nodes.length > 0){
                            recursiveFilter(item.nodes, id, achou);              
                        }
                    });
                };
                recursiveFilter(items,id, false);
                return filtered;
            };
        }).filter("buscaIdsRemoveTree", function(){
            return function(produtos, id){
                var filtered = [];

                var recursiveFilter = function(produtos, id, type){
                    var produtos = produtos;
                    var achou = false;
                    angular.forEach(produtos, function(item){
                        achou = false;
                        if((item.idCategoria == id && !type) || (item.idPaiCategoria == id && type)){
                            filtered.push(item.idCategoria);
                            achou = true;
                        }
                            
                        if(angular.isArray(item.nodes) && item.nodes.length > 0){
                            recursiveFilter(item.nodes, achou ? item.idCategoria : id, achou);              
                        }
                    });
                };
                recursiveFilter(produtos, id, false);
                return filtered;
            };
        });
})();