var clicked = false;

angular.module('starter.controllers', [])


.controller('RecipeDetailCtrl', function($scope, $stateParams, $ionicNavBarDelegate, Recipes){

	$scope.recipe = Recipes.get($stateParams.recipeId)

	var nrOfIngredients = $scope.recipe.ingridients.length

	$('.paper').click(function(){

		if(!clicked){
			$(this).animate({height:480 + nrOfIngredients*30 + 30}, 300, function(){});
			clicked = true;
		}
		else{
			$(this).animate({height:480}, 300, function(){});
			clicked = false;
		}
	});

	//console.log(window.localStorage.getItem($scope.recipe.id))
	//visar alt bild om vi har lagt till favoriter redan
	if(window.localStorage.getItem($scope.recipe.id) === 'true'){
		$("#favHeartImg").hide(function() { 
			  $(this).load(function() { $(this).show(); }); 
			  $(this).attr("src", "img/hjarta2.png"); 
		}); 
	}

	//Animationen ska nog göras i ett direktiv..
	$scope.addToFavorites = function(){

		console.log(window.localStorage.getItem($scope.recipe.id))

		if(window.localStorage.getItem($scope.recipe.id) == null){
			//Gör lite animation
			$("#favHeartImg").fadeOut(function() { 
			  $(this).load(function() { $(this).fadeIn(); }); 
			  $(this).attr("src", "img/hjarta2.png"); 
			}); 

			window.localStorage.setItem($scope.recipe.id, 'true');
		}

		else{

			$("#favHeartImg").fadeOut(function() { 
			  $(this).load(function() { $(this).fadeIn(); }); 
			  $(this).attr("src", "img/konturer1.png"); 
			}); 

			window.localStorage.removeItem($scope.recipe.id);
		}
	}

})

.controller('RecipesCtrl', function($scope, preload, Recipes, $ionicModal) {

/*
	preload(url).then(function(loadedImageUrl) {
		//Bild laddad!
	 	$scope.imageServingUrl = loadedImageUrl;
	  
	}, function(error) {
	 	$scope.imageServingUrl = 'undefined';
	    
	});*/

	//document.getElementById("navBar").className = "";
	//document.getElementById("navBar").className = "bar-balanced bar bar-header nav-bar nav-title-slide-ios7 disable-user-behavior  no-animation"

	$scope.outerContainerHeight = (Recipes.all().length*156)/2 + 70;

	console.log($scope.outerContainerHeight)
	//$scope.src ="http://www.hdwallpaperscool.com/wp-content/uploads/2013/11/beautiful-cat-hd-wallpapers-fullscreen-top-images.jpg";


	var button = document.getElementById("heartButton");
	/*$rootScope.slideHeader = false;
	$rootScope.slideHeaderPrevious = 0;*/

	// $scope.items = [];
	// for (var i = 0; i < 1000; i++) {
	//     $scope.items.push('Item ' + i);
	// }

	// $scope.getItemHeight = function(item, index) {
	//     //Make evenly indexed items be 10px taller, for the sake of example
	//     return (index % 2) === 0 ? 50 : 60;
	// };
/*
	$scope.checkIfRecipeIsFavorite = function(id){

		if(window.localStorage.getItem(id) === 'true')
			return true;

		return false;
	}*/
/*
	window.addEventListener('shake', shakeEventDidOccur, false);
	//function to call when shake occurs

	function shakeEventDidOccur () {
		alert('hej')
	}*/

	if(window.sessionStorage.getItem('f') === 'true'){

		$scope.checked = true;
		button.className = "button-icon icon ion-ios7-heart favHeartInMainMenu green"

	}

	/** About modal box **/
	$ionicModal.fromTemplateUrl('templates/about.html', {
	    scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function() {
		//window.addEventListener('shake', shakeEventDidOccur, false);
	 	$scope.modal.show();
  	};
  	$scope.closeModal = function() {
	    $scope.modal.hide();
  	};
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
	    $scope.modal.remove();
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
	    // Execute action
	   //window.addEventListener('shake', shakeEventDidOccur, true);
	});

	/** Lägg till recept modal box **/
	$ionicModal.fromTemplateUrl('templates/new-recipe.html', {
	    scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal2 = modal;
	});

	$scope.openModal2 = function() {
		//window.addEventListener('shake', shakeEventDidOccur, false);
	 	$scope.modal2.show();
  	};
  	$scope.closeModal2 = function() {
	    $scope.modal2.hide();
  	};
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
	    $scope.modal2.remove();
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
	    // Execute action
	   //window.addEventListener('shake', shakeEventDidOccur, true);
	});


	$scope.recipes = Recipes.all();
	$scope.favRecipes = Recipes.getAllFavoriteRecipes();
	//$scope.showFavRecipes = { checked: false };

	$scope.showFavRecipesChange = function(){

		if($scope.checked){
			$scope.checked = false;
			button.className = "button-icon icon ion-ios7-heart-outline favHeartInMainMenu"
			window.sessionStorage.removeItem('f');
		}

		else{
			$scope.checked = true;
			window.sessionStorage.setItem('f', 'true');
			button.className = "button-icon icon ion-ios7-heart favHeartInMainMenu green"
		
		}

	}

})


.controller('AboutCtrl', function($scope) {


})

.controller('NewRecipeCtrl', function($scope) {


});



