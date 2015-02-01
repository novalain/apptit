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

		//console.log(window.localStorage.getItem($scope.recipe.id))

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


/** RECIPES CTRL **/

.controller('RecipesCtrl', function($scope, Recipes, $ionicModal) {

	var button = document.getElementById("heartButton");

	if(window.sessionStorage.getItem('f') === 'true'){

		$scope.checked = true;
		button.className = "button-icon icon ion-ios7-heart favHeartInMainMenu green"

	}

	/** About modal box **/
	$ionicModal.fromTemplateUrl('templates/about.html', {
	    scope: $scope,
		animation: 'slide-in-up',
	}).then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openModal = function() {
		
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
	
	$scope.favRecipes = Recipes.getAllFavoriteRecipes();
	$scope.recipes = Recipes.all();
	$scope.user_recipes = Recipes.getAllUserRecipes();

	console.log("USR ", $scope.user_recipes);


	//localforage.getItem('1', function(err, value) { console.log(value) });


	console.log(localStorage.newRecipeCount)
	
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



.controller('NewRecipeCtrl', function($scope, $cordovaCamera, Recipes) {


	console.log("newrecipectrl");
	//Börjar på 4
	var stepsCount = 3;
	var ingCount = 3;


	/** STEG 2 **/

	/*
	$ionicModal.fromTemplateUrl('templates/about.html', {
	    scope: $scope,
		animation: 'slide-left-right'
	}).then(function(modal) {
		$scope.modal3 = modal;
	});

	$scope.openModal3 = function() {
		//window.addEventListener('shake', shakeEventDidOccur, false);
	 	$scope.modal3.show();
  	};
  	$scope.closeModal3 = function() {
	    $scope.modal3.hide();

  	};

	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function() {
	    $scope.modal3.remove();
	});
	// Execute action on hide modal
	$scope.$on('modal.hidden', function() {
	    // Execute action
	   //window.addEventListener('shake', shakeEventDidOccur, true);
	});
	*/

	$scope.clearFields = function(){

		// Clear name and desc
		document.getElementById("recipeName").value = "";
		document.getElementById("recipeDesc").value = "";

		// Clear lists
		document.getElementById("stepslist").innerHTML = '<label class="item item-input no-border">' +
					           '<input class="stepItem" id="step1" type="text" placeholder="Steg 1">' +
					           '</label> ' +
					           '<label class="item item-input no-border">' +
					           '<input class="stepItem" id="step2" type="text" placeholder="Steg 2">' +
					           '</label>' +

					           '<label class="item item-input no-border">' +
					           '<input style="width:60px;"type="text" class="stepItem" id="step3" placeholder="Steg 3">' +
					           '</label>';

		document.getElementById("ingredienslist").innerHTML = '<label class="item item-input no-border">' +
					           '<input class="stepItem" id="ing1" type="text" placeholder="Ingrediens 1">' +
					           '</label> ' +
					           '<label class="item item-input no-border">' +
					           '<input class="stepItem" id="ing2" type="text" placeholder="Ingrediens 2">' +
					           '</label>' +

					           '<label class="item item-input no-border">' +
					           '<input style="width:60px;"type="text" class="stepItem" id="ing3" placeholder="Ingrediens 3">' +
					           '</label>';

		stepsCount = 3;
		ingCount = 3;


	}

	$scope.addNewRecipeStep = function(){

		stepsCount++;

		var input = document.createElement('input');
		input.className = "stepItem"
		input.id = "step" + stepsCount;
		input.setAttribute("type", "text");
		input.setAttribute("placeholder", "Steg " + stepsCount);

		var label = document.createElement('label');
		label.className = "item item-input no-border";
		label.appendChild(input);

		document.getElementById("stepslist").appendChild(label);

	}

	$scope.addNewIngredientStep = function(){

		ingCount++;

		var input = document.createElement('input');
		input.className = "stepItem"
		input.id = "ing" + ingCount;
		input.setAttribute("type", "text");
		input.setAttribute("placeholder", "Ingrediens " + ingCount);

		var label = document.createElement('label');
		label.className = "item item-input no-border";
		label.appendChild(input);

		document.getElementById("ingredienslist").appendChild(label);

	}

	var validate = function(){

		if(document.getElementById('recipeName').value == "" || document.getElementById('recipeDesc') == "")
			document.getElementById('recipeName').style.color= "red";

		for(var i = 1; i <= stepsCount; i++)
			if(document.getElementById('step' + i).value == "")
				return false;

		for(var i = 1; i <= ingCount; i++)
			if(document.getElementById('ing' + i).value == "")
				return false;

		return true;
		
	}

	$scope.storeRecipeInfo = function(){


		if(!validate()){
			alert("Du måste fylla i alla fält!");
			return;
		}

		var userRecipeName = document.getElementById('recipeName').value;
		var userRecipeDesc = document.getElementById('recipeDesc').value;
		var newsteps = [];
		var newing = [];

		for(var i = 1; i <= stepsCount; i++)
			newsteps.push(document.getElementById('step' + i).value);
		
		
		for(var i = 1; i <= ingCount; i++)
			newing.push(document.getElementById('ing' + i).value);

		//takePicture();

		//check if we have any new recipes
		if (localStorage.newRecipeCount) {
		    localStorage.newRecipeCount++;
		} else {
		    localStorage.newRecipeCount = 0;
		}

		newRecipe = {id: localStorage.newRecipeCount+Recipes.all().length, name: userRecipeName, fav: false, desc: userRecipeDesc, steps: newsteps, ingridients: newing, cookTime: '20', servings:'4-5', picUrl:'http://placehold.it/160x160', picUrlWide:'http://placehold.it/400x300' };

		console.log(localStorage.newRecipeCount);

		localStorage.setItem(localStorage.newRecipeCount, JSON.stringify(newRecipe));

		$scope.user_recipes = Recipes.getAllUserRecipes();
		
	}

	var takePicture = function() {

        var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 160,
            targetHeight: 160,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {

        	$scope.imgURI = "data:image/jpeg;base64," + imageData;
        	console.log($scope.imgURI);

        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

});



