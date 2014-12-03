
define(function(require) {
    'use strict';

    var
    offset = new Point(0,0),
    C = require('constants'),
    Util = require('util');

    function Healthbar(x,y,width) {
    	var left = new Point(x, y+10);
    	var right = new Point(x+width, y+10);

        var rect = new Rectangle(x,y,width, 25);
        var bar = new Path.Rectangle(rect);

        bar.fillColor = {
        	gradient : {
    			stops : ['red', 'yellow', 'green']
    		},
    		origin : left,
    		destination : right
    	};

        var decrement = function() {
        	console.log("decrement called");
    	    bar.bounds.width -= 5;
        };

        Healthbar.prototype.remove = function() {
            bar.remove();
            // rect.remove();
        }

    };

    return Healthbar;
});
