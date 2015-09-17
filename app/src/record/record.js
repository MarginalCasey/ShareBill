(function(){
  'use strict';

  var app = angular.module('record', ['keypad']);

  app.directive('recordSidenav', function(){
    return {
      restrict: 'E',
      templateUrl: 'src/record/view/record-sidenav.html',
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
        templateUrl: 'src/keypad/view/keypad.html',
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
