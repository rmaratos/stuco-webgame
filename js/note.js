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
    function Note(direction, y, blank) {
        Group.call(this);
        var x;
        this.name = direction;
        if (direction == 'left')
            x = 250;
        else if (direction == 'down')
            x = 350;
        else if (direction == 'up')
            x = 450;
        else if (direction == 'right')
            x = 550;
        var start = new Point(x, y);

        // import up arrow
        var path = (blank) ? 'media/temparrow.png' : 'media/arrow.png';
        var img = new Raster(path, start);
        img.visible = false;
        // console.log("a");
        img.on('load', function() {
            img.size = new Size(50,50);
            // console.log("rotate direction");
            // console.log(direction);
            if (direction == 'left')
                img.rotate(270);
            if (direction == 'down')
                img.rotate(180);
            if (direction == 'right') {
                // console.log("???");
                img.rotate(90);
            }
            img.visible = true;
        });
        // console.log("b");
        // rotate image to match direction


        // TODO: set velocity based on tempo
        this.img = img;
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
