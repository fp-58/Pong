class GamepadController extends InputController {
	constructor(obj, index) {
		super(obj);
		this.index = index;
	}
	// Returns the current gamepad
	get gamepad() {
		return navigator.getGamepads()[this.index];
	}
	// Returns if the current gamepad exists and is connected
	get connected() {
		if (this.gamepad == null) {
			return false;
		}
		return this.gamepad.connected;
	}
	updateInput() {
		if (!this.connected)
			return;
		if (!this.enabled)
			return;
		var btns = this.gamepad.buttons;

		if (btns[0].pressed) {
			this.obj.up = true;
			this.lockInput("up");
		}
		else if (!this.isLocked(obj, "up")) {
			this.obj.up = false;
			this.unlockInput("up");
		}
		if (btns[2].pressed) {
			this.obj.down = true;
			this.lockInput("down");
		}
		else if (!this.isLocked("down")) {
			this.obj.down = false;
			this.unlockInput("down");
		}
		if (btns[1].pressed) {
			this.obj.right = true;
			this.lockInput("right");
		}
		else if (!this.isLocked("right")) {
			this.obj.right = false;
			this.unlockInput("right");
		}
		if (btns[3].pressed) {
			this.obj.left = true;
			this.lockInput("left");
		}
		else if (!this.isLocked("left")) {
			this.obj.left = false;
			this.unlockInput("left");
		}
	}
	static Create(obj, index) {
		var result = new GamepadController(obj, index);
		var updateListener = function() {
			result.updateInput();
		}
		result.remove = function () { removeEventListener("update", updateListener) };
		addEventListener("update", updateListener);
		return result;
	}
}