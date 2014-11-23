/*
 * main.js: set up the game and splash screen
 */

define(function(require) {
    'use strict';

    // prevent JS files from getting cached (for development)
    requirejs.config({urlArgs: 'bust=' + (new Date()).getTime()});

    var game = require('game');
    document.getElementById('start').addEventListener('click', function() {
        document.getElementById('startBox').style.display = 'none';
        document.getElementById('myCanvas').style.display = 'block';
        game.start();
    });
});
