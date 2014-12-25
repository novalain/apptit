var clicked = false;

angular.module('starter.controllers', [])

.controller('RecipeDetailCtrl', function($scope, $stateParams, $ionicNavBarDelegate, Recipes){

	$scope.showBar = function(){

		console.log("leel")
		//$ionicNavBarDelegate.showBar(false);
	}

	$scope.recipe = Recipes.get($stateParams.recipeId)

	$('.paper').click(function(){
		if(!clicked){
			$(this).animate({height:900}, 300, function(){});
			clicked = true;
			$(this).addClass("Animate");
		}
		else{
			$(this).animate({height:480}, 300, function(){});
			clicked = false;
		}
	});



})

.controller('RecipesCtrl', function($scope, Recipes, $ionicNavBarDelegate) {

	$ionicNavBarDelegate.showBar(false)
	$scope.recipes = Recipes.all();


});





