(function(){
  'use strict';

  var sharedServicesModule = angular.module('sharedServices', ['ngStorage']);

  //共享資料
  sharedServicesModule.factory('dataService', ['$localStorage', function($localStorage){
    var member = {
      nextId: 0,
      list: []
    }

    var record = {
      nextId: 0,
      list: []
    }

    $localStorage.$default({
      member: angular.toJson(member),
      record: angular.toJson(record)
    });

    var color = ['#FF0000', '##FF6600', '##FFCC00', '#008000', '#00BFFF', '#336699', '#551A8B', '#CD00CD'];

    return {
      member: JSON.parse($localStorage.member),
      record: JSON.parse($localStorage.record),
      color: color,
      $localStorage: $localStorage
    }
  }]);

  //jQuery
  sharedServicesModule.factory('$', ['$window', function($window) {
    return $window.$;
  }]);

})();
