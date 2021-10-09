class AiController {
    constructor(obj) {
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;
        this.obj = obj;
    }

    updateInput() {
        var originalColor = ctx.fillStyle;
        ctx.fillStyle = "#888";
        if (this.incoming(ball)) {

        }
        //this.up = raycast.top < this.obj.transform.top;
        //this.down = raycast.bottom > this.obj.transform.bottom;

        //if ("DEBUG_FLAG" in window)
            //ctx.fillRect(raycast.x, raycast.y, raycast.width, raycast.height);
        ctx.fillStyle = originalColor;
    }

    static Create(obj) {
        var result = new AiController(obj);
        if (!obj.controls) {
            obj.controls.remove();
        }
        obj.controls = result;
        var updateListener = function() { result.updateInput(); };
        result.remove = function() {
            removeEventListener("update", updateListener);
        }
        addEventListener("update", updateListener);
		return result;
    }

    incoming(obj) {
        if (obj.velocity.x > 0 && this.x > canvas.width / 2)
            return true;
        if (obj.velocity.x < 0 && this.x < canvas.width / 2)
            return true;
        return false;
    }
}