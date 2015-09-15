(function(){
  'use strict';

  var app = angular.module('record', ['keypad']);

  app.directive('recordSidenav', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/record/record-sidenav.html',
      replace: true,
      require: 'memberSidenav',
      controller: 'recordController',
      controllerAs: 'record',
    }
  });

  app.controller('recordController', function($mdDialog){
    var record = this;

    record.amount = 0.00;

    record.showKeypad = function(ev) {
      $mdDialog.show({
        templateUrl: 'partials/keypad/keypad.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        focusOnOpen: false
      })
      .then(function(number) {
        record.amount = number;
      }, function() {
        
      });
    };
  });

})();
