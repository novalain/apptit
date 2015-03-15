var clicked = false;

angular.module('starter.controllers', [])

.controller('RecipeDetailCtrl', function($scope, $stateParams, $ionicNavBarDelegate, Recipes){

	//console.log("stateparams", $stateParams);

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


.controller('RecipeUserDetailCtrl', function($scope, $ionicLoading, $ionicPopup, $stateParams, $ionicNavBarDelegate, Recipes, $cordovaCamera){

	$scope.recipe = Recipes.get_user($stateParams.recipeId)

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
	if(window.localStorage.getItem($scope.recipe.id + 'u') === 'true'){
		$("#favHeartImg").hide(function() {
			  $(this).load(function() { $(this).show(); });
			  $(this).attr("src", "img/hjarta2.png");
		});
	}


	//Animationen ska nog göras i ett direktiv..
	$scope.addToFavorites = function(){

		//console.log(window.localStorage.getItem($scope.recipe.id))

		if(window.localStorage.getItem($scope.recipe.id + 'u') == null){
			//Gör lite animation
			$("#favHeartImg").fadeOut(function() {
			  $(this).load(function() { $(this).fadeIn(); });
			  $(this).attr("src", "img/hjarta2.png");
			});

			window.localStorage.setItem($scope.recipe.id + 'u', 'true');
		}

		else{

			$("#favHeartImg").fadeOut(function() {
			  $(this).load(function() { $(this).fadeIn(); });
			  $(this).attr("src", "img/konturer1.png");
			});

			window.localStorage.removeItem($scope.recipe.id + 'u');
		}
	}

	$scope.showConfirm = function() {
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Radera recept',
	     template: 'Är du säker på att du vill ta bort det här receptet?'
	   });
	   confirmPopup.then(function(res) {
	     if(res) {
	       Recipes.removeUserRecipe($scope.recipe.id);

	       window.location.href = "#/recipes";
	       $ionicLoading.show({template: 'Recept borttaget!', noBackdrop: true, duration: 2000 });

	     } else {

	     }
	   });
	 };

	$scope.takePicture = function() {

        var options = {
            quality : 100,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {

        	$scope.imgURI = "data:image/jpeg;base64," + imageData;

					$scope.recipe.picUrlWide = $scope.imgURI
        	document.getElementById("recipeDetailImage").src = $scope.imgURI;

        	//Format picture
					/*
        	if(document.getElementById("userImage").clientHeight < pic_squared || document.getElementById("userImage").clientWidth < pic_squared){
        		document.getElementById("userImage").height = pic_squared;
        		document.getElementById("userImage").width = pic_squared;
        	}*/

        	//console.log("IMG HEIGHT after: ", document.getElementById("userImage").clientHeight);

        }, function(err) {
            // An error occured. Show a message to the user
            alert("Fel vid inläsning av bild!");
        });
  }

})


