class Ball extends GameObject {
	static size = 25;
	static color = "#fff";
	static speed = 100;
	static acceleration = 0;
	
	constructor(x, y) {
		super(x, y, Ball.size, Ball.size, Ball.color);
		this.velocity = new Vector();
	}
	
	update() {
		this.move(this.velocity.x * GameObject.dt, -this.velocity.y * GameObject.dt);
		this.velocity.x += Ball.acceleration * Math.sign(this.velocity.x) * GameObject.dt;
		this.velocity.y += Ball.acceleration * Math.sign(this.velocity.y) * GameObject.dt;
		this._paddleCollisions();
		this._wallCollisions();
	}
	
	_wallCollisions() {
		if (this.transform.x < 0)
			this.onColideLeft();
		if (this.transform.right > canvas.width)
			this.onColideRight();
		if (this.transform.y < 0) {
			this.transform.y = 0;
			this.velocity.y *= -1;
		}
		if (this.transform.bottom > canvas.height) {
			this.transform.y -= this.transform.bottom - canvas.height;
			this.velocity.y *= -1;
		}
	}
	
	onColideLeft() {
		this.transform.x = 0;
		this.velocity.x *= -1;
	}
	
	onColideRight() {
		this.transform.x = canvas.width - this.transform.width;
		this.velocity.x *= -1;
	}
	
	_paddleCollisions() {
		if (this.transform.intersects(player1.transform)) {
			this.velocity.x *= -1;
			this.transform.x = player1.transform.right;
		}
		if (this.transform.intersects(player2.transform)) {
			this.velocity.x *= -1;
			this.transform.x = player2.transform.x - Paddle.width;
		}
	}
}