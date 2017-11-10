(function() {
	
	// dataService servis je injektovan u AddWineController
	var AddWineController = function($scope, $location, newWine, $routeParams) {
		console.log("AddWineController, wineId: " + $routeParams.wineId);
		$scope.newWine = newWine;
		var onSuccessSave = function(){			
			$location.path("/main");
		}

		var onError = function(reason){
			console.log("Error accessing data, reason: " + reason.statusText);
		}
		
		$scope.addWine = function(){
			var wineId = $scope.newWine._id;
			if(wineId){ // updating a wine
				$scope.newWine.$update({id: wineId}, onSuccessSave);
			}else{ // adding a new wine
				$scope.newWine._id = $scope.newWine.name.split(' ').join('_');
				$scope.newWine.$save(onSuccessSave);											
			}
		}


		$scope.removeWine = function(){
			var wineId = $scope.newWine._id;
			console.log(wineId);

			$scope.newWine.$remove({id: wineId}, onSuccessSave);
		}
	};



	var app = angular.module("wineModule"); 
	app.controller("AddWineController", AddWineController);

}());