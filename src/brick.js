export default class Brick{

    constructor(position){
        this.image = document.getElementById('brick');
        this.position = position;
        this.width = BRICK_WIDTH;
        this.height = BRICK_HEIGHT;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.position.x , this.position.y, this.width, this.height)
    }
}