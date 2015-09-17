(function(){
  'use strict';

  var app = angular.module('colorPicker', []);

  app.directive('colorPicker', function(){
    return {
      restrict: 'E',
      templateUrl: 'src/colorPicker/view/color-picker.html',
      replace: true,
      controller: PickerController,
      controllerAs: 'picker',
    }
  });

  function PickerController() {
    var picker = this;
    
    picker.colors = ['#DDB959', '#D54344', '#D774A2', '#EE8860', '#9783B8', '#0A0917'];
  }

})();
