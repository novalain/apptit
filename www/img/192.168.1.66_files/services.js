angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('Recipes', function(){

  var recipes = [
    {id: 0, name:'Fläskfile', picUrl:'../img/1.jpg'},
    {id: 1, name:'Bönor', picUrl: '../img/2.jpg'},
    {id: 2, name:'Pannkaka', picUrl: '../img/3.jpg'},
    {id: 3, name:'Kottbollah', picUrl: '../img/4.jpg'},
    {id: 2, name:'Pannkaka', picUrl: '../img/2.jpg'},
    {id: 3, name:'Kottbollah', picUrl: '../img/1.jpg'},
    {id: 2, name:'Pannkaka', picUrl: '../img/4.jpg'},
    {id: 3, name:'Kottbollah', picUrl: '../img/3.jpg'}
  ];

  return{
    all: function(){
      return recipes;
    },
    get: function(recipeId){
      return recipes[recipeId];
    }

  }
});
