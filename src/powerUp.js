export default class PowerUp{

    constructor() {
        this.image = document.getElementById('powerUp');
        this.size = 50;
        this.positionYLimit = GAME_HEIGHT * 0.8; 
        this.width = this.size;
        this.height = this.size;
        this.reset();
    }

    reset(){
        this.position = {x: Math.floor(Math.random()*GAME_WIDTH), y: Math.floor(Math.random()*GAME_HEIGHT*0.8)};
        this.speed = {x: Math.random() > 0.5 ? 1 : -1, y: Math.random() > 0.5 ? 1 : -1};
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x , this.position.y, this.width, this.height);
    }

    update(){
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if(this.position.x > GAME_WIDTH - this.size || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }

        if(this.position.y < 0 || this.position.y > this.positionYLimit){
            this.speed.y = -this.speed.y;
        }
    }

}