(function(){
  'use strict';

  var app = angular.module('user', ['ui.sortable', 'colorPicker']);

  app.controller('UserController', function(){
    var user = this;

    user.nextId = 0;
    user.list = [];

    user.currIndex = '';
    user.currName = '';
    user.currColor = 'transparent';

    /*排序的參數設定*/
    user.sortableOptions = {
      axis: 'y',
      containment: "parent",
      handle: 'md-icon',
      tolerance: "pointer",
      revert: 200
    };

    user.update = function() {
      //新增user
      if(user.currIndex === '') {
        user.list.push({
          id: user.nextId,
          name: user.currName,
          color: user.currColor
        });

        user.nextId++;
      }
      //修改user
      else {
        user.list[user.currIndex].name = user.currName;
        user.list[user.currIndex].color = user.currColor;

        user.currIndex = '';
      }
    };

    user.delete = function() {
      user.list.splice(user.currIndex, 1);
      user.currIndex = '';
    };

    user.set = function(index) {
      user.currIndex = index;
      user.currName = user.list[index].name;
      user.currColor = user.list[index].color;
    };

    user.reset = function() {
      user.currIndex = '';
      user.currName = '';
      user.currColor = 'transparent';
    };
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
