(function(){
  'use strict';

  var recordModule = angular.module('record', ['sharedServices', 'keypad']);

  recordModule.directive('summary', function(){
    return {
      restrict: 'E',
      templateUrl: 'src/record/view/summary.html',
      replace: true,
      require: '^recordSidenav',
      controllerAs: 'record',
    }
  });

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
    $scope.recordList = dataService.record.list;
    $scope.record = {
      id: nextId,
      amount: 0,
      payers: [],
      payed: [],
      description: ''
    }
    $scope.checkboxes = [];

    var memberList = $scope.memberList;
    var recordList = $scope.recordList;
    var record = $scope.record;
    var checkboxes = $scope.checkboxes;
    var nextId = dataService.record.nextId;
    var currId = -1;

    /*record-sidenav*/

    $scope.check = function(index, id) {
      if(checkboxes[index] === true)
        record.payers.push(id);
      else{
        var i = record.payers.indexOf(id);
        record.payers.splice(i, 1);
      }
    };

    $scope.getAverage = function() {
      if(record.payers.length == 0)
        return record.amount;
      else
        return record.amount/record.payers.length;
    };

    $scope.getBalance = function() {
      var payed = 0;

      for(var i = 0; i < record.payed.length; i++) {
        payed = payed + record.payed[i].amount;
      }

      return record.amount - payed;
    };

    $scope.getAmount = function(id) {
      var result = $.grep(record.payed, function(e){ return e.id === id; });

      if(result.length === 0)
        return 0;
      else
        return result[0].amount;
    };

    $scope.showKeypad = function(ev, id) {
      $mdDialog.show({
        templateUrl: 'src/keypad/view/keypad.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false,
        focusOnOpen: false
      })
      .then(function (output) {
        if(id === -1){
          record.amount = output;
        }
        else{
          var result = $.grep(record.payed, function(e){ return e.id === id; });

          if(result.length === 0){
            record.payed.push({
              id: id,
              amount: output
            });
          }
          else{
            result[0].amount = output;
          }
        }
      }, function() {
        
      });
    };

    $scope.reset = function() {
      currId = -1;
      record.id = nextId;
      record.amount = 0;
      record.payers = [];
      record.payed = [];
      record.description = '';

      for(var i=0; i<memberList.length; i++){
        checkboxes[i] = false;
      }
    };

    $scope.update = function() {
      if(currId === -1){
        recordList.push({
          id: record.id,
          amount: record.amount,
          payers: record.payers,
          payed: record.payed,
          description: record.description
        });

        nextId++;
      }
      else {
        var result = $.grep(recordList, function(e){ return e.id === record.id; });
        
        result[0].amount = record.amount;
        result[0].description = record.description;

        result[0].payers.length = 0;
        for(var i=0; i<record.payers.length; i++){
          result[0].payers[i] = record.payers[i];
        }

        result[0].payed.length = 0;
        for(var i=0; i<record.payed.length; i++){
          result[0].payed[i] = record.payed[i];
        }
      } 
    };

    /*summary, record-list*/

    $scope.set = function(id) {
      var result = $.grep(recordList, function(e){ return e.id === id; });

      currId = id;
      record.id = result[0].id;
      record.amount = result[0].amount;
      record.description = result[0].description;

      for(var i=0; i<result[0].payers.length; i++){
        record.payers[i] = result[0].payers[i]
      }

      for(var i=0; i<result[0].payed.length; i++){
        record.payed[i] = {
          id: result[0].payed[i].id,
          amount: result[0].payed[i].amount,
        };
      }

      for(var i=0; i<memberList.length; i++){
        checkboxes[i] = false;
      }
      for(var i=0; i<record.payers.length; i++){
        for(var j=0; j<memberList.length; j++){
          if(memberList[j].id === record.payers[i]){
            checkboxes[j] = true;
            break;
          }
        }
      }
    };

    $scope.getTotalExpense = function() {
      var sum = 0;
      for(var i=0; i<recordList.length; i++){
        sum = sum + recordList[i].amount;
      }

      return sum;
    }

    $scope.getExpenseOf = function(id) {
      var sum = 0;

      for(var i=0; i<recordList.length; i++){
        if(recordList[i].payers.indexOf(id) !== -1)
          sum = sum + recordList[i].amount/recordList[i].payers.length;
      }

      return sum;
    }

    $scope.getDebtOf = function(id) {
      var sum = 0;
      var payed = 0;

      for(var i=0; i<recordList.length; i++){
        if(recordList[i].payers.indexOf(id) !== -1)
          sum = sum + recordList[i].amount/recordList[i].payers.length;
      }

      for(var i=0; i<recordList.length; i++){
        var result = $.grep(recordList[i].payed, function(e){ return e.id === id; });
        if(result.length === 1)
          payed = payed + result[0].amount;
      }

      return sum - payed;
    }

    $scope.isPayer = function(index, id) {
      if(recordList[index].payers.indexOf(id) !== -1)
        return true;
      else
        return false;
    }

  }]);

})();
