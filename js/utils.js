'use strict';

function getRandomInRange( min, max ) {
  min = ( min === undefined ) ? 0 : checkFn( min );
  max = ( max === undefined ) ? 0 : checkFn( max );

  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

function toggleVisibility(classes) {
  return classes.indexOf('visible') !== -1
        ? classes.replace('visible', 'hidden')
        : classes.replace('hidden', 'visible');
}

function getScreenDimentions(part) {
  part = (part === undefined) ? 100 : part;

  return {
    width:  screen.width  / 100 * part.left,
    height: screen.height / 100 * part.top
  };
}