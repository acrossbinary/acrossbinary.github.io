// La "cosa" che ha fatto il buon Mario:
// http://codepen.io/quasimondo/pen/lDdrF

'use strict';

function toggleVisibility(classes) {
  return classes.indexOf('visible') !== -1
        ? classes.replace('visible', 'hidden')
        : classes.replace('hidden', 'visible');
}

(function() {
  function setStorieshandler() {
    var clusters = document.getElementsByClassName('cluster');

    for (var i = 0; i < clusters.length; i++) {
      clusters[i].addEventListener('click', function(event) {
        event.preventDefault();

        var cluster = this;
        cluster.classList.add('vanishOut');

        // zoom.out();
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
            var balls = document.querySelectorAll('.ball-' + clusterId);

            for (var i = 0; i < balls.length; i++) {
              balls[i].className = toggleVisibility( balls[i].className );
              balls[i].classList.add('swashInLinear');
            }


          }
        });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    setStorieshandler();
  });
})();