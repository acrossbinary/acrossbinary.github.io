'use strict';

/*
 * -------------------------------------------------
 * TODO: Move all this stuff to a module
 *       according to the standards of ECMAScript 6
 * -------------------------------------------------
 */

function setBackgroundImage() {

  // Returns a valid RGB color code:
  var getColor = function(code) {
    var rgb = Math.round(code);
    return (rgb > 255) ? 255 : rgb;
  },

  // Returns an RGBA string (with alpha = 1):
  getBackgroundColor = function(rgb) {
    var rgba = 'rgba(';

    for (var i = 0; i < 3; i++) {
      rgba += rgb[i] + ',';
    }

    return rgba + '1)';
  },

  step = 0,

  // Utils array:
  colorIndices = [0, 1],
  
  // RGB colors for different backgound shades:
  colors = [[62,  35, 255], [ 60, 255,  60], [255,  35, 98],
            [45, 175, 230], [255,   0, 255], [255, 128,  0]];

  // Main page background will change
  // according to this interval function:
  setInterval(function() {
    var currStep = 1 - step,
        shades   = [colors[colorIndices[0]], colors[colorIndices[1]]],
        rgb      = [getColor(currStep * shades[0][0] + step * shades[1][0]),
                    getColor(currStep * shades[0][1] + step * shades[1][1]),
                    getColor(currStep * shades[0][2] + step * shades[1][2])];

    step += .01;

    // Sets the current shade background color:
    document.body.style.backgroundColor = getBackgroundColor(rgb);

    // Background shade update:
    if (step >= 1) {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * 5)) % 6;
    }
  }, 100);
}
