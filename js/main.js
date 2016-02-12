'use strict';

(function() {

  document.addEventListener('DOMContentLoaded', function() {
    // setBackgroundImage();

    var step = 0;
    // Order by tone
    var colors = [[0,12,39], [18,52,82], [26,71,157], [48,154,187], [54,172,116], [255,128,0]];    
    var colorIndices = [0,1,2,3];

    var randomRGBs = function() {
      var colorSeeds = [
          colors[colorIndices[0]],
          colors[colorIndices[1]],
          colors[colorIndices[2]],
          colors[colorIndices[3]]
      ];

      var istep = 1 - step;
      return [[
          Math.round(istep * colorSeeds[0][0] + step * colorSeeds[1][0]),
          Math.round(istep * colorSeeds[0][1] + step * colorSeeds[1][1]),
          Math.round(istep * colorSeeds[0][2] + step * colorSeeds[1][2])
        ], [
          Math.round(istep * colorSeeds[2][0] + step * colorSeeds[3][0]),
          Math.round(istep * colorSeeds[2][1] + step * colorSeeds[3][1]),
          Math.round(istep * colorSeeds[2][2] + step * colorSeeds[3][2])
        ]
      ];
    };

    setInterval(function() {
      var rgbs = randomRGBs();

      // Some inline style. Why not? :)
      var style = ['#333'];

      // style.push('-webkit-radial-gradient(circle, ellipse cover, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + '), rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + '))');
      style.push('-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ')), color-stop(100%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ')))');
      // style.push('-moz-radial-gradient(center, ellipse cover, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ') 0%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ') 100%)');
      // style.push('-o-radial-gradient(center, ellipse cover, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ') 0%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ') 100%)');
      // style.push('-ms-radial-gradient(center, ellipse cover, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ') 0%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ') 100%)');
      // style.push('radial-gradient(ellipse at center, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ') 0%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ') 100%)');
      
      document.body.style.background = '';

      for (var i = 0; i < style.length; i++) {
        document.body.style.background += style[i];
      };

      step += 0.01;

      if ( step >= 1 ) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[2] = colorIndices[3];
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
      }
    }, 100 );
})();