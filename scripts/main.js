'use strict';

(function() {
  angular.module('across_binary', [])
    .controller('appBackgroundController', function() {
        // Sets a dynamic background to the main page:
        setBackgroundImage();
    })

    .controller('timelineController', ['$scope', 'ageService',
      function($scope, ageService) {
        $scope.app = document.getElementById('app');

        $scope.itAges = [
          {name: 'premechanical',     description: '', data: '', pages: []},
          {name: 'mechanical',        description: '', data: '', pages: []},
          {name: 'electromechanical', description: '', data: '', pages: []},
          {name: 'electronic',        description: '', data: '', pages: []},
          {name: 'future',            description: '', data: '', pages: []}
        ];

        $scope.exploreAge = function($e) {
          zoom.init($scope.app);
          zoom.to({
            element:  $e.currentTarget,
            callback: ageService.showAgeTimeline
          });
        };
      }])

    .service( 'ageService', function() {
      this.showAgeTimeline = function() { 
        // Do some serius shit...
      };
    })

    // .factory( '', function() {
    //   return function() {
    //   };
    // })

    ;

  // This is realy ugly...
  angular.element(document).ready(function() {
    var zoomjs  = document.createElement('script');
    zoomjs.src  = './scripts/lib/zoom.js';
    zoomjs.type = 'text/javascript';

    document.getElementsByTagName('head')[0].appendChild(zoomjs);
  });

})();
