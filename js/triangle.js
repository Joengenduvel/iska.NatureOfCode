(function(){
    'use strict';

    /*global define*/
    define(function () {
        return function(x,y,angle, solid,size){
            this.x = x;
            this.y =y;
            this.angle = angle;
            this.solid = solid;
            this.halfSize = size/2;

            this.draw =function (context){
                context.save();
                context.beginPath();
                context.translate(this.x, this.y);
                context.rotate(this.angle);
                context.moveTo(0, -this.halfSize);
                context.lineTo(this.halfSize, this.halfSize);
                context.lineTo(-this.halfSize, this.halfSize);
                context.lineTo(0, -this.halfSize);
                if (this.solid) {
                    context.fill();
                } else {
                    context.stroke();
                }
                context.restore();
            };
        };
    });

}());
