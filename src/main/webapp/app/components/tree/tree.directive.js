(function() {
    'use strict';

    angular
        .module('tree')
        .directive('treeDirective', TreeDirective);

    TreeDirective.inject = ["DialogBox", "TreeFactory", "$filter", "CategoriaService"];

    function TreeDirective(DialogBox, TreeFactory, $filter, CategoriaService) {
        return {
            templateUrl: './app/components/tree/tree.html',
	        restrict: 'EA',
            link: link
        };
        
        function link(scope, element, attrs) {
            var vm = this;
            vm.filter = $filter;
            vm.produtos = [];
            vm.lista = [];
            scope.treeDetail = {};
            $('[data-toggle="tooltip"]').tooltip();

            vm.listaProdutos = function(){
                CategoriaService.listar().then(function(response){
                    vm.produtos = TreeFactory.getDados(response.data);
                    vm.lista = response.data;
                    vm.tree.treeview({
                        data: vm.produtos,
                        highlightSearchResults: false
                    });
                    refreshNode(vm);
                });
            }
            vm.listaProdutos();

            vm.tree = element.find('#tree').treeview({
                data: vm.produtos
            });

            var observer = new MutationObserver(function(mutations) {
                refreshNode(vm);
            });
            
            observer.observe(element.find(".treeview")[0], {
                childList: true,
                subtree: true
            });

            function refreshNode(vm){
                var that = vm;
                var array = element.find('.treeview .list-group .node-tree');
                for (var index = 0; index < array.length; index++) {
                    var value = array[index];
                    value.getAttribute("data-nodeid");
                    value.setAttribute("data-toggle", "tooltip");
                    value.setAttribute("title", "Titulo" + (1));
                    value.setAttribute('data-placement', 'top');
                    $('[data-toggle="tooltip"]').tooltip();
                }
            }

            function getSelected(){
                return vm.tree.treeview('getSelected');
            }

            scope.collapseAll = function(){
                vm.tree.treeview('collapseAll');
            }

            scope.expandeAll = function(){
                vm.tree.treeview('expandAll');
            }

            scope.search = function(e) {
                var pattern = element.find('#input-search').val();
                var options = {
                    ignoreCase: true,
                    revealResults: true
                };
                var busca = vm.filter("buscaTree")(vm.produtos, pattern);
                vm.tree.treeview({
                    data: vm.produtos,
                    highlightSearchResults: false
                });
                vm.tree.treeview('collapseAll');
                var results = vm.tree.treeview('search', [pattern, options]);
            }

            scope.removeTree = function(){
                DialogBox.show("Tem certeza que deseja excluir esse nó?", "Confirm").then(function(){
                    var arrayRemove = vm.filter("buscaIdsRemoveTree")(vm.produtos, vm.tree.treeview('getSelected')[0].idCategoria);
                    CategoriaService.deletar(arrayRemove).then(function(data){
                        DialogBox.show("Categoria removida com sucesso!", "OK");
                        vm.listaProdutos();
                    });
                });
            }

            scope.saveTree = function(data){
                if(vm.tree.treeview('getSelected').length > 0 && scope.tipo == "Adicionar")
                    data.idPaiCategoria = vm.tree.treeview('getSelected')[0].idCategoria;
                
                if(data.codigoCategoria == null || data.descricaoCategoria == null){
                    DialogBox.show("Os campos código e descrição são obrigatórios", "Warning");
                    return;
                }
                
                data.statusCategoria = 1;

                CategoriaService.cadastrar(data).then(function(){
                    DialogBox.show("Categoria cadastrada com sucesso", "OK");
                    data = {};
                    vm.listaProdutos();
                     $('#modal-add-tree').modal("hide");
                });
            }

            scope.modalTree = function(tipo){
                scope.treeDetail = {};
                scope.tipo = tipo;

                if(tipo == "Editar"){
                    var selecionado = vm.tree.treeview('getSelected')[0];

                    if(!selecionado){
                        DialogBox.show("Selecione um nó para editar", "Warning");
                        return;
                    }

                    scope.treeDetail.idPaiCategoria = selecionado.idPaiCategoria;
                    scope.treeDetail.descricaoCategoria = selecionado.text;
                    scope.treeDetail.observacaoCategoria = selecionado.observacaoCategoria;
                    scope.treeDetail.codigoCategoria = selecionado.codigoCategoria;
                    scope.treeDetail.idCategoria = selecionado.idCategoria;

                    if(getSelected().length == 0){
                        DialogBox.show("Você precisa selecionar um item da lista para editar", "Warning");
                        return;
                    }
                }
                    
                $('#modal-add-tree').modal({
                    keyboard: false,
                    backdrop: 'static'
                });
            }

            scope.cancelTree = function(){
                scope.treeDetail = {};
                $('#modal-add-tree').modal("hide");
            }
        }
    }
})();