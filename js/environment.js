(function(){
    'use strict';

    /*global document */
    /*global define */
    define(function () {
        var slideContainer = document.getElementsByClassName('slides')[0];

        return {
            width: (function(){
                return slideContainer.clientWidth;
            }()),
            height: (function(){
                return slideContainer.clientHeight;
            }())
        };
    });

}());
