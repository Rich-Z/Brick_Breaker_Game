import Ball from './ball.js';

export function detectCollision(ball, gameObject){
    let bottomOfBall = ball.position.y + ball.size; 
    let topOfBall = ball.position.y;

    let bottomOfObject = gameObject.position.y + gameObject.height;
    let topOfObject = gameObject.position.y 
    let leftSideOfObject = gameObject.position.x;
    let rightSideOfObject = gameObject.position.x + gameObject.width;

    if (bottomOfBall > topOfObject && 
        topOfBall < bottomOfObject &&
        ball.position.x + ball.size > leftSideOfObject && 
        ball.position.x < rightSideOfObject
    ) {
        return true;
    } else {
        return false;
    }
}


export function handleCollisions(balls, bricks, paddle, powerUps){
    balls.forEach((ball) => {
            if (detectCollision(ball, paddle)){
                redirectBall(ball, paddle);
            }
        }
    );

    bricks.forEach((brick, brickIndex) => {
            balls.forEach((ball) => {
                if (detectCollision(ball, brick)){
                        ball.speed.y = -ball.speed.y;
                        bricks.splice(brickIndex, 1)
                    }
                }
            ); 
        }
    );

    powerUps.forEach((powerUp, powerUpIndex) => {
            balls.forEach((ball) => {
                if (detectCollision(ball, powerUp)){
                        powerUps.splice(powerUpIndex, 1)
                        for(let i = 0; i < 3; i++){
                            let newBall = new Ball();
                            balls.push(new Ball(ball.position.x, ball.position.y));
                        }
                    }
                }
            ); 
        }
    );
}

export function redirectBall(ball, paddle){
    ball.speed.y = -ball.speed.y;
    ball.position.y = paddle.position.y - ball.size; 

    let MiddleOfPaddle = paddle.position.x + paddle.width / 2;
    let distanceFromCenter = 0;
    distanceFromCenter = ball.position.x - MiddleOfPaddle;
    ball.speed.x += distanceFromCenter/10;
}   