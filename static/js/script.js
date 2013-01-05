/* Author: YOUR NAME HERE
*/

$(document).ready(function() {   

  var socket = io.connect();
	var camera, scene, renderer, mouseX = 0, mouseY = 0, particles = [];
 
 	init();

	function init() {
		camera = new THREE.PerspectiveCamera(80, window.innerWidth/window.innerHeight, 1, 4000);
		
		camera.position.z = 1000;

		scene = new THREE.Scene();
		scene.add(camera);

		renderer = new THREE.CanvasRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight);

		document.body.appendChild(renderer.domElement);

		makeParticles();
		//document.addEventListener( 'mousemove', onMouseMove, false);

		setInterval(update, 1000/30);
	}

	function update() {
		updateParticles();
		renderer.render(scene,camera);
	}

	function makeParticles() {
		var particle, material;

		for (var zpos= -1000; zpos < 1000; zpos += 20) {
			material = new THREE.ParticleCanvasMaterial( {color: 0x00B2EE, program: particleRender })
			particle = new THREE.Particle(material);

			particle.position.x = Math.random() * 1000 - 500;
			particle.position.y = Math.random() * 1000 - 500;
			particle.position.z = zpos;

			particle.scale.x = particle.scale.y = 10;

			scene.add(particle);

			particles.push(particle);
		}
	}
	function particleRender (context) {
		context.beginPath();
		context.arc(0,0,1,0, Math.PI*2, true);
		context.fill();
	}

	function updateParticles () {
		for (var i=0; i<particles.length; i++) {
			particle = particles[i];
			particle.position.z += 100 * 0.1;
			if(particle.position.z>1000) particle.position.z-=2000;
		}
	}

});