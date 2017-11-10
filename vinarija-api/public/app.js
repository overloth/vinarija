(function(){
	
	var app = angular.module("wineModule", ['ngResource', 'ngRoute']);
	
	app.config(function($routeProvider){
		$routeProvider
			.when("/main",{
				templateUrl: "WineTable.html",
				controller: "WinesController"
			})
			.when("/wine/add", {
				templateUrl: "AddWine.html",
				controller: "AddWineController",
				resolve : {
					newWine : function(winesService){
						return new winesService();
					}
				} 
			})
			.when("/wine/:wineId",{
				templateUrl: "AddWine.html",
				controller: "AddWineController",
				resolve : {
					newWine : function(winesService, $route){
						return winesService.get({id: $route.current.params.wineId}).$promise;
					}
				} 
			})
			.otherwise({redirectTo:"/main"})
	});
})();