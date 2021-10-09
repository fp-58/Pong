var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");

const fps = null;
var timescale = 1;
var pauseState = {isPaused: true, forcedBy: "start"};
window.DEBUG_FLAG = true;

const onLogicUpdate = new CustomEvent("logicUpdate");
const onUpdate = new CustomEvent("update");
addEventListener("focus", function() { if (pauseState.forcedBy == null) pauseState.isPaused = false; });
addEventListener("blur", function() { if (pauseState.forcedBy == null) pauseState.isPaused = true; });
KeyCallback.Create([13, 32], function () {
    const allowed = ["keyPress", "start"];
	if (pauseState.forcedBy != null && !allowed.includes(pauseState.forcedBy))
		return;
	if (pauseState.isPaused) {
		pauseState.isPaused = false;
		pauseState.forcedBy = null;
	}
	else {
		pauseState.isPaused = true;
		pauseState.forcedBy = "keyPress";
	}
});

ctx.fillStyle = "#ff0";

var inputs = {
	player1: InputManager.Create({up: ["KeyW"], down: ["KeyS"]}, 0),
	player2: InputManager.Create({up: ["ArrowUp"], down: ["ArrowDown"]}, 1)
};
var player1 = new Paddle(0, (canvas.height - Paddle.height) / 2, inputs.player1);
var player2 = new Paddle(canvas.width - Paddle.width, (canvas.height - Paddle.height) / 2, inputs.player2);
// inputs.player2 = AiController.Create(player2);
var ball = new Ball((canvas.width - Ball.size) / 2, (canvas.height - Ball.size) / 2);
Ball.acceleration = 1;

var scores = {player1: 0, player2: 0};

RandomBallVelocity();

ball.onColideLeft = OnRightPlayerScore;
ball.onColideRight = OnLeftPlayerScore;

ctx.font = 'bold 48px VT323';

function Update() {
	GameObject.updateDt();
	ClearScreen();
	dispatchEvent(onUpdate);
	if (!pauseState.isPaused) {
		dispatchEvent(onLogicUpdate);
		player1.update();
		player2.update();
		ball.update();
	}
	ctx.fillText(scores.player1, canvas.width / 4 - (ctx.measureText(scores.player1).width / 2), 48);
	ctx.fillText(scores.player2, canvas.width * 3 / 4 - (ctx.measureText(scores.player2).width / 2), 48);
	player1.drawTo(ctx);
	player2.drawTo(ctx);
	ball.drawTo(ctx);
}

function ClearScreen() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function OnLeftPlayerScore() {
	OnAnyScore();
	scores.player1++;
}

function RandomBallVelocity() {
ball.velocity = new Vector(Ball.speed, Ball.speed);
	if (Math.round(Math.random()) == 0)
	ball.velocity.x *= -1;

	if (Math.round(Math.random()) == 0)
	ball.velocity.y *= -1;
}

function OnRightPlayerScore() {
	OnAnyScore();
	scores.player2++;
}

function OnAnyScore() {
	pauseState.isPaused = true;
	pauseState.forcedBy = "start";
	ball.transform.position = new Vector((canvas.width - Ball.size) / 2, (canvas.height - Ball.size) / 2);
	player1.transform.y = (canvas.height - Paddle.height) / 2;
	player2.transform.y = (canvas.height - Paddle.height) / 2;
	RandomBallVelocity();
}

if (fps != null) // Legacy game loop
	setInterval(Update, 1000 / fps);
else {
	var UpdateRecurring = function() {
		Update();
		requestAnimationFrame(UpdateRecurring);
	}
	requestAnimationFrame(UpdateRecurring);
}