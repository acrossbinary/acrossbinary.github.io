// La "cosa" che ha fatto il buon Mario:
// http://codepen.io/quasimondo/pen/lDdrF

'use strict';

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var step = 0;
    // Order by tone
    var colors = [[0,12,39], [18,52,82], [26,71,157], [48,154,187], [54,172,116], [255,128,0]];
    
    var colorIndices = [0,1,2,3];

    var rgb2hex = function (rgb){
     rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
     return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    };

    var randomRGBs = function(step, colorIndices, colors) {
      // Array with base colors
      var colorSeeds = [
          colors[colorIndices[0]],
          colors[colorIndices[1]],
          colors[colorIndices[2]],
          colors[colorIndices[3]]
      ];

      // A Fucking decimal number
      var istep = 1 - step;
      
      // A fucking matrix with 2 Rgbs generate by a fucking random number
      return [
              [
                Math.round(istep * colorSeeds[0][0] + step * colorSeeds[1][0]),
                Math.round(istep * colorSeeds[0][1] + step * colorSeeds[1][1]),
                Math.round(istep * colorSeeds[0][2] + step * colorSeeds[1][2])
              ],
              [
                Math.round(istep * colorSeeds[2][0] + step * colorSeeds[3][0]),
                Math.round(istep * colorSeeds[2][1] + step * colorSeeds[3][1]),
                Math.round(istep * colorSeeds[2][2] + step * colorSeeds[3][2])
              ]
            ];
    };

    setInterval(function() {

      // Generate 2 rgb colors
      var rgbs = randomRGBs(step, colorIndices, colors);

      // Oh, wow! It seems that IE does not support rgb for gradient! Yeaah! Fuck off.
      var hex1 = rgb2hex('rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ')');
      var hex2 = rgb2hex('rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ')');

      // Some inline style. Why not? :)
      var style = ['#333'];
      
      /*
      * SVILUPPO - MIKI - ATTENZIONE
      * Valutare il navigatore ed includere solo la regola di compatibilità giusta
      * var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
      * Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
      * var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
      * var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
      * // At least Safari 3+: "[object HTMLElementConstructor]"
      * var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
      * var isIE = /*@cc_on!@false || !!document.documentMode; // At least IE6
      */

      style.push('-moz-radial-gradient(center, ellipse cover, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ') 0%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ') 100%)');
      style.push('-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ')), color-stop(100%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ')))');
      style.push('-webkit-radial-gradient(circle, ellipse cover, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + '), rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + '))');
      style.push('-o-radial-gradient(center, ellipse cover, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ') 0%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ') 100%)');
      style.push('-ms-radial-gradient(center, ellipse cover, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ') 0%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ') 100%)');
      style.push('radial-gradient(ellipse at center, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ') 0%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ') 100%)');
      style.push('progid:DXImageTransform.Microsoft.gradient( startColorstr=' + hex1 + ', endColorstr=' + hex2 + ', GradientType=1 )');

      // Set the fucking inline style to body
      document.body.style.background = '';
      for (var i = 0; i < style.length; i++) {
        document.body.style.background += style[i];
      };

      // Increment the fucking counter
      step += 0.01;

      // Mario told me to do this kind of "magic"
      // the secrets of js: you think that step is equal to 1, but... uhm.. this is magic! No explain!
      if ( step >= 1 ) {
        step %= 1; // nice try

        // Change the index of color for generate some random rgb. Just have fun while do this.
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      }
    }, 100 );
  });
})();

