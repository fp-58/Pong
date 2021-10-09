// Base class for all other input controllers
class InputController {
	constructor(obj) {
		if (!Object.keys(obj).includes("inputLocks")) {
			obj.inputLocks = {};
		}
		this.obj = obj;
		this.enabled = true;
	}
	// Disallows other controllers setting the specified input false
	lockInput(input) {
		this.obj.inputLocks[input] = this;
	}
	// Allows other controllers to set the specified input false
	unlockInput(input) {
		if (!this.isLocked(this.obj, input))
			delete this.obj.inputLocks[input];
	}
	// Returns if the specified input is locked to this input
	isLocked(input) {
		return !this.hasLock(input) && this.obj.inputLocks[input] !== this;
	}
	// Returns if the specified input has been locked by any controller
	hasLock(input) {
		return Object.keys(this.obj.inputLocks).includes(input);
	}
}