class GameObject {
	static unscaledDt = 0; // Time since last frame update, without the timescale applied
	static dt = 0;
	static lastFrameTime = Date.now(); // Time of last frame update
	
	constructor(x, y, w, h, c) {
		this.transform = new Rect(x, y, w, h);
		this.color = c;
	}
	drawTo(context) {
		let prevColor = context.fillStyle;
		context.fillStyle = this.color;
		context.fillRect(this.transform.x, this.transform.y, this.transform.width, this.transform.height);
		context.fillStyle = prevColor;
	}
	move(x, y) {
		this.transform.x += x;
		this.transform.y += y;
	}
	static updateDt() {
		var thisTime = Date.now();
		GameObject.unscaledDt = (thisTime - GameObject.lastFrameTime) / 1000;
		GameObject.dt = GameObject.unscaledDt * timescale;
		GameObject.lastFrameTime = thisTime;
	}
	update() {
		this._wallCollisions();
	}
	_wallCollisions() {
		if (this.transform.x < 0)
			this.transform.x = 0;
		if (this.transform.right > canvas.width)
			this.transform.x = canvas.width - this.transform.width;
		if (this.transform.y < 0)
			this.transform.y = 0;
		if (this.transform.bottom > canvas.height)
			this.transform.y -= this.transform.bottom - canvas.height;
	}
}

class Rect {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}
	
	get top() {
		return this.y;
	}
	
	get bottom() {
		return this.y + this.height;
	}
	
	get left() {
		return this.x;
	}
	
	get right() {
		return this.x + this.width;
	}
	
	intersects(other) {
		if (this.top > other.bottom)
			return false;
		
		if (this.right < other.left)
			return false;
		
		if (this.left > other.right)
			return false;
		
		if (this.bottom < other.top)
			return false;
		
		return true;
	}
	set position(value) {
		this.x = value.x;
		this.y = value.y;
	}
}