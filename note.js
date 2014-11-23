/* 
 * Defines note class. Notes are the little icons that tell you what buttons to press.
 */

define(function(require) {
    'use strict';
    
    var 
    offset = new Point(0,0);
    C = require('constants'),
    Util = require('util');

    /*
     * Creates a new Note. 
     * position is tuple paper.js Point
     * direction is string 'up' 'down' 'left' or 'right'
     */
    function Note(position, direction) {
        Group.call(this);
        
        var start = new Point(0,0);
        
        // import up arrow
        var img = Raster('media/arrow.png', start)

        // rotate image to match direction
        if (direction == 'left') 
            img.rotate(270);
        if (direction == 'down') 
            img.rotate(180);
        if (direction == 'right')
            img.rotate(90);

        // TODO: set velocity based on tempo
        this.position = position;
        this.velocity = [0,0]
        
        this.drawImage(img, offset);  
     }
  
     Note.prototype = Object.create(Group.prototype);
     
     Note.prototype.setTempo = function(vector) {
         this.velocity = [ vector[0], 
                           vector[1] ];
     }
}
