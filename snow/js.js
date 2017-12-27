let snow = [];
let gravity;



let spritesheet = [];
let textures = [];

function preload() {
	spritesheet = loadImage('libraries/flakes32.png');
}

function setup() {
	// body...
	createCanvas(windowWidth, windowHeight);
	gravity = createVector(0, 0.02);
	for (let x = 0; x < spritesheet.width; x+=  32) {
		for (let y = 0; y < spritesheet.height; y+= 32) {
			let img = spritesheet.get(x, y, 32, 32);
			image(img, x, y);
			textures.push(img);
		}
	}

	for (let i = 0; i < 300; i++) {
		let x = random(width);
		let y = random(height);
		let design = random(textures);
		snow.push(new Snowflake(x, y, design));
	}
}


function draw() {
	background(0);
	let wx = map(mouseX, 0, width, -0.05, 0.05);
	let wind = createVector(wx, 0);
	for (flake of snow) {
		flake.applyForce(gravity);
		//flake.applyForce(wind);

		flake.render();
		flake.update();
		//console.log(snow.length);
	}
}
