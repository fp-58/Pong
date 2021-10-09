// Translates keyboard input into an InputManager object
// Each input can have multiple keycodes assigned to it
class KeyboardController extends InputController {
	// Do not call the constructor
	constructor(obj, up, down, left, right) {
		super(obj); // Calls base class constructor
		this.up = up
		this.down = down;
		this.left = left;
		this.right = right;
		
		// These make sure that any null inputs are replaced with empty arrays
		if (up == null)
			this.up = [];
		if (down == null)
			this.down = [];
		if (left == null)
			this.left = [];
		if (right == null)
			this.right = [];
	}
	
	onKeyDown(e) {
		if (!this.enabled) // If this controller is disabled stop executing this function
			return;
		// Enumerate through each of this object's properties
		for (let input in this) {
			if (input == "enabled" || input == "obj") // Skip any properties that aren't inputs
				continue;
			for (let i in this[input]) {
				if (e.code == this[input][i]) {
					this.obj[input] = true;
					this.lockInput(input); // Makes it so no other controller can release the input
					break;
				}
			}
		}
	}
	
	onKeyUp(e) {
		if (!this.enabled) // If this controller is disabled stop executing this function
			return;
		// Enumerate through each of this object's properties
		for (let input in this) {
			if (input == "enabled" || input == "obj") // Skip any properties that aren't inputs
				continue;
			if (this.isLocked(input))
				continue;
			for (let i in this[input]) {
				if (e.code == this[input][i]) {
					this.obj[input] = false;
					this.unlockInput(input); // Allows other controllers to release the input
					break;
				}
			}
		}
	}
	
	// Call this to properly create a KeyboardController object
	static Create(obj, up, down, left, right) {
		var result = new KeyboardController(obj, up, down, left, right);
		
		var keydownListener = function (e) { result.onKeyDown(e); }
		document.addEventListener("keydown", keydownListener);
		var keyupListener = function (e) { result.onKeyUp(e); }
		document.addEventListener("keyup", keyupListener);
		
		result.remove = function() {
			document.removeEventListener("keydown", keydownListener);
			document.removeEventListener("keyup", keyupListener);
		}

		return result;
	}
}