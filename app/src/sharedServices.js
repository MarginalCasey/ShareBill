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

    return {
      member: member,
      record: record
    }
  });

  //jQuery
  sharedServicesModule.factory('$', ['$window', function($window) {
    return $window.$;
  }]);

})();
