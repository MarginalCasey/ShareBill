(function(){
  'use strict';

  var app = angular.module('keypad', []);

  app.controller('KeypadController', function($mdDialog){
    var keypad = this;
    
    keypad.result = 0;
    keypad.decimalPlaces = 2;


    var mode = 'int';
    var integer = 0;
    var decimal = 0;
    var multiplier = Math.pow(10, keypad.decimalPlaces);
    //小數點位數
    var pointer = 1;


    keypad.click = function(button) {
      switch(button) {
        case 'backspace':
          if(mode == 'int')
            integer = Math.floor(integer/10);
          else if(pointer == 1) {
            integer = Math.floor(integer/10);
            mode = 'int';
            pointer = 1;
          }
          else {
            decimal = Math.floor(decimal*Math.pow(10, pointer-2)) / Math.pow(10, pointer-2);
            pointer--;
          }
          break;

        case '.':
          mode = 'dec';
          break;

        default: 
          if(mode == 'int')
            integer = integer*10 + button;
          else if(pointer <= keypad.decimalPlaces){
            decimal = decimal + button/Math.pow(10, pointer);
            pointer++;
          } 
          break;
      }

      keypad.result = integer + decimal;
    };

    keypad.enter = function() {
      $mdDialog.hide(keypad.result);
    };

    keypad.cancel = function() {
      $mdDialog.cancel();
    };
  });

})();
