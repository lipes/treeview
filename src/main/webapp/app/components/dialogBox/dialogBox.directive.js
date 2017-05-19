(function () {
	angular.module('tree')
	  .directive('dialogboxdirective', DialogBox);
		
		function DialogBox(DialogBox, $uibModalStack, $rootScope, $q, $sce) {
	    return {
	      templateUrl: './app/components/dialogBox/dialogBox.html',
	      restrict: 'EA',
	      link: dialogLink
	    };

			function dialogLink(scope, element, attrs) {
	      	var deferred = $q.defer();
	      	scope.msg = $sce.trustAsHtml(element[0].getAttribute('msg'));
	      	scope.type = element[0].getAttribute('type').toUpperCase();
	      	scope.numberDialog = element[0].getAttribute('title');
	      	scope.botao = {};
	      	scope.botao.sim = false;
	      	scope.botao.nao = false;
	      	$rootScope.uibmodal[scope.numberDialog].dadosBotao = '';

	      	if(scope.type =='ERROR'){
	      		scope.title = 'Ocorreu um erro';
	      		scope.tipoMsg = 'danger';
	      	}else if(scope.type == 'OK'){
	      		scope.title = 'Mensagem:';
	      		scope.tipoMsg = 'primary';
	      	}else if(scope.type == 'WARNING'){
	      		scope.title = 'Atenção:';
	      		scope.tipoMsg = 'warning';
	      	}else if(scope.type == 'CONFIRM'){
	      		scope.title = 'Confirmação:';
	      		scope.tipoMsg = 'primary';
	      		scope.botao.sim = true;
	      		scope.botao.nao = true;
	      	}

	      	scope.botaoConfirmacao = function (tipo, number){
	      		if(tipo == "sim"){
	      			$rootScope.uibmodal[number].dadosBotao = 'SIM';
	      			$rootScope.uibmodal[number].close();
	      		}else {
	      			$rootScope.uibmodal[number].dadosBotao = 'NAO';
	      			$rootScope.uibmodal[number].close();
	      		}
	      	}

	      	scope.fecharDialogBox = function(number){
	      		$rootScope.uibmodal[number].close();
	      	}
	      }
	  };
	}
)();
