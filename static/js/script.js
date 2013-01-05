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
		renderer.setSize( window.innerWidth, window.innerHeight)

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

		for (var i= 0; i < 200; i += 1) {
			var pc = '#' + (Math.floor(Math.random()*0xFFFFFF) + 0x999).toString(16);
			//console.log('pc = ' + pc);
			material = new THREE.ParticleCanvasMaterial( {color: pc, program: particleRender });
			particle = new THREE.Particle(material);

			particle.position.x = Math.random() * 1200-600;
			particle.position.y = Math.random() * 1200-600;
			particle.position.z = Math.random() * 2000;

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
			particle.position.z +=  112 * 0.1; //particle.position.z += mouseY * 0.1;
			if(particle.position.z>1000) particle.position.z-=2000;
		}
	}

});