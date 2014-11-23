/*
 * Defines note class. Notes are the little icons that tell you what buttons to press.
 */

define(function(require) {
    'use strict';

    var
    offset = new Point(0,0),
    C = require('constants'),
    Util = require('util');

    /*

     * Creates a new Note.
     * position is tuple paper.js Point
     * direction is string 'up' 'down' 'left' or 'right'
     */
    function Note(position, direction) {
        Group.call(this);
        console.log(position);
        var start = new Point(position[0], position[1]);

        // import up arrow
        var img = new Raster('media/arrow.png', start);
        console.log("a");
        // img.on('load', function() {
            img.size = new Size(50,50);
            console.log("rotate direction");
            console.log(direction);
            if (direction == 'left')
                img.rotate(270);
            if (direction == 'down')
                img.rotate(180);
            if (direction == 'right') {
                console.log("???");
                img.rotate(90);
            }
        // });
        console.log("b");
        // rotate image to match direction


        // TODO: set velocity based on tempo
        this.position = position;
        this.velocity = [0,0];

        // this.drawImage(img, offset);
     }

     Note.prototype = Object.create(Group.prototype);

     Note.prototype.setTempo = function(vector) {
         this.velocity = [ vector[0],
                           vector[1] ];
     };

     return Note;
});