.controller('RecipesCtrl', function($scope, Recipes, $ionicModal, $ionicScrollDelegate) {

	$ionicScrollDelegate.resize();

	$scope.container_size = (window.innerWidth/2 - 9) + 'px';

	$scope.pic_height = window.innerWidth/2 + 'px';

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


	$scope.favRecipes = Recipes.getAllFavoriteRecipes();
	$scope.favUserRecipes = Recipes.getAllFavoriteUserRecipes();

	$scope.recipes = Recipes.all();
	$scope.user_recipes = Recipes.getAllUserRecipes();

	console.log(localStorage.newRecipeCount)

	$scope.showFavRecipesChange = function(){

		$ionicScrollDelegate.scrollTop();

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



.controller('NewRecipeCtrl', function($scope, $cordovaCamera, Recipes, $ionicLoading) {

	$scope.addNewRecipeStep = function(increment){

		if(stepsCount < 25){

			stepsCount++;

			//console.log("STEPSCOUNT", stepsCount)

			var input = document.createElement('input');
			input.className = "stepItem"
			input.id = "step" + stepsCount;
			input.setAttribute("type", "text");
			input.setAttribute("placeholder", "Steg " + stepsCount);

			var label = document.createElement('label');
			label.className = "item item-input no-border";
			label.appendChild(input);

			document.getElementById("stepslist").appendChild(label);

			if(stepsCount > 3){
				sessionStorage.setItem("autosaveStepsCount", stepsCount - 3);

				(function(stepsCount) {

					document.getElementById('step' + stepsCount).addEventListener("change", function() {
			    		sessionStorage.setItem("autosaveStep" + stepsCount, document.getElementById('step' + stepsCount).value);
			    		console.log(document.getElementById('step' + stepsCount).value)

		    		});

		    	}(stepsCount));
			}

		}

		else{
			alert("För många steg")
		}

	}

	//sessionStorage.clear();

	$scope.addNewIngredientStep = function(){

		if(ingCount < 15){

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

			if(ingCount > 3){
				sessionStorage.setItem("autosaveIngCount", ingCount - 3);

				(function(ingCount) {
					document.getElementById('ing' + ingCount).addEventListener("change", function() {
			    		sessionStorage.setItem("autosaveIng" + ingCount, document.getElementById('ing' + ingCount).value);
			   		});

		   		}(ingCount));
			}

		}

		else{

			alert("För många ingredienser");
		}
	}


	var pic_squared = window.innerWidth/2;
	$scope.pic_height = window.innerWidth/2 + 'px';
	$scope.half_window_width = window.innerWidth/2 + 'px';
	$scope.window_width = window.innerWidth + 'px';
	$scope.quarter_window_width = window.innerWidth/4 + 2 + 'px';
	$scope.textbox_width = window.innerWidth/2 - 8 + 'px';
	$scope.margin_top_text = window.innerWidth/70 + 'px';
	//console.log("newrecipectrl");
	//Börjar på 3
	var stepsCount = 0;
	var ingCount = 0;
	var newRecipe;
	var autosaveStepsCount = 0;
	var autosaveIngCount = 0;

	//Get from cache

	//sessionStorage.clear();

	// HELT BROKEN KRASHAR... Försöker implementera att skapa alla recipe och ingredienser from cache och direkt i javascrpt.

	var input1 = document.getElementById("recipeName");
	var input2 = document.getElementById("recipeDesc");

	if (sessionStorage.getItem("autosave1")) {
	    input1.value = sessionStorage.getItem("autosave1");
	}
	if (sessionStorage.getItem("autosave2")) {
	    input2.value = sessionStorage.getItem("autosave2");
	}

	if(sessionStorage.getItem("autosaveStepsCount"))
		autosaveStepsCount = parseInt(sessionStorage.getItem("autosaveStepsCount"));

	if(sessionStorage.getItem("autosaveIngCount"))
		autosaveIngCount = parseInt(sessionStorage.getItem("autosaveIngCount"));


	for(var i = 0; i < 3 + autosaveStepsCount; i++){
		$scope.addNewRecipeStep();
	}

	for(var i = 0; i < 3 + autosaveIngCount; i++){
		$scope.addNewIngredientStep();
	}

	for(var i = 1; i <= 3 + autosaveStepsCount; i++){
		if(sessionStorage.getItem("autosaveStep" + i)){
			document.getElementById("step" + i).value = sessionStorage.getItem("autosaveStep" + i);
		}
	}

	// add text
	for(var i = 1; i <= 3 + autosaveIngCount; i++){
		if(sessionStorage.getItem("autosaveIng" + i)){
			document.getElementById("ing" + i).value = sessionStorage.getItem("autosaveIng" + i);
		}
	}

	// Add image

	if(sessionStorage.getItem("autosaveImg")){

		console.log("bildfanns")
		document.getElementById("userImage").style.display = 'block';
		document.getElementById("addImage").style.display = 'none';
		document.getElementById("userImage").src = sessionStorage.getItem("autosaveImg");


		//Format image
		if(document.getElementById("userImage").clientHeight < pic_squared || document.getElementById("userImage").clientWidth < pic_squared){
        		document.getElementById("userImage").height = pic_squared;
        		document.getElementById("userImage").width = pic_squared;
    	}

	}

	if($scope.imgURI)
		sessionStorage.setItem("autosaveImg", $scope.imgURI);

	input1.addEventListener("change", function() {
	    sessionStorage.setItem("autosave1", input1.value);
    });

    input2.addEventListener("change", function() {
	    sessionStorage.setItem("autosave2", input2.value);
    });

    // Add eventlisteners to the three first fields (Could probably do this in other function..)
    for (var i = 1; i <= 3; i++) {
	 	(function(i) {
	    	document.getElementById('step' + i).addEventListener("change", function() {
	    	sessionStorage.setItem("autosaveStep" + i, document.getElementById('step' + i).value);
    	});
	  }(i));
	}

    for (var i = 1; i <= 3; i++) {
	 	(function(i) {
	    	document.getElementById('ing' + i).addEventListener("change", function() {
	    	sessionStorage.setItem("autosaveIng" + i, document.getElementById('ing' + i).value);
    	});
	  }(i));
	}

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


		document.getElementById("userImage").style.display = "none";
		document.getElementById("addImage").style.display = 'block';

		document.getElementById("userImageBig").style.display = "none";
		document.getElementById("addImageBig").style.display = 'block';

		//Remove from cache
		sessionStorage.removeItem("autosave1");
		sessionStorage.removeItem("autosave2");

		sessionStorage.removeItem("autosaveStepsCount");
		sessionStorage.removeItem("autosaveIngCount");

		for(var i = 1; i <= stepsCount; i++){

			sessionStorage.removeItem("autosaveStep" + i);
		}

		for(var j = 1; j <= ingCount; j++){

			sessionStorage.removeItem("autosaveIng" + j);

		}

		sessionStorage.removeItem("autosaveImg");

		stepsCount = 3;
		ingCount = 3;

	}

	var validate = function(){

		if(document.getElementById('recipeName').value == "" || document.getElementById('recipeDesc') == "" || document.getElementById('recipeName').value.length > 30 || document.getElementById('recipeDesc').value.length > 500)
			return false;

		for(var i = 1; i <= stepsCount; i++)
			if(document.getElementById('step' + i).value == "" || document.getElementById('step' + i).value.length > 100 )
				return false;

		for(var i = 1; i <= ingCount; i++)
			if(document.getElementById('ing' + i).value == "" || document.getElementById('ing' + i).value.length > 30 )
				return false;

		return true;

	}

	$scope.storeRecipeInfo = function(){

/*
		if(!validate()){
			setTimeout(function() {
				alert("För långt namn eller fält tomma");
			}, 0);
			return;
		}

*/

		var userRecipeName = document.getElementById('recipeName').value;
		var userRecipeDesc = document.getElementById('recipeDesc').value;
		var newsteps = [];
		var newing = [];

		for(var i = 1; i <= stepsCount; i++){
			var obj = {id:i-1, desc:document.getElementById('step' + i).value};
			newsteps.push(obj);
		}

		for(var i = 1; i <= ingCount; i++){
			var obj = {id:i-1, desc:document.getElementById('ing' + i).value};
			newing.push(obj);
		}

		// Check if we have any new recipes
		if (localStorage.newRecipeCount) {
		    localStorage.newRecipeCount++;
		} else {
		    localStorage.newRecipeCount = 1;
		}

		var newid = localStorage.newRecipeCount - 1;

		newRecipe = {id: newid, name: userRecipeName, fav: false, desc: userRecipeDesc, steps: newsteps, ingridients: newing, cookTime: document.getElementById("cookTime").options[document.getElementById("cookTime").selectedIndex].value, servings:document.getElementById("servings").options[document.getElementById("servings").selectedIndex].value, picUrl:'img/default_2.png', picUrlWide:'img/default_img_wide.png', exists: true};

		storeFinalRecipe();
	}

	var storeFinalRecipe = function(){


		if(document.getElementById("userImage").src.length > 0)
			newRecipe.picUrl = document.getElementById("userImage").src;

		else // Scale is ok regardless of size
			newRecipe.picUrl = 'img/default_2.png';


		Recipes.addNewUserRecipe(newRecipe);

		setTimeout(function() {
			$scope.clearFields();
		}, 500);

		window.location.href = "#/recipes";
		$ionicLoading.show({template: 'Receptet tillagt!', noBackdrop: true, duration: 2000 });

	}

	//Jr crop

	$scope.takeBigPicture = function() {

        var options = {
            quality : 100,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {

						console.log("ok");

						$scope.imgURI = "data:image/jpeg;base64," + imageData;

						document.getElementById("userImageBig").style.display = 'block';
	        	document.getElementById("addImageBig").style.display = 'none';

						sessionStorage.setItem("autosaveImgBig", $scope.imgURI);
						document.getElementById("userImageBig").src = $scope.imgURI;

						/*
						document.getElementById("userImageBig").style.display = 'block';
	        	document.getElementById("addImageBig").style.display = 'none';
	        	$scope.imgURI = "data:image/jpeg;base64," + imageData;
	        	document.getElementById("userImageBig").src = $scope.imgURI;
						*/



        }, function(err) {
            // An error occured. Show a message to the user
            //alert("Fel uppstod vid inläsning av bild!");
        });

	}

	$scope.takePicture = function() {

		//console.log("pis")

        var options = {
            quality : 100,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: $scope.pic_height,
            targetHeight: $scope.pic_height,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {

					// Show user Image and hide text
        	document.getElementById("userImage").style.display = 'block';
        	document.getElementById("addImage").style.display = 'none';
        	$scope.imgURI = "data:image/jpeg;base64," + imageData;
        	document.getElementById("userImage").src = $scope.imgURI;

					// Save in session storage
        	sessionStorage.setItem("autosaveImg", $scope.imgURI);

        	//Format picture

        	if(document.getElementById("userImage").clientHeight < pic_squared || document.getElementById("userImage").clientWidth < pic_squared){
        		document.getElementById("userImage").height = pic_squared;
        		document.getElementById("userImage").width = pic_squared;
        	}

        	//console.log("IMG HEIGHT after: ", document.getElementById("userImage").clientHeight);

        }, function(err) {
            // An error occured. Show a message to the user
            //alert("Fel uppstod vid inläsning av bild!");
        });
		}

// End controller
});
