(function(){
  'use strict';

  var app = angular.module('record', ['ui.sortable', 'colorPicker']);

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

  app.controller('recordController', function(){
    var receipt = this;

  });

})();
