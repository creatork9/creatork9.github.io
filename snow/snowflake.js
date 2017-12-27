function getRandomSize() {
	let r = pow (random(0, 1), 2);
	return constrain(r * 36, 2, 36);
}

class Snowflake {

	constructor(sx, sy, img) {
		let x = sx || random(width);
		let y = sy || random(-100, -10);
		this.img = img;
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector();

		this.angle = random(TWO_PI);
		this.dir = (random(1) > 0.5) ? 1 : -1;
		this.xOff = 0;

		this.r = getRandomSize();
		//this.terminalV = random()
	}

	applyForce(force) {
		let f = force.copy();

		f.mult(this.r);
		this.acc.add(f);
	}

	randomize() {
		let x = random(width);
		let y = random(-100, -10);
		//console.log ()

		this.pos = createVector(x, y);
		this.vel = createVector(0, 1);
		this.acc = createVector();
		this.r = getRandomSize();
	}
	update() {

		this.xOff = sin(this.angle) * this.r;
		this.vel.add(this.acc);
		this.vel.limit(this.r * 0.06);
		if (this.vel.mag() < 1) {
			this.vel.normalize();
		}


		this.pos.add(this.vel);
		this.acc.mult(0);

		if (this.pos.y > height + this.r) {
			this.randomize();
		}
		this.angle += this.dir * this.vel.mag() / 200;
	}
	render() {
/*		stroke(255);
		strokeWeight(this.r);
		point(this.pos.x, this.pos.y);*/

		push();
		translate(this.pos.x + this.xOff, this.pos.y);
		rotate(this.angle);

		imageMode(CENTER);
		image(this.img, 0, 0, this.r, this.r);
		pop();

		
	}


}