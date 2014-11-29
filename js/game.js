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
    var pressed = {"up":false, "down":false, "left":false, "right":false};
    var playerNotes = new Group();
    var upNotes = new Group();
    var downNotes = new Group();
    var leftNotes = new Group();
    var rightNotes = new Group();

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

            this.score = 0;
            this.textBox = new PointText(new Point(100,100));
            this.textBox.content = "Score: " + this.score;
            this.started = true;
            this.addingNote = false;

        },

        end: function() {
            document.getElementById('startBox').style.display = 'block';
            document.getElementById('score').innerHTML = 'Your score was ' + this.score;
            this.started = false;

            playerNotes.removeChildren();
        },

        loop: function(e) {
            // console.log(pressed);
            this.textBox.content = "Score: " + this.score;

            if (!this.started) {
                return;
            }
            var arrows = [];

            if (Key.isDown('w') || Key.isDown("up")) {
                arrows.push("up");
            }
            else
                pressed["up"] = false;

            if (Key.isDown('s') || Key.isDown('down')) {
                arrows.push("down");
            }
            else
                pressed["down"] = false;

            if (Key.isDown('a') || Key.isDown("left")) {
                arrows.push("left");
            }
            else
                pressed["left"] = false;

            if (Key.isDown('d') || Key.isDown("right")) {
                arrows.push("right");
            }
            else
                pressed["right"] = false;

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
                if (enable)
                    this.pressed(note.name);
                note.img.visible = enable;

            }, this);

            _.forEach(upNotes.children, function(note) {
                this.moveNote(note);
            }, this);

            _.forEach(downNotes.children, function(note) {
                this.moveNote(note);
            }, this);

            _.forEach(leftNotes.children, function(note) {
                this.moveNote(note);
            }, this);

            _.forEach(rightNotes.children, function(note) {
                this.moveNote(note);
            }, this);



            // console.log(e.time);

            if (e.time - this.lastNote >= 0.5) {
                // console.log("new note!");
                this.newFallingNote();
                this.lastNote = e.time;
            }

        },
        moveNote: function(note) {
            note.move();
            if (note.img.position.y < -25)
            {
                note.img.remove();
                note.remove();
                console.log(":(");
                this.score -= 10;
            }
        },
        pressed: function(dir) {
            if (pressed[dir])
                return;
            console.log(dir);
            pressed[dir] = true;
            var notes;
            if (dir == 'left')
                notes = leftNotes;
            else if (dir == 'down')
                notes = downNotes;
            else if (dir == 'up')
                notes = upNotes;
            else if (dir == 'right')
                notes = rightNotes;

            _.forEach(notes.children, function(note) {
                console.log(note.img.position.y);
                var y = note.img.position.y;
                if ((25 < y) && (y < 75)){
                    this.score += 25;
                    console.log("bang!");
                    note.img.remove();
                    note.remove();
                }
                else
                    this.score -= 5;
            }, this);


        },

        // Add new falling note to screen
        newFallingNote: function() {
            var dir = Util.choose(dirs);
            var note = new Note(dir, 575);
            if (dir == 'left')
                leftNotes.addChild(note);
            else if (dir == 'down')
                downNotes.addChild(note);
            else if (dir == 'up')
                upNotes.addChild(note);
            else if (dir == 'right')
                rightNotes.addChild(note);
        }
    };

    view.onFrame = _.bind(Game.loop, Game);

    return Game;
});
