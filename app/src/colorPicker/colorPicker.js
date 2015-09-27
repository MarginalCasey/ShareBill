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
    
    picker.colors = ['#FF0000', '##FF6600', '##FFCC00', '#008000', '#00BFFF', '#336699', '#551A8B', '#CD00CD'];
  }

})();
