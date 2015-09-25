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

  recordModule.directive('summary', function(){
    return {
      restrict: 'E',
      templateUrl: 'src/record/view/summary.html',
      replace: true,
      require: '^recordSidenav',
      controllerAs: 'record',
    }
  });

  recordModule.directive('recordList', function(){
    return {
      restrict: 'E',
      templateUrl: 'src/record/view/record-list.html',
      replace: true,
      require: '^recordSidenav',
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
    };
    $scope.checkboxes = [];
    $scope.currId = -1;

    //abbreviation
    var memberList = $scope.memberList;
    var recordList = $scope.recordList;
    var record = $scope.record;
    var checkboxes = $scope.checkboxes;
    var nextId = dataService.record.nextId;

    //local variable
    var summary = {
      total: 0,
      max: 0,
      member: []
    };

    //local function
    function getTotalExpense() {
      var sum = 0;
      for(var i=0; i<recordList.length; i++){
        sum = sum + recordList[i].amount;
      }

      return sum;
    }

    function getExpenseOf(id) {
      var sum = 0;

      for(var i=0; i<recordList.length; i++){
        if(recordList[i].payers.indexOf(id) !== -1)
          sum = sum + recordList[i].amount/recordList[i].payers.length;
      }

      return sum;
    }

    function getDebtOf(id) {
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
      $scope.currId = -1;
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
      if($scope.currId === -1){
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

    $scope.delete = function() {
      for(var i=0; i<recordList.length; i++) {
        if(recordList[i].id == $scope.currId) {
          recordList.splice(i, 1);
          break;
        }
      }
    };

    /*summary, record-list*/

    $scope.$watch('recordList', function(newValue, oldValue) {
      summary.total = getTotalExpense();

      summary.member.length = 0;
      for(var i=0; i<memberList.length; i++){
        var expense = getExpenseOf(memberList[i].id);
        var debt = getDebtOf(memberList[i].id);

        summary.member.push({
          id: memberList[i].id,
          expense: expense,
          debt: debt,
        });

        if(debt >= 0){
          if(expense > summary.max)
            summary.max = expense;
        }
        else{
          if(expense-debt > summary.max)
            summary.max = expense-debt;
        }
      }
    }, true);

    $scope.set = function(id) {
      var result = $.grep(recordList, function(e){ return e.id === id; });

      $scope.currId = id;
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

    $scope.isPayer = function(index, id) {
      if(recordList[index].payers.indexOf(id) !== -1)
        return true;
      else
        return false;
    }

    $scope.getTotalExpense = function() {
      return getTotalExpense();
    }

    $scope.outerStyle = function(id) {
      var result = $.grep(summary.member, function(e){ return e.id === id; });
      var expense = result[0].expense;
      var debt = result[0].debt;

      if(expense > 0){
        return {
          width: (result[0].expense/summary.max)*100 + "%"
        }
      }
      else{
        return {
          width: "100%",
          "background-color": "transparent"
        }
      } 
    }

    $scope.innerStyle = function(id, color) {
      var result = $.grep(summary.member, function(e){ return e.id === id; });
      var expense = result[0].expense;
      var debt = result[0].debt;

      if(expense > 0){
        return {
          width: ((result[0].expense-result[0].debt)/result[0].expense)*100 + "%",
          "background-color": color
        }
      }
      else{
        return {
          width: (0 - result[0].debt/summary.max)*100 + "%",
          "background-color": color
        }
      }
    }

    $scope.getSummaryOf = function(id) {
      var result = $.grep(summary.member, function(e){ return e.id === id; });
      var expense = result[0].expense;
      var debt = result[0].debt;

      return (expense-debt) + "/" + expense;
    }
    
  }]);

})();
