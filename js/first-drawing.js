(function () {
    'use strict';

    /*global document */
    /*global Reveal */
    /*global define*/
    define(function (require) {
        var canvas = document.getElementById('firstDrawingCanvas');
        var environment = require('environment');
        var ctx = canvas.getContext('2d');

        function makeFullScreen(canvas) {
            canvas.width = environment.width;
            canvas.height = environment.height;
            Reveal.layout();
        }

        function draw(x, y, angle, size, solid) {
            var halfSize = size / 2;
            ctx.save();
            ctx.beginPath();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.moveTo(0, -halfSize);
            ctx.lineTo(halfSize, halfSize);
            ctx.lineTo(-halfSize, halfSize);
            ctx.lineTo(0, -halfSize);
            if (solid) {
                ctx.fill();
            } else {
                ctx.stroke();
            }
            ctx.restore();
        }

        function anglePart(n, m) {
            return Math.PI * 2 * n / m;
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }


        return {
            start: function () {
                makeFullScreen(canvas);
                clearCanvas();
                draw(environment.width / 2, environment.height - 20, 0, 10);
                draw(10, 10, anglePart(0, 10), 10, true);
                draw(30, 10, anglePart(1, 10), 11, true);
                draw(50, 10, anglePart(2, 10), 12, true);
                draw(70, 10, anglePart(3, 10), 13, true);
                draw(90, 10, anglePart(4, 10), 14, true);
                draw(110, 10, anglePart(5, 10), 15, true);
                draw(130, 10, anglePart(6, 10), 16, true);
                draw(150, 10, anglePart(7, 10), 17, true);
                draw(170, 10, anglePart(8, 10), 18, true);
                draw(190, 10, anglePart(9, 10), 19, true);
                draw(210, 10, anglePart(10, 10), 20, true);
            }
        };
    });
}());
