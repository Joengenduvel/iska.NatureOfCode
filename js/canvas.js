(function(){
    'use strict';

    /*global define */
    define(function (require) {
        var environment = require('environment');
        return function(elementId){
            var canvas = environment.window.document.getElementById(elementId);
            var context = canvas.getContext('2d');
            this.context = context;
            this.fullScreen= function(){
                canvas.width = environment.width;
                canvas.height = environment.height;
                environment.reveal.layout();
            };
            this.clear= function(){
                context.clearRect(0, 0, canvas.width, canvas.height);
            };
        };
    });

}());
