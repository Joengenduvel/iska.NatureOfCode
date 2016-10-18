(function(){
    'use strict';

    /*global define*/
    define(function (require) {
        var Vector = require('vector');

        return function(locationV,velocityV, solid,mass){

            this.draw =function (context){
                context.save();
                context.beginPath();
                context.translate(this.location.x, this.location.y);
                this.velocity.draw(context, 50);
                context.rotate(this.angle);
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

            this.detectCollision = function (others){
                var me = this;
                others.forEach(function(other){
                    var otherLocation = new Vector(other.location.x, other.location.y);
                    var distance = otherLocation.substract(me.location).magnitude();
                    if( distance < me.halfSize + other.halfSize){
                        //other.applyForce(me.velocity.copy().multiply(me.mass));
                        me.applyForce(other.velocity.copy().multiply(other.mass));
                    }
                });
            };

            this.applyForce = function(forceVector){
                var force = forceVector.copy();
                console.log('applying force', force);
                force.multiply(1/mass);
                console.log('applying weighed force', force);
                console.log('velocity', this.velocity);
                this.velocity.add(force);
                console.log('velocity result', this.velocity);
                this.angle = Math.atan2(this.velocity.y,this.velocity.x);
            };

            this.location = locationV;
            this.velocity = new Vector(0,0);
            this.solid = solid;
            this.halfSize = mass/2;
            this.mass = mass;
            this.applyForce(velocityV);
        };
    });

}());
