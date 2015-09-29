(function(){
  'use strict';

  var sharedServicesModule = angular.module('sharedServices', []);

  //共享資料
  sharedServicesModule.factory('dataService', function(){
    var member = {
      nextId: 0,
      list: []
    }

    var record = {
      nextId: 0,
      list: []
    }

    var color = ['#FF0000', '##FF6600', '##FFCC00', '#008000', '#00BFFF', '#336699', '#551A8B', '#CD00CD'];

    return {
      member: member,
      record: record,
      color: color
    }
  });

  //jQuery
  sharedServicesModule.factory('$', ['$window', function($window) {
    return $window.$;
  }]);

})();
