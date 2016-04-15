(function () {
    'use strict';

    /*global define*/
    define(function (require) {
        var NUMBER_OF_ENEMIES = 10;
        var SHIP_SIZE = 20;
        var MOVEMENT_AMOUNT = 1;

        var environment = require('environment');
        var Canvas = require('canvas');
        var canvas = new Canvas('accelerateCanvas');
        var Triangle = require('collidingTriangle');
        var Vector = require('vector');

        var controls = require('controls');

        var enemies = [];
        var me;

        function applyMovement(object) {
            object.location.add(object.velocity);
            checkEdges(object);
        }

        function checkEdges(object) {
            if(object.location.x < 0){
                object.location.x = environment.width;
            }
            if(object.location.x > environment.width){
                object.location.x = 0;
            }
            if(object.location.y < 0){
                object.location.y = environment.height;
            }
            if(object.location.y > environment.height){
                object.location.y = 0;
            }
        }

        function drawWorld() {
            canvas.fullScreen();
            canvas.clear();
            for(var i =0;i< enemies.length; i++){
                enemies[i].draw(canvas.context);
                applyMovement(enemies[i]);
                var collisionObjects = enemies.slice();
                collisionObjects.splice(i,1);
                enemies[i].detectCollision(collisionObjects);
            }

            me.draw(canvas.context);

            me.detectCollision(enemies);
            environment.window.requestAnimationFrame(drawWorld);
        }

        function moveLeft() {
            enemies.forEach(function (enemy) {
                enemy.location.x -= MOVEMENT_AMOUNT;
            });
        }


        function moveRight() {
            enemies.forEach(function (enemy) {
                enemy.location.x += MOVEMENT_AMOUNT;
            });
        }


        return {
            start: function () {
                enemies = [];
                controls.enable();
                for (var i = 0; i < NUMBER_OF_ENEMIES; i++) {
                    var enemyPosition = new Vector(Math.random() * environment.width, Math.random() * environment.height);
                    var enemyVelocity = new Vector((Math.random() * MOVEMENT_AMOUNT * 2) - MOVEMENT_AMOUNT, (Math.random() * MOVEMENT_AMOUNT *2) - MOVEMENT_AMOUNT);
                    enemies.push(
                        new Triangle(enemyPosition,
                            enemyVelocity,
                            true,
                            SHIP_SIZE
                        ));
                }
                var mePosition = new Vector(
                    environment.width / 2, environment.height - (SHIP_SIZE * 2));
                me = new Triangle(
                    mePosition,
                    new Vector(0,-1),
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
