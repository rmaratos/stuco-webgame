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
            this.lastNote = 0;
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

            _.forEach(playerNotes.children, function(note) {
                var enable = arrows.indexOf(note.name)>=0;
                note.img.visible = enable;

            }, this);

            _.forEach(risingNotes.children, function(note) {
                note.move();
            }, this);

            // console.log(e.time);

            if (e.time - this.lastNote >= 0.5) {
                // console.log("new note!");
                this.newFallingNote();
                this.lastNote = e.time;
            }

        },



        // Add new falling note to screen
        newFallingNote: function() {
            var dir = Util.choose(dirs);
            var note = new Note(dir, 575);
            risingNotes.addChild(note);
            console.log(risingNotes.children.length);
        }
    };

    view.onFrame = _.bind(Game.loop, Game);

    return Game;
});
