let canvas;
let context;
let gameLoop;

const boardX = 300;
const boardY = 300;
const paddleH = 10;
const paddleD = boardY - paddleH;
const paddleW = 150;

let paddleX = 150;
let ballX = 150;
let ballY = 150;
let ballDX = Math.random(-4, -3, -2, 2, 3, 4);
let ballDY = Math.random(-4, -3, -2, 2, 3, 4);

function drawGameCanvas() {
    canvas = document.getElementById('gameBoard')

    if (canvas.getContext) {
        context = canvas.getContext('2d');
        gameLoop = setInterval(draw, 2);
        window.addEventListener('keydown', keyInput)
    }
}

function gameOverHide() {
    const gameOverMsg = document.getElementById('gameOver');
    
    if (gameOverMsg.style.display === "none") {
        gameOverMsg.style.display = "block";
    } else {
        gameOverMsg.style.display = "none";
    }
}
gameOverHide();

function gameOverShow() {
    const gameOverMsg = document.getElementById('gameOver');
}

function draw() {
    context.clearRect(0, 0, boardX, boardY);

    context.fillStyle = 'thistle'
    context.beginPath();
    context.rect(0, 0, boardX, boardY);
    context.closePath();
    context.fill();

    context.fillStyle = 'tomato';
    context.beginPath();
    context.arc(ballX, ballY, 15, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

    context.fillStyle = 'navy';
    context.beginPath();
    context.rect(paddleX, paddleD, paddleW, paddleH);
    context.closePath();
    context.fill();

    ballX += ballDX;
    ballY += ballDY;

    if (ballX + ballDX > boardX - 15 || ballX + ballDX < 15) {
        ballDX = -ballDX;
    }

    if (ballY + ballDY < 15) {
        ballDY = -ballDY;
    } else if (ballY + ballDY > boardY -15) {
        if (ballX > paddleX && ballX < paddleX + paddleW) {
            ballDY = -ballDY;
            score + 1;
            // AQUÍ TOCA
        } else {
            clearInterval(gameLoop);
            gameOverHide();
        }
    }
}

function keyInput(e) {
    switch (e.keyCode) {
        case 37:
            paddleX -= 20;
            if (paddleX < 0 ) {
                paddleX = 0;
            }
            break;
        case 39:
            paddleX += 20;
            if (paddleX > boardX - paddleW) {
                paddleX = boardX - paddleW;
            }
            break;
    }
}

// Esto es lo que se me ocurre para reiniciar el juego

const restartGame = document.querySelector('button');

restartGame.onclick = function() {
    location.reload();
}

// let score = document.querySelector('score');

// function addScore() {
//     score + Number(1);
// }
// addScore();

drawGameCanvas();