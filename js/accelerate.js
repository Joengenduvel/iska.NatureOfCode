(function () {
    'use strict';

    /*global define*/
    define(function (require) {
        var NUMBER_OF_ENEMIES = 20;
        var SHIP_SIZE = 40;
        var MOVEMENT_AMOUNT = 5;

        var environment = require('environment');
        var Canvas = require('canvas');
        var canvas = new Canvas('accelerateCanvas');
        var Triangle = require('acceleratingTriangle');
        var Vector = require('vector');

        var controls = require('controls');

        var enemies = [];
        var me;
        var forceToLeftVector = new Vector(-MOVEMENT_AMOUNT,0);
        var forceToRightVector = new Vector(MOVEMENT_AMOUNT,0);

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
                enemy.applyForce(forceToLeftVector);
            });
        }


        function moveRight() {
            enemies.forEach(function (enemy) {
                enemy.applyForce(forceToRightVector);
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
                            (Math.random() * SHIP_SIZE / 2) + SHIP_SIZE / 2
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
