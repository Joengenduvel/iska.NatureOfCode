(function(){
    'use strict';

    /*global define*/
    define(function () {
        return function(x,y){
            this.x = x;
            this.y =y;

            this.draw =function (context, magnification){
                if(!magnification){
                    magnification = 1;
                }
                context.save();
                context.beginPath();
                context.moveTo(0, 0);
                context.lineTo(this.x * magnification, this.y * magnification);
                context.stroke();
                context.fillText(Math.round(this.x*10)/10 + ' : ' + Math.round(this.y*10)/10, this.x * magnification, this.y * magnification);
                context.restore();
            };

            this.add = function(vector){
                this.x += vector.x;
                this.y += vector.y;
                return this;
            };

            this.multiply = function (a) {
                this.x *= a;
                this.y *= a;
                return this;
            };

            this.substract = function (vector){
                this.x -= vector.x;
                this.y -= vector.y;
                return this;
            };

            this.magnitude = function(){
                return Math.sqrt(this.x*this.x + this.y*this.y);
            };
        };
    });

}());
