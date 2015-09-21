(function(){
  'use strict';

  var app = angular.module('member', ['ui.sortable', 'sharedServices', 'colorPicker']);

  app.directive('memberList', function(){
    return {
      restrict: 'E',
      templateUrl: 'src/member/view/member-list.html',
      replace: true,
      require: '^memberSidenav',
      controllerAs: 'member',
    }
  });

  app.directive('memberSidenav', function(){
    return {
      restrict: 'E',
      templateUrl: 'src/member/view/member-sidenav.html',
      replace: true,
      controller: 'memberController',
      controllerAs: 'member',
    }
  });

  app.controller('memberController', ['dataService', function(dataService){
    var member = this;

    member.nextId = dataService.member.nextId;
    member.list = dataService.member.list;
    
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
  }]);

})();
