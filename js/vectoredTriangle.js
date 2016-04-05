(function(){
    'use strict';

    /*global define*/
    define(function () {

        return function(locationV,velocityV, solid,size){
            this.location = locationV;
            this.velocity = velocityV;
            this.solid = solid;
            this.halfSize = size/2;

            this.draw =function (context){
                this.location.draw(context);
                context.save();
                context.beginPath();
                context.translate(this.location.x, this.location.y);
                this.velocity.draw(context, 50);
                context.rotate(Math.atan2(this.velocity.y,this.velocity.x));
                context.moveTo(-this.halfSize, -this.halfSize);
                context.lineTo(this.halfSize, 0);
                context.lineTo(-this.halfSize, this.halfSize);
                context.lineTo(-this.halfSize, -this.halfSize);
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
