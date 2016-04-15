(function(){
    'use strict';

    /*global Reveal */
    /*global window */
    /*global define */
    define(function () {
        var slideContainer = window.document.getElementsByClassName('slides')[0];

        return {
            width: (function(){
                return slideContainer.clientWidth;
            }()),
            height: (function(){
                return slideContainer.clientHeight;
            }()),
            window: window,
            reveal: Reveal
        };
    });

}());
