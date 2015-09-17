(function(){
  'use strict';

  var app = angular.module('shareBill', ['ngMaterial', 'member', 'record']);

  app.config(function ($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('red');
  });

  app.directive('mainContent', function(){
    return {
      restrict: 'E',
      templateUrl: 'main-content.html',
      replace: true,
      controller: UiController,
      controllerAs: 'ui',
    }
  });

  function UiController() {
    var ui = this;
    
    ui.currentTab = 0;
    ui.member_is_open = false;
    ui.receipr_is_open = false;

    ui.switchToTab = function(index) {
      ui.currentTab = index;
    };

    ui.showSideNav = function() {
      if(ui.currentTab === 0) {
        ui.member_is_open = true;
      }
      else {
        ui.record_is_open = true;
      }
    };

    ui.closeSideNav = function() {
      if(ui.currentTab === 0) {
        ui.member_is_open = false;
      }
      else {
        ui.record_is_open = false;
      }
    };

  }

})();
