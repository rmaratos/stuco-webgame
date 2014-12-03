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
    Util = require('util'),
    Healthbar = require('health');
    var dirs = ["up", "down", "left", "right"];
    var pressed = {"up":false, "down":false, "left":false, "right":false};
    var awds = {"up":"w", "down":"s", "left":"a", "right":"d"};
    var playerNotes = new Group();
    var upNotes = new Group();
    var downNotes = new Group();
    var leftNotes = new Group();
    var rightNotes = new Group();
    var notes = [upNotes, downNotes, leftNotes, rightNotes];

    var Game = {
        start: function() {
            // Start song
            this.audio = document.getElementById("faf");
            this.audio.play();

            this.lastNote = 0;

            // Add notes
            playerNotes = new Group();
            var blankNotes = new Group();
            var note;
            for (var i=0; i < dirs.length; i++)
            {
                note = new Note(dirs[i], 50, true);
                blankNotes.addChild(note);
                note = new Note(dirs[i], 50);
                playerNotes.addChild(note);
            }

            this.score = 0;
            this.health = 100;
            this.healthBox = new PointText(new Point(100, 125));
            this.healthBox.content = "Health: " + this.health;
            this.scoreBox = new PointText(new Point(100,100));
            this.scoreBox.content = "Score: " + this.score;
            this.started = true;
            this.healthbar = new Healthbar(100, 150, this.health);
        },

        end: function() {
            document.getElementById('myCanvas').style.display = 'none';
            document.getElementById('startBox').style.display = 'block';
            document.getElementById('score').innerHTML = 'Your score was ' + this.score;
            this.audio.pause();
            playerNotes.visible = false;
            _.forEach(notes, function(group) {
                group.visible = false;
            }, this);
             
            this.started = false;
        },

        loop: function(e) {
            if (!this.started) {
                return;
            }
            if (this.audio.paused)
                this.end();
            // console.log(pressed);
            this.scoreBox.content = "Score: " + this.score;
            if (this.health <= 0)
                this.end();

            var arrows = [];

            for (var i=0; i<dirs.length;i++){
                var dir = dirs[i];
                if (Key.isDown(awds[dir]) || Key.isDown(dir))
                    arrows.push(dir);
                else
                    pressed[dir] = false;
            }

            _.forEach(playerNotes.children, function(note) {
                var enable = arrows.indexOf(note.name)>=0;
                if (enable)
                    this.pressed(note.name);
                note.img.visible = enable;

            }, this);

            _.forEach(notes, function(group){
                _.forEach(group.children, function(note) {
                    this.moveNote(note);
                }, this);
            }, this);

            if (e.time - this.lastNote >= 0.5) {
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
                this.health -= 5;
                this.healthBox.content = "Health: " + this.health;
                this.healthbar.fillColor = 'white';
                this.healthbar = new Healthbar(100, 150, this.health);
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
                // perfect
                if ((-25 < y) && (y < 75)) {
                    this.score += 25;
                    console.log("perf");
                    note.img.remove();
                    note.remove();
                }
                // good
                else if ((y < 0) && (y < 75)) {
                    this.score += 15;
                    console.log("good");
                    note.img.remove();
                    note.remove();
                }
                // ok
                else if ((y < 15) && (y < 75)) {
                    this.score += 5;
                    console.log("ok");
                    note.img.remove();
                    note.remove();
                }
                else if ((y >= 25) && (y < 75)) {
                    console.log("miss");
                    this.health -= 5;
                    this.healthBox.content = "Health: " + this.health;
                    this.healthbar.fillColor = 'white';
                    this.healthbar = new Healthbar(100, 150, this.health);
                }
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
