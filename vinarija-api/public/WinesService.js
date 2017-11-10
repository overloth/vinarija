(function(){
	var winesService = function($resource){
		var url = "Vinarija/:id";
		// POSTAVITI SOPSTVENI API KLJUČ
		return $resource(url, null, {update: {method: 'PUT'} })
	};

	var module = angular.module("wineModule");
	module.factory("winesService", winesService);
}());