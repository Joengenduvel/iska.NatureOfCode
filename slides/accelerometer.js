function logToPage(){
    var  logLine = document.createElement("div");
    for(var i = 0; i<arguments.length; i++){
        logLine.appendChild(document.createTextNode(arguments[i] + ", "));
    }
    var log = document.getElementById("page-log");
    log.appendChild(logLine);
    log.scrollTop = log.scrollHeight - log.clientHeight;
}

console.log = logToPage;

function MotionHandler() {
    var listeners = [];
    this.onDeviceMove = function (e) {
        var x = e.accelerationIncludingGravity.x;
        var y = e.accelerationIncludingGravity.y;
        var z = e.accelerationIncludingGravity.z;

        for(var i =0; i<listeners.length; i++){
            listeners[i](x,y,z);
        }
    };
    this.register = function (listener) {
        listeners.push(listener);
    }
    this.clearListeners = function(){
        listeners = [];
    }
};
var motionHandler = new MotionHandler();
window.addEventListener("devicemotion", motionHandler.onDeviceMove, true);

function randomMotion(){
    var motion = {
        accelerationIncludingGravity:{
            x:Math.random(-10,10),
            y:Math.random(-10,10),
            z:Math.random(-10,10)
        }
    }
    motionHandler.onDeviceMove(motion);
}
window.setInterval(randomMotion(), 500);


function updateLabels(x,y,z){
    console.log("updating labels", x, y, z);
    document.getElementById("acceleration-x").innerHTML = x;
    document.getElementById("acceleration-y").innerHTML = y;
    document.getElementById("acceleration-z").innerHTML = z;
}

Reveal.addEventListener( 'slidechanged', function( event ) {
    console.log(event.indexh, event.indexv);
    switch (event.indexh){
        case 1:
            motionHandler.clearListeners();
            motionHandler.register(updateLabels);
            break;
        default:
            motionHandler.clearListeners();

    }
} );

