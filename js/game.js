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
    var dirs = ["up", "down", "left", "right"];
    var playerNotes = new Group();
    var risingNotes = new Group();

    var Game = {
        start: function() {
            this.player = [];
            // this.lastFish = 0;
            // console.log("Making playernotes");
            playerNotes = new Group();
            var blankNotes = new Group();
            for (var i=0; i < dirs.length; i++)
            {
                var note = new Note(dirs[i], 50, true);
                blankNotes.addChild(note);
            }

            for (var i=0; i < dirs.length; i++)
            {
                var note = new Note(dirs[i], 50);
                playerNotes.addChild(note);
            }
            // console.log("LENGTH");
            // console.log(playerNotes.length);
            risingNotes = new Group();
            this.score = 0;
            this.started = true;
            this.addingNote = false;

        },

        end: function() {
            document.getElementById('startBox').style.display = 'block';
            // document.getElementById('score').innerHTML = 'Your score was ' + this.score;
            this.started = false;

            playerNotes.removeChildren();
            risingNotes.removeChildren();
        },

        loop: function(e) {

            if (!this.started) {
                return;
            }
            var arrows = [];
            // playerNotes.removeChildren();
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

            if (Key.isDown('n')) {
                if (!this.addingNote) {
                this.newFallingNote();
                this.addingNote = true;
                }
            }
            else
                this.addingNote = false;
            // console.log(playerNotes);
            _.forEach(playerNotes.children, function(note) {
                // console.log(note.name);
                // console.log(arrows);
                var enable = arrows.indexOf(note.name)>=0;
                note.img.visible = enable;

            }, this);

            // for (var i=0; i < dirs.length; i++)
            // {
            //     playerNotes[i].visible = (dirs[i] in arrows);
            // }

            // console.log("notes");
            // console.log(playerNotes);
            // playerNotes[0].remove();
            // playerNotes.removeChildren();
            // console.log("removed");
            // console.log(playerNotes);
            // console.log(arrows);

            _.forEach(risingNotes.children, function(note) {
                // console.log("moving note");
                note.move();
            }, this);

        },



        // Add new falling note to screen
        newFallingNote: function() {
            var dir = Util.choose(dirs);
            var note = new Note(dir, 550);
            risingNotes.addChild(note);
        }
    };

    view.onFrame = _.bind(Game.loop, Game);

    return Game;
});
