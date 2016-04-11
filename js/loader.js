(function(){
    'use strict';

    /*global Reveal*/
    /*global define*/
    define(function (require) {
        function slideChanged( event ) {
            switch (event.indexh){
                case 1:
                    //motionHandler.clearListeners();
                    //motionHandler.register(updateLabels);
                    break;
                case 2:
                    require(['first-drawing'], function(script) {
                        script.start();
                    });
                    break;
                case 3:
                    require(['do-the-locomotion'], function(script) {
                        script.start();
                    });
                    break;
                case 4:
                    require(['hey-mister-vector'], function(script) {
                        script.start();
                    });
                    break;
                case 5:
                    require(['collision'], function(script) {
                        script.start();
                    });
                    break;
                default:
                //motionHandler.clearListeners();

            }
        }
        Reveal.addEventListener( 'slidechanged', slideChanged );
        return(slideChanged);
    });

}());
