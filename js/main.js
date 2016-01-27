'use strict';

function toggleVisibility(classes) {
  return classes.indexOf('visible') !== -1
        ? classes.replace('visible', 'hidden')
        : classes.replace('hidden', 'visible');
}

function toggleForeground() {
  var body = document.getElementsByTagName('body')[0];
  var opacity = 0.1;
  if(body.getAttribute('data-foreground')) {
    opacity = 1;
    body.removeAttribute('data-foreground');
  }else{
    body.setAttribute('data-foreground', '1');
  }
  
  var elements = document.querySelectorAll('body > div > *');
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.opacity = opacity;
  };

}

(function() {
  function animateBalls(orbs, position) {
    var pos = [], currPos = [], onPlace = [];

    for (var i = 0; i < orbs.length; i++) {
      pos.push(getScreenDimentions(position[i]));
      onPlace.push({h0: null, h1: null, w0: null, w1: null});
    }

    // Una si fa finire direttamente qui:
    for (var i = 0; i < pos.length; i++) {
      currPos.push({
        height: parseInt(getComputedStyle(orbs[i]).top.replace('px', '')),
        width: parseInt(getComputedStyle(orbs[i]).left.replace('px', ''))
      });

      // orbs[i].style.top  = pos[i].height + 'px';
      // orbs[i].style.left = pos[i].width  + 'px';
    }

    // Questa e' l'altra:
    var interval = setInterval(function() {
      var i;

      for (i = 0; i < orbs.length; i++) {

        if (currPos[i].height > pos[i].height) {
          onPlace[i].h1 = false;
          currPos[i].height -= 2;
          orbs[i].style.top = currPos[i].height + 'px';
        } else if (currPos[i].height < pos[i].height) {
          onPlace[i].h1 = true;
          currPos[i].height += 2;                       
          orbs[i].style.top = currPos[i].height + 'px';
        }

        if (currPos[i].width > pos[i].width) {
          onPlace[i].w1 = false;
          currPos[i].width -= 2;
          orbs[i].style.left = currPos[i].width + 'px';
        } else if (currPos[i].width < pos[i].width) {
          onPlace[i].w1 = true;
          currPos[i].width += 2;
          orbs[i].style.left = currPos[i].width + 'px';
        }

        // First Lap:
        if (onPlace[i].h0 === null) {
          onPlace[i].h0 = onPlace[i].h1;
          onPlace[i].w0 = onPlace[i].w1;
        } else if (i === orbs.length - 1) {
          for (var j = 0; j < orbs.length; j++) {
            if (onPlace[j].h0 !== onPlace[j].h1 || onPlace[j].w0 !== onPlace[j].w1) {
              if (j === orbs.length - 1) clearInterval(interval);
            } else break;
          }
        }
      }
    }, 16 );
  }


  function setStorieshandler() {
    var clusters = document.getElementsByClassName('cluster');

    for (var i = 0; i < clusters.length; i++) {
      clusters[i].addEventListener('click', function(event) {
        event.preventDefault();
        
        toggleForeground();

        var cluster = this;
        var nochilds = false;
        
        // Se nel cluster non ho vanishOut, vuol dire che è già esploso
        // e devo nasconderlo
        // SVILUPPO => Aggiugnere display none al termine dell'animazione e display block a vanishIn
        if(cluster.className.indexOf('vanishOut') === -1) {
          cluster.classList.add('vanishOut');
          cluster.classList.remove('visible');
        }else{
          // Altrimenti devo esploderlo
          // Quindi rimuovo un eventuale vanishOut
          cluster.classList.remove('vanishOut');

          // Controllo che sia una palla che può contenere figli
          // Se ne possiede, resetto la situazione
          if(cluster.classList[2].match(/story/i) !== null) {
            var clusterId = cluster.classList[2].replace('story-', '');
            var balls = document.querySelectorAll('.ball-' + clusterId);

            for (var i = 0; i < balls.length; i++) {
              balls[i].classList.remove('vanishIn','visible');
              balls[i].classList.add('vanishOut');
              // balls[i].className = toggleVisibility( balls[i].className );
            }

            cluster.classList.add('vanishIn');
          
          }else{
            nochilds = true;
          }
        }

        // if(cluster.classList.indexOf('vani'))
        // zoom.out({
        //   element: cluster,
        //   callback: function() {
        //     console.log(this);
        //     toggleForeground();
        //     console.log('out');
        //     var clusterId = cluster.classList[2].replace('story-', '');
        //     var balls = document.querySelectorAll('.ball-' + clusterId);

        //     for (var i = 0; i < balls.length; i++) {
        //       balls[i].className = toggleVisibility( balls[i].className );
        //       balls[i].classList.add('vanishIn');
        //     }
        //   }
        // });
    
        if(!nochilds) {
          zoom.to({
            padding: 100,
            element: cluster,

            getZoomArea: function() {
              return {
                top: cluster.top,
                left: cluster.left,
                width: cluster.width,
                height: cluster.height
              };
            },

            callback: function() {

              // "clusterId" serve a determinare la lista degli eventi
              // (mini-storie) che fanno parte del singolo cluster:
              var clusterId = cluster.classList[2].replace('story-', '');
              var balls = document.querySelectorAll('.ball-' + clusterId),
                positions = [
                  {top: .5, left: -1},
                  {top: 3, left: 22},
                  {top: 18, left: 18},
                  {top: 10, left: 30},
                  {top: 80, left: 20}
                ];

              // toggleForeground();

              for (var i = 0; i < balls.length; i++) {
                // USTYM
                balls[i].classList.add('story-' + clusterId);
                balls[i].classList.add('resizeBalls');
                balls[i].className = toggleVisibility(balls[i].className);

                // MIKI
                // Per ogni figlio, se ho vanishOut, lo rimuovo e lo rende visibile
                // Altrimenti faccio il toggle semplice della visibility e del display
                if(balls[i].className.indexOf('vanishOut') !== -1) {
                  balls[i].classList.add('visible');
                  balls[i].classList.remove('vanishOut');
                }else{
                  balls[i].className = toggleVisibility( balls[i].className );
                }
                // Setto un id per il posizionamento AL MOMENTO statico in css
                if(!balls[i].id) {
                  balls[i].id = 'ball-' + clusterId + '-' + (i+1);
                }
                // E poi hli faccio apparire tramite vanishIn
                balls[i].classList.add('vanishIn');
              }

              for (var i = 0; i < 5;) {
                var clstr = document.getElementsByClassName('story-' + (++i))[0]; // ...ById
                clstr.className = toggleVisibility(clstr.className);
              }

              animateBalls(balls, positions);

            }
          });
        }

      });
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    // var step = 0;
    // // Order by tone
    // var colors = [[0,12,39], [18,52,82], [26,71,157], [48,154,187], [54,172,116], [255,128,0]];    
    // var colorIndices = [0,1,2,3];

    // var rgb2hex = function (rgb){
    //  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    //  return (rgb && rgb.length === 4) ? "#" +
    //   ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    //   ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    //   ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    // };

    // var randomRGBs = function(step, colorIndices, colors) {
    //   // Array with base colors
    //   var colorSeeds = [
    //       colors[colorIndices[0]],
    //       colors[colorIndices[1]],
    //       colors[colorIndices[2]],
    //       colors[colorIndices[3]]
    //   ];

    //   // A Fucking decimal number
    //   var istep = 1 - step;
      
    //   // A fucking matrix with 2 Rgbs generate by a fucking random number
    //   return [
    //           [
    //             Math.round(istep * colorSeeds[0][0] + step * colorSeeds[1][0]),
    //             Math.round(istep * colorSeeds[0][1] + step * colorSeeds[1][1]),
    //             Math.round(istep * colorSeeds[0][2] + step * colorSeeds[1][2])
    //           ],
    //           [
    //             Math.round(istep * colorSeeds[2][0] + step * colorSeeds[3][0]),
    //             Math.round(istep * colorSeeds[2][1] + step * colorSeeds[3][1]),
    //             Math.round(istep * colorSeeds[2][2] + step * colorSeeds[3][2])
    //           ]
    //         ];
    // };

    // setInterval(function() {

    //   // Generate 2 rgb colors
    //   var rgbs = randomRGBs(step, colorIndices, colors);

    //   // Oh, wow! It seems that IE does not support rgb for gradient! Yeaah! Fuck off.
    //   var hex1 = rgb2hex('rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ')');
    //   var hex2 = rgb2hex('rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ')');

    //   // Some inline style. Why not? :)
    //   var style = ['#333'];
      
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

    //   style.push('-moz-radial-gradient(center, ellipse cover, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ') 0%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ') 100%)');
    //   style.push('-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ')), color-stop(100%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ')))');
    //   style.push('-webkit-radial-gradient(circle, ellipse cover, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + '), rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + '))');
    //   style.push('-o-radial-gradient(center, ellipse cover, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ') 0%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ') 100%)');
    //   style.push('-ms-radial-gradient(center, ellipse cover, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ') 0%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ') 100%)');
    //   style.push('radial-gradient(ellipse at center, rgb(' + rgbs[0][0] + ', ' + rgbs[0][1] + ' , ' + rgbs[0][2] + ') 0%, rgb(' + rgbs[1][0] + ', ' + rgbs[1][1] + ' , ' + rgbs[1][2] + ') 100%)');
    //   style.push('progid:DXImageTransform.Microsoft.gradient( startColorstr=' + hex1 + ', endColorstr=' + hex2 + ', GradientType=1 )');

    //   // Set the fucking inline style to body
    //   document.body.style.background = '';
    //   for (var i = 0; i < style.length; i++) {
    //     document.body.style.background += style[i];
    //   };

    //   // Increment the fucking counter
    //   step += 0.01;

    //   // Mario told me to do this kind of "magic"
    //   // the secrets of js: you think that step is equal to 1, but... uhm.. this is magic! No explain!
    //   if ( step >= 1 ) {
    //     step %= 1; // nice try

    //     // Change the index of color for generate some random rgb. Just have fun while do this.
    //     colorIndices[0] = colorIndices[1];
    //     colorIndices[2] = colorIndices[3];

    //     colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    //     colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    //   }
    // }, 100 );

    setStorieshandler();
  });
})();

