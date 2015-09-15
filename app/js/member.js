(function(){
  'use strict';

  var app = angular.module('member', ['ui.sortable', 'colorPicker']);

  app.directive('memberList', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/member/member-list.html',
      replace: true,
      require: '^memberSidenav',
      controllerAs: 'member',
    }
  });

  app.directive('memberSidenav', function(){
    return {
      restrict: 'E',
      templateUrl: 'partials/member/member-sidenav.html',
      replace: true,
      controller: 'memberController',
      controllerAs: 'member',
    }
  });

  app.controller('memberController', function(){
    var member = this;

    /*member.nextId = 0;
    member.list = [];*/

    member.nextId = 3;
    member.list = [
      {name: '張文源', color: 'red'},
      {name: 'Casey Chang', color: 'yellow'},
      {name: '地表最帥的男人', color: 'green'}
    ];

    member.currIndex = '';
    member.currName = '';
    member.currColor = 'transparent';

    /*排序的參數設定*/
    member.sortableOptions = {
      axis: 'y',
      containment: "parent",
      handle: 'md-icon',
      tolerance: "pointer",
      revert: 200
    };

    member.update = function() {
      //新增member
      if(member.currIndex === '') {
        member.list.push({
          id: member.nextId,
          name: member.currName,
          color: member.currColor
        });

        member.nextId++;
      }
      //修改member
      else {
        member.list[member.currIndex].name = member.currName;
        member.list[member.currIndex].color = member.currColor;

        member.currIndex = '';
      }
    };

    member.delete = function() {
      member.list.splice(member.currIndex, 1);
      member.currIndex = '';
    };

    member.set = function(index) {
      member.currIndex = index;
      member.currName = member.list[index].name;
      member.currColor = member.list[index].color;
    };

    member.reset = function() {
      member.currIndex = '';
      member.currName = '';
      member.currColor = 'transparent';
    };
  });

})();
