(function(){
  'use strict';

  var app = angular.module('colorPicker', ['sharedServices']);

  app.directive('colorPicker', function(){
    return {
      restrict: 'E',
      templateUrl: 'src/colorPicker/view/color-picker.html',
      replace: true,
      controller: PickerController,
      controllerAs: 'picker',
    }
  });

  function PickerController(dataService) {
    var picker = this;
    
    picker.colors = dataService.color;
  }

})();
