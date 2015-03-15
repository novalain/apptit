
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])


.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('recipes', {
      url: '/recipes',
      views: {
          'mainView': {
          templateUrl: 'templates/recipes.html',
          controller: 'RecipesCtrl'
        }
      }
    })

    .state('new-recipe', {
      url: '/recipes/new-recipe',
      views: {
          'mainView': {
          templateUrl: 'templates/new-recipe.html',
          controller: 'NewRecipeCtrl'
        }
      }
    })

    .state('recipe-detail', {
      url: "/recipes/:recipeId",
      views: {
          'mainView': {
          templateUrl: "templates/recipe-detail.html",
          controller:'RecipeDetailCtrl'
        }
      }
    })

    .state('recipe-detail-user', {
      url: "/recipes-user/:recipeId",
      views: {
          'mainView': {
          templateUrl: "templates/recipe-detail-user.html",
          controller:'RecipeUserDetailCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/recipes');

})


.directive('imageonload', function() {
    return {
        restrict: 'A',

        link: function(scope, element) {

          element.on('load', function() {
            // Set visibility: true + remove spinner overlay
              element.removeClass('spinner-hide');
              element.addClass('spinner-show');
              element.parent().find('span').remove();

              document.getElementById("picTextContainer" + scope.recipe.id).style.display = "block";
              if(document.getElementById("picTextContainer_user" + scope.recipe.id))
                document.getElementById("picTextContainer_user" + scope.recipe.id).style.display = "block";
          });
          scope.$watch('ngSrc', function() {
            // Set visibility: false + inject temporary spinner overlay
              element.addClass('spinner-hide');
          });
        }
    };
})


.directive('headerShrink', function($document) {
    var fadeAmt;

    var shrink = function(tabs, tabs_amt, subHeader, header, amt, dir) {

      header = document.getElementById("navBar");

      ionic.requestAnimationFrame(function() {
        // Threshold is equal to bar-height
        var threshold = 44;
        // Scrolling down
        if(dir === 1) {
          var _amt = Math.min(threshold, amt - threshold);
        }

        // Scrolling up
        else if(dir === -1) {
          var _amt = Math.max(0, amt - threshold);
        }
        // The translation amounts should never be negative
        _amt = _amt < 0 ? 0 : _amt;
        amt = amt < 0 ? 0 : amt;
        tabs_amt = tabs_amt < 0 ? 0 : tabs_amt;
        // Re-position the header
        header.style[ionic.CSS.TRANSFORM] = 'translate3d(0,-' + _amt + 'px, 0)';
        fadeAmt = 1 - _amt / threshold;
        for(var i = 0, j = header.children.length; i < j; i++) {
          header.children[i].style.opacity = fadeAmt;
        }

        // Re-position the sub-header

       // $('input').toggleClass('force-redraw');
        document.getElementById("input").blur();

        subHeader.style[ionic.CSS.TRANSFORM] = 'translate3d(0,-' + amt + 'px, 0)';
        // Re-position the tabs
        tabs.style[ionic.CSS.TRANSFORM] = 'translate3d(0,' + tabs_amt + 'px, 0)';
      });
    };

    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {
        var starty = 0;
        var shrinkAmt;
        var tabs_amt;
        // Threshold is equal to bar-height + create-post height;
        var threshold = 88;
        // header
        var header = $document[0].body.querySelector('.bar-header');
        // sub-header
        var subHeader = $document[0].body.querySelector('.bar-subheader');
        var headerHeight = header.offsetHeight;
        var subHeaderHeight = subHeader.offsetHeight;
        // tabs
        var tabs = $document[0].body.querySelector('.tabs');
        var tabsHeight = tabs.offsetHeight;

        var prev = 0
        var delta = 0
        var dir = 1
        var prevDir = 1
        var prevShrinkAmt = 0;
        var prevTabsShrinkAmt = 0;

        $element.bind('scroll', function(e) {
          // if negative scrolling (eg: pull to refresh don't do anything)
          if(e.detail.scrollTop < 0)
            return false;
          // Scroll delta
          delta = e.detail.scrollTop - prev;
          // Claculate direction of scrolling
          dir = delta >= 0 ? 1 : -1;
          // Capture change of direction
          if(dir !== prevDir)
            starty = e.detail.scrollTop;
          // If scrolling up
          if(dir === 1) {
            // Calculate shrinking amount
            shrinkAmt = headerHeight + subHeaderHeight - Math.max(0, (starty + headerHeight + subHeaderHeight) - e.detail.scrollTop);
            // Calculate shrinking for tabs
            tabs_amt = tabsHeight - Math.max(0, (starty + tabsHeight) - e.detail.scrollTop);
            // Start shrink
            shrink(tabs, tabs_amt, subHeader, header, Math.min(threshold, shrinkAmt), dir);
            // Save prev shrink amount
            prevShrinkAmt = Math.min(threshold, shrinkAmt);
            prevTabsShrinkAmt = Math.min(tabsHeight, tabs_amt);
          }
          // If scrolling down
          else {
            // Calculate expansion amount
            shrinkAmt = prevShrinkAmt - Math.min(threshold, (starty - e.detail.scrollTop));
            // Calculate shrinking for tabs
            tabs_amt = prevTabsShrinkAmt - Math.min(tabsHeight, (starty - e.detail.scrollTop));
            // Start shrink
            shrink(tabs, tabs_amt, subHeader, header, shrinkAmt, dir);
          }
          // Save prev states for comparison
          prevDir = dir;
          prev = e.detail.scrollTop;
        });
      }
    }
  });
