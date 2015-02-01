angular.module('starter.services', [])

.factory('Recipes', function(){

  localStorage.clear();
  var user_recipes = [];

  console.log("hellorecipes");

  var recipes = [
    {id: 0, name:'Fläskfilé med sås på soltorkade tomater', fav:false, desc: desc0, steps: steps0, ingridients: ingredients0, cookTime: '20', servings:'4-5', picUrl:'img/mat/0.png', picUrlWide:'img/mat/wide/0wide.png'},
    {id: 1, name:'Krämig pasta med skinka och paprika', fav:false, desc: desc1, steps: steps1, ingridients: ingredients1, cookTime: '30', servings:'4', picUrl:'img/mat/1.png', picUrlWide:'img/mat/wide/1wide.png'}, 
    {id: 2, name:'Somrig couscoussallad', fav:false, desc: desc2, steps: steps2, ingridients: ingredients2, cookTime: '30', servings:'2-3', picUrl:'img/mat/2.png', picUrlWide:'img/mat/wide/2wide.png'},
    {id: 3, name:'Nudlar med grönsakswook och kyckling', fav:false, desc: desc3, steps: steps3, ingridients: ingredients3, cookTime: '40', servings:'3-4', picUrl:'img/mat/3.png', picUrlWide:'img/mat/wide/3wide.png'},
    {id: 4, name:'Chili con carne', fav:false, desc: desc4, steps: steps4, ingridients: ingredients4, cookTime: '30', servings:'4-5', picUrl:'img/mat/4.png', picUrlWide:'img/mat/wide/4wide.png'},
    {id: 5, name:'Lax i ugn', fav:false, desc: desc5, steps: steps5, ingridients: ingredients5, cookTime: '30', servings:'3-4', picUrl:'img/mat/5.png', picUrlWide:'img/mat/wide/5wide.png'},
    {id: 6, name:'Stekt ris med biff', fav:false, desc: desc6, steps: steps6, ingridients: ingredients6, cookTime: '40', servings:'3-4', picUrl:'img/mat/6.png', picUrlWide:'img/mat/wide/6wide.png'},
    {id: 7, name:'Persiljestuvad potatis med isterband', fav:false, desc: desc7, steps: steps7, ingridients: ingredients7, cookTime: '30', servings:'3', picUrl:'img/mat/7.png', picUrlWide:'img/mat/wide/7wide.png'},
    {id: 8, name:'Paj med rökt sidfläsk', fav:false, desc: desc8, steps: steps8, ingridients: ingredients8, cookTime: '120', servings:'4-5', picUrl:'img/mat/8.png', picUrlWide:'img/mat/wide/8wide.png'},
    {id: 9, name:'Hamburgare', fav:false, desc: desc9, steps: steps9, ingridients: ingredients9, cookTime: '40', servings:'4', picUrl:'img/mat/9.png', picUrlWide:'img/mat/wide/9wide.png'},
    {id: 10, name:'Grillad fläskkotlett med tzatziki och grekisk sallad', fav:false, desc: desc10, steps: steps10, ingridients: ingredients10, cookTime: '30', servings:'4', picUrl:'img/mat/10.png', picUrlWide:'img/mat/wide/10wide.png'},
    {id: 11, name:'Tonfisksallad', fav:false, desc: desc11, steps: steps11, ingridients: ingredients11, cookTime: '50', servings:'3-4', picUrl:'img/mat/11.png', picUrlWide:'img/mat/wide/11wide.png'},
    {id: 12, name:'Tomatpasta', fav:false, desc: desc12, steps: steps12, ingridients: ingredients12, cookTime: '40', servings:'3', picUrl:'img/mat/12.png', picUrlWide:'img/mat/wide/12wide.png'},
    {id: 13, name:'Grekisk souvlaki', fav:false, desc: desc13, steps: steps13, ingridients: ingredients13, cookTime: '40', servings:'4', picUrl:'img/mat/13.png', picUrlWide:'img/mat/wide/13wide.png'},
    {id: 14, name:'Ceasarsallad', fav:false, desc: desc14, steps: steps14, ingridients: ingredients14, cookTime: '30', servings:'2-3', picUrl:'img/mat/14.png', picUrlWide:'img/mat/wide/14wide.png'},
    {id: 15, name:'Ungsstekt falukorv med potatismos', fav:false, desc: desc15, steps: steps15, ingridients: ingredients15, cookTime: '40', servings:'5', picUrl:'img/mat/15.png', picUrlWide:'img/mat/wide/15wide.png'},
    {id: 16, name:'Italiensk pasta med gorgonzolasås', fav:false, desc: desc16, steps: steps16, ingridients: ingredients16, cookTime: '30', servings:'2-3', picUrl:'img/mat/16.png', picUrlWide:'img/mat/wide/16wide.png'},
    {id: 17, name:'Renskavsgryta', fav:false, desc: desc17, steps: steps17, ingridients: ingredients17, cookTime: '40', servings:'4', picUrl:'img/mat/17.png', picUrlWide:'img/mat/wide/17wide.png'},
    {id: 18, name:'Lax med curry och couscous', fav:false, desc: desc18, steps: steps18, ingridients: ingredients18, cookTime: '30', servings:'4', picUrl:'img/mat/18.png', picUrlWide:'img/mat/wide/18wide.png'},
    {id: 19, name:'Gnocchi i tomatsås', fav:false, desc: desc19, steps: steps19, ingridients: ingredients19, cookTime: '30', servings:'3-4', picUrl:'img/mat/19.png', picUrlWide:'img/mat/wide/19wide.png'},
    {id: 20, name:'Falukorv med stuvad blomkål', fav:false, desc: desc20, steps: steps20, ingridients: ingredients20, cookTime: '40', servings:'4-5', picUrl:'img/mat/20.png', picUrlWide:'img/mat/wide/20wide.png'},
    {id: 21, name:'Thailändsk gryta med kyckling', fav:false, desc: desc21, steps: steps21, ingridients: ingredients21, cookTime: '20', servings:'4-5', picUrl:'img/mat/21.png', picUrlWide:'img/mat/wide/21wide.png'},
    {id: 22, name:'Panerad hälleflundra', fav:false, desc: desc22, steps: steps22, ingridients: ingredients22, cookTime: '20', servings:'4-5', picUrl:'img/mat/22.png', picUrlWide:'img/mat/wide/22wide.png'},
    {id: 23, name:'Köttgryta med kokt potatis', fav:false, desc: desc23, steps: steps23, ingridients: ingredients23, cookTime: '20', servings:'4-5', picUrl:'img/mat/23.png', picUrlWide:'img/mat/wide/23wide.png'},
    {id: 24, name:'Kyckling med klyftpotatis och bearnaise', fav:false, desc: desc24, steps: steps24, ingridients: ingredients24, cookTime: '20', servings:'4-5', picUrl:'img/mat/24.png', picUrlWide:'img/mat/wide/24wide.png'},
    {id: 25, name:'Parisare', fav:false, desc: desc25, steps: steps25, ingridients: ingredients25, cookTime: '50', servings:'4-5', picUrl:'img/mat/25.png', picUrlWide:'img/mat/wide/25wide.png'},
    {id: 26, name:'Kyckling med dragon och sommargrönsaker', fav:false, desc: desc26, steps: steps26, ingridients: ingredients26, cookTime: '40', servings:'4-5', picUrl:'img/mat/26.png', picUrlWide:'img/mat/wide/26wide.png'},
    {id: 27, name:'Flygande jakob', fav:false, desc: desc27, steps: steps27, ingridients: ingredients27, cookTime: '45', servings:'5', picUrl:'img/mat/27.png', picUrlWide:'img/mat/wide/27wide.png'}
  ];

  return{
    all: function(){
      return recipes;
    },
    get: function(recipeId){
      return recipes[recipeId];
    },

    getAllFavoriteRecipes: function(){

      var favRecipes = [];

      for(var i = 0; i < recipes.length; i++)
          if(window.localStorage.getItem(recipes[i].id) === 'true')
            favRecipes.push(recipes[i]);
      
      return favRecipes;

    },

    getAllUserRecipes: function(){

        for(var i = 0; i < localStorage.newRecipeCount+1; i++)
            user_recipes.push(JSON.parse(localStorage.getItem(i)));

        return user_recipes;

    },

  }
})

.factory("preload", function($q) {

  return function(url) {

    var deffered, image, service;
    service = {};
    deffered = $q.defer();
    image = new Image();
    image.src = url;

    if (image.complete) {
      deffered.resolve(url);
    } 

    else {
      image.addEventListener('load', function() {
        deffered.resolve(url);
      });
      image.addEventListener("error", function() {
        deffered.reject();
      });
    }
    return deffered.promise;
  };
});



