// Set two global vars for player1 and player2
document.addEventListener("DOMContentLoaded", function() {
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2");
    var ball = document.getElementById("ball");
    var border1 = document.getElementById("border1");
    var border2 = document.getElementById("border2");
})

/* 
Lets think about pong. I think initially, i can set up the position
of the paddles, the ball, and the borders


updated at each frame: 
A function for ball_position that takes current ball position,
the velocity of it is travelling at, and determines the new position
based on velocity*time between frames = new positon
<x_prev, y_prev> + <x_vel*time, y_vel*time> = <x_new, y_new>


Once i have that, i can take user input for moving the paddle 
---> one function for updating the paddle position
---> gets current position, gets current keyboard input,
---> keyboard input * multiplier = new position




*/

function ball_velocity(){}

