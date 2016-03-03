'use strict';

(function() {

  function geometryUpdate(mesh, opts) {
    for (var i = 0; i < mesh.children.length; i++) {
      mesh.children[i].geometry.dispose();
      
      mesh.children[i].geometry = new THREE.SphereGeometry(
        opts.radius,
        opts.width,
        opts.height
      );
    }
  }

  document.addEventListener('DOMContentLoaded', function() {

    // var gui    = new dat.GUI();
    var scene  = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera(75, 150 / 150, 0.1, 50);

    camera.position.z = 30;

    var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( 150, 150 );
    
    var canvasSphere = document.querySelectorAll('.canvas-sphere');

    var render = {
      mesh: null,
      renderer: null,
      scene: null,
      camera: null,
      render: function () {
        requestAnimationFrame(render.render);
        
        // render.mesh.rotation.x += 0.005;
        // render.mesh.rotation.y += 0.005;

        render.renderer.render( render.scene, render.camera );
      },
    };

    for (var i = 0; i < canvasSphere.length; i++) {
      canvasSphere[i].appendChild(renderer.domElement);
      render.renderer = renderer;
      render.camera = camera;
      createSphere(scene, render, 0, 0);
    };

    // document.body.appendChild(renderer.domElement);

    // var render = function () {
    //   requestAnimationFrame(render);

    //   mesh.rotation.x += 0.005;
    //   mesh.rotation.y += 0.005;

    //   renderer.render( scene, camera );
    // }();

    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }, false);

    // render();

  });
  


  function triggerGeometryUpdate(mesh) {
    var twoPi  = Math.PI * 2,
        data = {
          radius         : 6,
          width          : 256,
          height         : 128
        };

    geometryUpdate(mesh, data);

    return {fixed: true};
  };
  
  function createSphere(scene, render, x, y, z) {
    var z = z || 10;
    /* Lights */
    var ambientLight = new THREE.AmbientLight(0x000000);
    scene.add(ambientLight);

    var lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(   0,  200,    0);
    lights[1].position.set( 100,  200,  100);
    lights[2].position.set(-100, -200, -100);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    /* Object3D */

    var mesh = new THREE.Object3D();

    mesh.add( new THREE.LineSegments(
      new THREE.Geometry(),
      new THREE.PointsMaterial({
        opacity: 0,
        color: 0x156289,
        transparent: true,
        side: THREE.DoubleSide
      })
    ));

    mesh.add( new THREE.Mesh(
      new THREE.Geometry(),
      new THREE.MeshPhongMaterial({
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading
      })
    ));

    mesh.position.set(x, y, z);

    geometryUpdate(mesh, {radius: 6, width: 150, height: 150});

    scene.add(mesh);

    render.scene = scene;
    render.mesh = mesh;
    render.render();

  }

})();
