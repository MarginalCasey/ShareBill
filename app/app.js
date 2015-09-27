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
    ui.record_is_open = false;

    ui.switchToTab = function(index) {
      var prevTab = ui.currentTab;

      ui.currentTab = index;

      if(prevTab === 1)
        ui.returnToSummary();
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

    /*summary*/

    ui.switchFab = false;
    ui.summary_is_open = true;
    ui.summaryOf = [];
    ui.recordListOf = [];

    ui.showRecordOf = function(index) {
      ui.switchFab = true;
      ui.summary_is_open = false;
      ui.recordListOf[index] = true; 
      
      for(var i = 0; i < ui.summaryOf.length; i++){
        if(i !== index)
          ui.summaryOf[i] = false;
      }
    }

    ui.returnToSummary = function() {
      ui.switchFab = false;
      ui.summary_is_open = true;

      for(var i = 0; i < ui.summaryOf.length; i++){
        ui.summaryOf[i] = true;
      }

      for(var i = 0; i < ui.recordListOf.length; i++){
        ui.recordListOf[i] = false;
      }
    }
  }

})();
