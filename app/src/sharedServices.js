(function(){
  'use strict';

  var sharedServicesModule = angular.module('sharedServices', []);

  sharedServicesModule.factory('dataService', function(){
    var member = {
      nextId: 3,
      list: [
        {name: '張文源', color: 'red', id: 0},
        {name: 'Casey Chang', color: 'yellow', id: 1},
        {name: '地表最帥的男人', color: 'green', id: 2}
      ]
    }

    return {
      member: member
    }
  });

})();
