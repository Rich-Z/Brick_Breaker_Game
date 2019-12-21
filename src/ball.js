export default class Ball{

    constructor(x = Math.floor(Math.random()*GAME_WIDTH), y = 200) {
        this.image = document.getElementById('ball');
        this.size = BALL_SIZE;
        this.position = {x, y};
        this.speed = {x:-Math.floor(-8*Math.random()+ 4), y: -1*(Math.random()*2 + 5 )};
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x , this.position.y, this.size, this.size);
    }

    update(){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if(this.position.x > GAME_WIDTH - this.size || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }

        if(this.position.y < 0){
            this.speed.y = -this.speed.y;
        }
    }

}