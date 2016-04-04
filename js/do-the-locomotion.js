(function () {
    'use strict';

    /*global Reveal */
    /*global define*/
    define(function (require) {
        var NUMBER_OF_ENEMIES = 10;
        var SHIP_SIZE = 20;
        var MOVEMENT_AMOUNT = 10;

        var environment = require('environment');
        var canvas = environment.window.document.getElementById('locomotionCanvas');
        var ctx = canvas.getContext('2d');
        var Triangle = require('triangle');

        var controls = require('controls');

        var enemies = [];
        var me;


        function makeFullScreen(canvas) {
            canvas.width = environment.width;
            canvas.height = environment.height;
            Reveal.layout();
        }

        function anglePart(n, m) {
            return Math.PI * 2 * n / m;
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function drawWorld() {
            makeFullScreen(canvas);
            clearCanvas();
            enemies.forEach(function (enemy) {
                enemy.draw(ctx);
                enemy.y += MOVEMENT_AMOUNT/10;
            });
            me.draw(ctx);
            environment.window.requestAnimationFrame(drawWorld);
        }

        function moveLeft() {
            enemies.forEach(function (enemy) {
                enemy.x -= MOVEMENT_AMOUNT;
            });
        }


        function moveRight() {
            enemies.forEach(function (enemy) {
                enemy.x += MOVEMENT_AMOUNT;
            });
        }


        return {
            start: function () {

                controls.enable();
                for (var i = 0; i < NUMBER_OF_ENEMIES; i++) {
                    enemies.push(
                        new Triangle(
                            Math.random() * environment.width,
                            Math.random() * environment.height,
                            anglePart(Math.random() * NUMBER_OF_ENEMIES, NUMBER_OF_ENEMIES),
                            true,
                            SHIP_SIZE
                        ));
                }
                me = new Triangle(
                    environment.width / 2,
                    environment.height - (SHIP_SIZE * 2),
                    0,
                    false,
                    SHIP_SIZE
                );
                controls.registerLeft(moveLeft);
                controls.registerRight(moveRight);

                environment.window.requestAnimationFrame(drawWorld);
            }
        };
    });
}());
