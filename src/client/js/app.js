"use strict";
var io = require('socket.io-client');
var socket = io();

window.Game = {};
Game.canvas = new Game.Canvas();

var player = null; /* {id, x, y} */
var actors = {}; /* {id: {id, x, y}} */
var mouse = {x: window.innerWidth/2, y: window.innerHeight/2}

window.onload = function() {
    // Ask the server if we can join the game.
    socket.emit('user-join');

    socket.on('welcome', function(playerInfo) {
        player = new Player(playerInfo.id, playerInfo.x, playerInfo.y);
        actors[player.id] = player;
        socket.emit('confirm-welcome')
    });

    socket.on('update-world', function(worldData) {
        actors = {};
        worldData.forEach(function(actor) {
            if (!player)
                return;
            // Update each actor in the world, and create new actors if necessary.
            if (!actors[actor.id]) {
                actors[actor.id] = new Player(actor.id, actor.x, actor.y);
            }
        });
    });

    var tick = false; // Tickrate is half of framerate.
    // TODO: Make tickrate a fixed constant instead of being dependent on framerate.
    function animate() {
        requestAnimationFrame(animate);
        Game.canvas.clear();
        drawActors();

        player.x += (mouse.x > player.x)? 1 : -1;
        player.y += (mouse.y > player.y)? 1 : -1;

        // Update player position on server.
        if (tick) {
            tick = false;
            socket.emit('heartbeat', player);
        } else {
            tick = true;
        }
    } 
}

function drawActors() {
    actors.forEach(function(actor) {
        actor.draw(Game.canvas);
    })
}

// Need to inform server when player resizes window.
window.addEventListener('resize', function() {
    socket.emit('windowResized', { screenWidth: window.innerWidth, screenHeight: window.innerHeight });
});

// Control (move elsewhere eventually)
window.addEventListener('mousemove', function(mouseEvent) {
    if (!player) return;
    mouse.x = mouseEvent.x;
    mouse.y = mouseEvent.y;
});