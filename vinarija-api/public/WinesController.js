(function() {
	
	// dataService servis je injektovan u WinesController
	var WinesController = function($scope, winesService, $location) {
		winesService.query().$promise.then(function(data){
			$scope.wines = data;	
			adjustPagination();	
		});

		// inicijalna podesavanja nezavisna od podataka
		$scope.searchQuery=""; // iskljucena pretraga po imenu (vraca sva vina, bez obzira na ime)
		$scope.sortCriteria = ""; // iskljuceno sortiranje
	 	$scope.sortDirection = "+"; // smer sortiranja je inicijalno ascending 		
		$scope.maxWinesInTable = 5; // maksimalan broj redova u tabeli (jedna stranica tabele)
		$scope.activePage = 1; // trenutno aktivna stranica, koristi se u tabeli za određivanje koja se vina prikazuju	 		

		function adjustPagination(){
			// izracunavamo koliko ima stranica paginacije (zbog podesavanja pagination komponente)
			// paginationPagesArr - niz stringova koji ce biti u <li> tagovima pagination komponente, npr. "<","1", "2", "3",">"
			$scope.noPaginationPages = Math.ceil( $scope.wines.length / $scope.maxWinesInTable);
			$scope.paginationPagesArr = ["<", "1"]; // uvek ima barem 1 stranica (ta sto se prikazuje)
	 		for(var i=2; i<=$scope.noPaginationPages; i++){
	 			$scope.paginationPagesArr.push ("" + i);
	 		}
	 		$scope.paginationPagesArr.push (">");
		}

		// Funkcija za pretragu vina po imenu: prima jedan red tabele (tableRowData će u ovom slučaju biti wine) i vraca true ukoliko red odgovara kriterijumu pretrage (true - red ce biti prikazan u tabeli) 
		// ili false ako mu ne odgovara	(false - red ce biti izostavljen iz tabele) 	
		// Poziva prilikom renderovanja tabele
	 	$scope.searchWine = function(tableRowData){
	 		var wineName = tableRowData.name.toLowerCase();
	 		var query = $scope.searchQuery.toLowerCase();
	 		return wineName.indexOf(query) != -1; 
	 	}

	 	// podesavanje kriterijuma sortiranja
	 	// funkcija se poziva prilikom klika na glyphicons za sortiranje pri cemu se prosledjuje kriterijum pretrage ("name"/"year"/"grapes"/...)
	 	$scope.setSortCriteria = function(newCriteria){	 		
	 		if(newCriteria == $scope.sortCriteria){ // korisnik je drugi put kliknuo na isti krterijum pretrage - samo promeni sort direction
	 			if($scope.sortDirection == "+"){
	 				$scope.sortDirection = "-";
	 			}else{
	 				$scope.sortDirection = "+";
	 			}
	 		}else{ // korisnik menja kriterijum pretrage, sort direction se postavlja na ascending
	 			$scope.sortCriteria = newCriteria;	
	 			$scope.sortDirection = "+";
	 		}	
	 	}	 

	 	// poziva se prilikom klika na stranicu paginacije. Azurira trenutno aktivnu stranicu $scope.activePage koja se koristi u tabeli za određivanje koja se vina prikazuju
	 	$scope.changePage = function(newActivePage){
	 		if(newActivePage == ">"){
	 			if($scope.activePage < $scope.noPaginationPages){
	 				$scope.activePage = $scope.activePage + 1;
	 			};
	 		}else if (newActivePage == "<") {
	 			if($scope.activePage > 1){
	 				$scope.activePage = $scope.activePage - 1;
	 			};
	 		}else{
	 			$scope.activePage = parseInt(newActivePage);
	 		}
	 	}	

	 	$scope.updateWine = function(wineId){
	 		console.log("/wine/" + wineId)
	 		$location.path("/wine/" + wineId);
	 	}

	 	$scope.removeWine = function(index){

	 		var wine = $scope.wines[index];
	 		
	 		winesService.remove({id: wine._id}, function(){
	 		$scope.wines.splice(index, 1);

	 			

	 		});

	 	}

	 	
	};

	// Registrovanje kontrolera u modulu
	var app = angular.module("wineModule"); 
	app.controller("WinesController", WinesController);

}());