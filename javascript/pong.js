// Set two global vars for player1 and player2
document.addEventListener("DOMContentLoaded", function() {
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    const ball = document.getElementById("ball");
    const topBorder = document.getElementById("topBorder");
    const bottomBorder = document.getElementById("bottomBorder");
    const gameArea = document.getElementById("gameArea");


    let ballPos = {x: 0, y: 0};
    let ballVel = {x:5, y:10};
    let player1Pos = player1.getBoundingClientRect();
    let player2Pos = player2.getBoundingClientRect();

    const initialPlayer1Y = (gameArea.offsetHeight - player1.offsetHeight) / 2; // Centered vertically
    const initialPlayer2Y = (gameArea.offsetHeight - player2.offsetHeight) / 2; // Centered vertically
    player1Pos.y = initialPlayer1Y;
    player2Pos.y = initialPlayer2Y;
    
    let score = {"Player 1": 0, "Player 2" : 0};

    const paddleSpeed = 20;

    window.requestAnimationFrame(gameLoop);
    
    function gameLoop(){
        updateBallPosition();

        window.requestAnimationFrame(gameLoop);
    }

    function updateBallPosition() {
        // Update ball's position based on velocity
        ballPos.x += ballVel.x;
        ballPos.y += ballVel.y;

        ball.style.left = ballPos.x + "px";
        ball.style.top = ballPos.y + "px";
        
        player1.style.top = player1Pos.y + "px";
        player2.style.top = player2Pos.y + "px";
        // Check for collisions with the bottom border
        // checkBorderCollision();

        checkBarrierCollisions(ball, topBorder);
        checkBarrierCollisions(ball, bottomBorder);

        checkPaddleCollisions(ball, player1);
        checkPaddleCollisions(ball, player2);

        checkScore(ball, gameArea);
    }
    function checkBarrierCollisions(ball, barrier){

        const ballRect = ball.getBoundingClientRect();
        const barrierRect = barrier.getBoundingClientRect();

        if (ballRect.bottom > barrierRect.top) {
            ballVel.y = -ballVel.y; // Reverse direction if the ball hits the bottom barrier
        }
    
        // Check for collision with the top barrier
        if (ballRect.top <= barrierRect.bottom) {
            ballVel.y = -ballVel.y; // Reverse direction if the ball hits the top barrier
        }
    }

    function checkPaddleCollisions(ball, paddle) {
        const ballRect = ball.getBoundingClientRect();
        const paddleRect = paddle.getBoundingClientRect();
    
        // Check if the ball's right side is hitting the paddle's left side
        if (ballRect.right >= paddleRect.left && ballRect.left <= paddleRect.right) {
            // Check if the ball is in the vertical range of the paddle
            if (ballRect.top <= paddleRect.bottom && ballRect.bottom >= paddleRect.top) {
                ballVel.x = -ballVel.x; // Reverse direction if the ball hits the paddle
            }
        }
    }

    function checkScore(ball, gameArea) {
        ballRect = ball.getBoundingClientRect();
        gameAreaRect = gameArea.getBoundingClientRect();

        if (ballRect.right > gameAreaRect.right)
        {
            ballPos.x = 0;
            ballPos.y = 0;
            score["Player 1"] += 1;
        }
        if (ballRect.left < gameAreaRect.left)
            {
                ballPos.x = 0;
                ballPos.y = 0;
                score["Player 2"] += 1;
            }
    }

    // Handle paddle movement (Player 1 & Player 2)
    document.addEventListener("keydown", function(event) {
        const topBorderRect = topBorder.getBoundingClientRect();
        const bottomBorderRect = bottomBorder.getBoundingClientRect();
        const gameAreaRect = gameArea.getBoundingClientRect();

        switch(event.key) {
            case "ArrowUp":    // Player 2 moves up
                console.log("top border bottom: " +  + " player 2 position: " + player2Pos.top)
                player2Pos.y = Math.max(0 + topBorderRect.height, player2Pos.y - paddleSpeed); // Use bottom of top border as min
                player2.style.top = player2Pos.y + "px";
                break;

            case "ArrowDown":  // Player 2 moves down
                player2Pos.y = Math.min(0.99*(gameAreaRect.height - topBorderRect.height - player2Pos.height), player2Pos.y + paddleSpeed); 
                player2.style.top = player2Pos.y + "px";
                break;
            case "w":          // Player 1 moves up
                player1Pos.y = Math.max(0 + topBorderRect.height, player1Pos.y - paddleSpeed);
                player1.style.top = player1Pos.y + "px";
                break;
            case "s":          // Player 1 moves down
                player1Pos.y = Math.min(0.99*(gameAreaRect.height - topBorderRect.height - player2Pos.height), player1Pos.y + paddleSpeed);
                player1.style.top = player1Pos.y + "px";
                break;
        }
    });
});