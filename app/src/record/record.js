(function(){
  'use strict';

  var recordModule = angular.module('record', ['sharedServices', 'keypad']);

  recordModule.directive('recordSidenav', function(){
    return {
      restrict: 'E',
      templateUrl: 'src/record/view/record-sidenav.html',
      replace: true,
      controller: 'recordController',
      controllerAs: 'record',
    }
  });

  recordModule.controller('recordController', ['$scope','$mdDialog', 'dataService', function($scope, $mdDialog, dataService){
    $scope.memberList = dataService.member.list;

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
  }]);

})();
