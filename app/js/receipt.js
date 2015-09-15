(function(){
  'use strict';

  var app = angular.module('receipt', ['ui.sortable', 'colorPicker']);

  app.directive('receiptSidenav', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/receipt/receipt-sidenav.html',
      replace: true,
      require: 'memberSidenav',
      controller: 'receiptController',
      controllerAs: 'receipt',
    }
  });

  app.controller('receiptController', function(){
    var receipt = this;

  });

})();
