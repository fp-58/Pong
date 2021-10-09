class KeyCallback {
    constructor(key, callback) {
        this.keyCodes = key;
        this.callback = callback;
        this.using = false;
    }
    static Create(keyCode, callback) {
        var result = new KeyCallback(keyCode, callback);
        var downListener = function(e) {
            if (!result.using && result.keyCodes.includes(e.keyCode)) {
                result.callback();
                result.using = true;
            }
        };
        document.addEventListener("keydown", downListener);
        var upListener = function(e) {
            if (result.keyCodes.includes(e.keyCode)) {
                result.using = false;
            }
        };
        document.addEventListener("keyup", upListener);
        result.remove = function() {
            document.removeEventListener("keydown", downListener);
            document.removeEventListener("keyup", upListener);
        };
        return result;
    }
}