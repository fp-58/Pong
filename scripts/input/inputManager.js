// Controllers output to this object type
class InputManager {
	constructor() {
		this.up = false;
		this.down = false;
		this.left = false;
		this.right = false;
		this.controllers = {};
	}
	static Create(keyInputs, gpadIndex) {
		var result = new InputManager();
		var keyboard = KeyboardController.Create(result, keyInputs.up, keyInputs.down, keyInputs.left, keyInputs.right);
		var gamepad = GamepadController.Create(result, gpadIndex);
		result.controllers.keyboard = keyboard;
		result.controllers.gamepad = gamepad;
		return result;
	}
	
	// Parses the up, down, left, right bools into a vector
	get direction() {
		var result = new Vector();
		if (this.up)
			result.y++;
		if (this.down)
			result.y--;
		if (this.left)
			result.x--;
		if (this.right)
			result.x++;
		return result;
	}

	remove() {
		for (let id in this.controllers) {
			this.controllers[id].remove;
		}
	}
}

// Simple 2 dimensional vector
class Vector {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	toString() {
		return "("+this.x+", "+this.y+")";
	}
	copy() {
		return new Vector(this.x, this.y);
	}
}