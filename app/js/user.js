(function(){
  'use strict';

  var app = angular.module('user', ['ui.sortable', 'colorPicker']);

  app.controller('UserController', function(){
    var user = this;

    user.nextId = 0;
    user.list = [];
    user.currName = '';
    user.currColor = 'transparent';

    //排序的參數設定
    user.sortableOptions = {
      axis: 'y',
      containment: "parent",
      handle: 'md-icon',
      tolerance: "pointer",
      revert: 200
    };

    user.create = function() {
      user.list.push({
        id: user.nextId,
        name: user.currName,
        color: user.currColor
      });

      user.nextId++;
    }

    user.reset = function() {
      user.currName = '';
      user.currColor = 'transparent';
    }
  });

  app.directive('userList', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/user-list.html',
      replace: true,
      require: '^userSidenav',
      controllerAs: 'user',
    }
  });

  app.directive('userSidenav', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/user-sidenav.html',
      replace: true,
      controller: 'UserController',
      controllerAs: 'user',
    }
  });

})();
