import Paddle from './paddle.js';
import InputHandler from './input.js';
import Ball from './ball.js';
import Brick from './brick.js';
import PowerUp from './powerUp.js';
import { buildLevel, level1, level2, level3 } from './levels.js';
import { detectCollision, handleCollisions, redirectBall } from './collisionDetection.js';

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
let FPS = 60; 
let levels = [level1, level2, level3];

let paddle = new Paddle();
new InputHandler(paddle);
let bricks = []; 
let powerUps = [];
let balls = [];

startLevel();
setInterval(update, 1000 / FPS);

function update(){
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    if (lives === 0){
        gameState = GAMEOVER; 
    }
    if (currentLevelIndex > levels.length - 1){
        gameState = WIN; 
    }

    if (gameState === RUNNING){
        updateElements();
        handleCollisions(balls, bricks, paddle, powerUps);

        balls.forEach((ball, ballIndex) => {
            if(ball.position.y > GAME_HEIGHT - ball.size){
                balls.splice(ballIndex, 1)
                if (balls.length === 0 ){
                    lives--; 
                    let newBall = new Ball();
                    balls.push(newBall); 
                }
            }
        });

        if(bricks.length === 0){
            currentLevelIndex++;
            startLevel(); 
        }
        drawElements(ctx);
    }
    handleMenus();
}

export function startLevel(){
    bricks = buildLevel(levels[currentLevelIndex]);
    balls = [];
    powerUps = [];
    let ball = new Ball();
    balls.push(ball); 
    let NumPowerUps = Math.floor(3*Math.random() + 1)
    for (let i = 0; i < NumPowerUps; i++){
        let powerUp = new PowerUp(); 
        powerUps.push(powerUp);
    }
}

function updateElements(){
    paddle.update();
    balls.forEach((ball) => ball.update());
    powerUps.forEach((powerUp) => powerUp.update());

}

function drawElements(ctx){
    paddle.draw(ctx);
    balls.forEach((ball) => ball.draw(ctx));
    powerUps.forEach((powerUp) => powerUp.draw(ctx));
    bricks.forEach((brick) => brick.draw(ctx));

    //draw lives
    for (let i = 0; i < lives; i++){
        ctx.drawImage(document.getElementById('ball'), BALL_SIZE + i * BALL_SIZE * 1.2, BALL_SIZE, BALL_SIZE, BALL_SIZE);
    }
}

function handleMenus(){
    if (gameState === PAUSED){
        showPauseScreen();
    }

    if (gameState === MENU){
        showMenuScreen();
    }

    if (gameState === GAMEOVER){
        showGameOverScreen();
    }

    if (gameState === WIN){
        showWinScreen();
    } 
}

function showPauseScreen(){
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Paused", GAME_WIDTH / 2, GAME_HEIGHT / 2);
}

function showMenuScreen(){
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Press SPACEBAR To Start", GAME_WIDTH / 2, GAME_HEIGHT / 2);
}

function showGameOverScreen(){
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", GAME_WIDTH / 2, GAME_HEIGHT / 2);
    ctx.font = "25px Arial";
    ctx.fillText("PRESS SPACEBAR TO PLAY AGAIN!", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100);
}

function showWinScreen(){
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("YOU WIN", GAME_WIDTH / 2, GAME_HEIGHT / 2);
    ctx.font = "25px Arial";
    ctx.fillText("Made by Richard Zhang pls hire me", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100);
}

        
        

