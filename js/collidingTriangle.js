(function(){
    'use strict';

    /*global define*/
    define(function (require) {
        var Vector = require('vector');

        return function(locationV,velocityV, solid,size){
            this.location = locationV;
            this.velocity = velocityV;
            this.solid = solid;
            this.halfSize = size/2;

            this.draw =function (context){
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

            this.detectCollision = function (others, ctx){
                var me = this;
                others.forEach(function(other){
                    var otherLocation = new Vector(other.location.x, other.location.y);
                    var distance = otherLocation.substract(me.location).magnitude();
                    if( distance < me.halfSize + other.halfSize){
                        if(ctx){
                            ctx.save();
                            ctx.moveTo(me.location.x, me.location.y);
                            ctx.lineTo(other.location.x,other.location.y);
                            ctx.stroke();
                            ctx.restore();
                        }
                        other.velocity = new Vector(0,0);
                        me.velocity = new Vector(0,0);
                    }
                });
            };
        };
    });

}());
