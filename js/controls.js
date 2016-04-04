(function(){
    'use strict';

    /*global define*/
    define(function (require) {
        var environment = require('environment');
        var leftHandlers,rightHandlers;
        var controlsContainer = environment.window.document.getElementById('controls');
        var leftButton = environment.window.document.getElementById('leftButton');
        var rightButton = environment.window.document.getElementById('rightButton');

        function leftClick(){
            for(var i=0; i< leftHandlers.length; i++){
                leftHandlers[i]();
            }
        }
        function rightClick(){
            for(var i=0; i< leftHandlers.length; i++){
                rightHandlers[i]();
            }
        }
        leftButton.onclick = leftClick;
        rightButton.onclick = rightClick;

        var controls = {
            enable: function(){
                controlsContainer.style.display = 'block';
            },
            registerLeft: function(handler){
                leftHandlers.push(handler);
                leftButton.style.display = 'inline-block';
            },
            registerRight: function(handler){
                rightHandlers.push(handler);
                rightButton.style.display = 'inline-block';
            },
            clearRegistrations: function () {
                leftHandlers = [];
                rightHandlers = [];
            }
        };
        controls.clearRegistrations();
        return controls;
    });

}());
