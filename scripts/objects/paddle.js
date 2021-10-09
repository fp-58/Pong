class Paddle extends GameObject {
	static width = 25;
	static height = 150;
	static color = "#fff";
	static speed = 150;
	
	constructor(x, y, controls) {
		super(x, y, Paddle.width, Paddle.height, Paddle.color);
		this.controls = controls;
	}
	update() {
		if (this.controls.up) {
			this.move(0, -Paddle.speed * GameObject.dt);
		}
		if (this.controls.down) {
			this.move(0, Paddle.speed * GameObject.dt);
		}
		this._wallCollisions();
	}
}