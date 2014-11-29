define(function(require) {
    'use strict';
  
    var 
    C = require('constants'),
    Util = require('util');

    function ScoreArrow(position) {
        playerNotes.call(this);
        
        var on = new Raster('media/temparrow.png');  // when direction key is pressed
        var off = new Raster('media/temparrow.png'); // when key is not pressed

        var start = new Point(0,0);
 
        this.isOn = false;
        this.position = position;
    }

    /* 
     * Toggles whether arrow is "on" (button is pressed) 
     */
    ScoreArrow.prototype.toggleOn = function() {
        this.isOn = !this.isOn;
    }


    ScoreArrow.prototype.scoreHit = function(position) {
        if (position == this.position) return 'perfect';
        if (position is close) return 'great';
        if (position is kinda off) return 'ok';
        if (position is totally off) return 'miss';
    }
}
