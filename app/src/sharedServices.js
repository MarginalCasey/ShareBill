(function(){
  'use strict';

  var sharedServicesModule = angular.module('sharedServices', []);

  //共享資料
  sharedServicesModule.factory('dataService', function(){
    var member = {
      nextId: 3,
      list: [
        {id: 0, name: '張文源', color: 'red'},
        {id: 1, name: 'Casey Chang', color: 'yellow'},
        {id: 2, name: '地表最帥的男人', color: 'green'}
      ]
    }

    var record = {
      nextId: 3,
      list: [
        {id: 0, amount: 100, payers: [0, 2], payed: [{id: 0, amount: 50}, {id: 1, amount: 50}], description: '宜蘭蔥餅'},
        {id: 1, amount: 200, payers: [0, 2], payed: [{id: 1, amount: 50}], description: '愛玉'},
        {id: 2, amount: 150, payers: [0, 2], payed: [{id: 2, amount: 100}], description: '羊肉湯'},
      ]
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
