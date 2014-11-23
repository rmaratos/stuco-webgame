/*
 * game.js: handles most game logic
 */

// paperjs has to have this run before
// any modules can reference paper variables
// todo--better, more modular way to do this?
paper.install(window);
paper.setup('myCanvas');

define(function(require) {
    'use strict';

    var
    Note = require('note'),
    C    = require('constants'),
    Util = require('util');

    var playerNotes = new Group();
    var fallingNotes = new Group();

    var Game = {
        start: function() {
            this.player = [];
            // this.lastFish = 0;
            playerNotes = new Group();
            fallingNotes = new Group();
            this.score = 0;
            this.started = true;
        },

        end: function() {
            document.getElementById('startBox').style.display = 'block';
            // document.getElementById('score').innerHTML = 'Your score was ' + this.score;
            this.started = false;

            playerNotes.removeChildren();
            fallingNotes.removeChildren();
        },

        loop: function(e) {

            if (!this.started) {
                return;
            }

            var arrows = [];

            playerNotes.removeChildren();
            // handle keyboard events for moving fish
            if (Key.isDown('w') || Key.isDown("up")) {
                arrows.push("up");
            }
            if (Key.isDown('s') || Key.isDown('down')) {
                arrows.push("down");
            }

            if (Key.isDown('a') || Key.isDown("left")) {
                arrows.push("left");
            }

            if (Key.isDown('d') || Key.isDown("right")) {
                arrows.push("right");
            }

            for (var i=0; i < arrows.length; i++)
            {
                var note = new Note([400,400], arrows[i]);
                playerNotes.addChild(note);
            }

            console.log(arrows);


            // Move notes down
            _.forEach(fallingNotes.children, function(note) {

                note.position = note.position.add(note.velocity);

            }, this);

        },

        // Add new falling note to screen
        newFallingNote: function() {
            var note = new Note();
            fallingNotes.addChild(note);

        }
    };

    view.onFrame = _.bind(Game.loop, Game);

    return Game;
});
