'use strict';

function setBackgroundImage() {

  // Main Page Element:
  var app = document.getElementById('app'),

  // Returns a valid RGB color code:
  getColor = function(code) {
    var rgb = Math.round(code);
    return (rgb > 255) ? 255 : rgb;
  },

  // Returns an RGBA string (with alpha = 1):
  getRGBColor = function(rgb) {
    var rgbString = 'rgba(';
    for (var i = 0; i < 3; i++) {
      rgbString += rgb[i] + ',';
    }

    return rgbString + '1)';
  },

  // Returns a lighter share for passed RGB color:
  getColorShade = function(color) {
    var c = [3],
    rgbCase = function(index, code) {
      switch (index) {
        case 0: return code;
        case 1: return code * 1.223880597;
        case 2: return code * 1.256756756;
      }
    };

    for (var i = 0; i < 3; i++) {
      c[i] = getColor(rgbCase(i, color[i]));
    }

    return c;
  },

  // Returns a CSS linear-gradient background rule:
  getGradientColor = function(browser, style, color, shade) {
    var gradient = browser + 'linear-gradient(' + style + ', ';
    color = getRGBColor(color);

    for (var i = 0; i < 3; i++) {
      gradient += color + ((i === 2) ? ' 5%, ' : ' 0%, ');
    }

    return gradient + shade + ' 95%)';
  },

  step = 0,
  colorIndices = [0, 1],
  gradientSpeed = 0.002,
  colors = [[62,  35, 255], [ 60, 255,  60], [255,  35, 98],
            [45, 175, 230], [255,   0, 255], [255, 128,  0]];

  setInterval(function() {
    var currStep = 1 - step,
        c0_0 = colors[colorIndices[0]],
        c0_1 = colors[colorIndices[1]],

        rgb = [
          getColor(currStep * c0_0[0] + step * c0_1[0]),
          getColor(currStep * c0_0[1] + step * c0_1[1]),
          getColor(currStep * c0_0[2] + step * c0_1[2])
        ];

    step += gradientSpeed;
    app.style.background = getGradientColor('-webkit-', 'top', rgb, getRGBColor(getColorShade(rgb)));

    if (step >= 1) {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * 5)) % 6;
    }
  }, 10);
}

// background: linear-gradient(to bottom,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);
// background: -o-linear-gradient(top,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);
// background: -ms-linear-gradient(top,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);
// background: -moz-linear-gradient(top,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);
// background: -webkit-linear-gradient(top,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);

// POSSIBILITIES:

// background: linear-gradient(135deg,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);
// background: -o-linear-gradient(-45deg,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);
// background: -ms-linear-gradient(-45deg,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);
// background: -moz-linear-gradient(-45deg,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);
// background: -webkit-linear-gradient(-45deg,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);

// background: radial-gradient(ellipse at center,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);
// background: -o-radial-gradient(center,  ellipse cover,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);
// background: -ms-radial-gradient(center,  ellipse cover,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);
// background: -moz-radial-gradient(center,  ellipse cover,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);
// background: -webkit-radial-gradient(center,  ellipse cover,  rgba(0, 67, 148, 1) 0%,  rgba(0, 67, 148, 0.99) 0%,  rgba(0, 67, 148, 0.99) 15%,  rgba(0, 127, 224, 0.99) 85%);
