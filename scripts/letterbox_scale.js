var screen = document.getElementById("screen");
var canvas = document.getElementById("main");
LetterboxScale();

function LetterboxScale() {
	var screenBounds = screen.getBoundingClientRect();
	var canvasBounds = canvas.getBoundingClientRect();
	if (canvasBounds.width > screenBounds.width) {
		canvas.style.width = "100%";
		canvas.style.height = "auto";
	}
	else if (canvasBounds.height > screenBounds.height) {
		canvas.style.height = "100%";
		canvas.style.width = "auto";
	}
}