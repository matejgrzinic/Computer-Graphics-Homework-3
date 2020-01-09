class Square{
    constructor(xCoord, yCoord){

        if (xCoord && yCoord){
            this.x = xCoord;
            this.y = yCoord;
        }
        else{
            this.x = Math.random() * (canvas.width - squareSize);
            this.y = Math.random() * (canvas.height - squareSize);
        }

        this.xSpeed = Math.random() * 2 - 1;
        this.ySpeed = Math.random() * 2 - 1;   
        this.colliding = false;
        
    }

    update(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x - squareSize / 2 < 0 || this.x + squareSize / 2 > canvas.width){
            this.xSpeed *= -1;
        }
        if (this.y - squareSize / 2 < 0 || this.y + squareSize / 2 > canvas.height){
            this.ySpeed *= -1;
        }
    }

    draw(){
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(this.x, this.y, squareSize / 2, 0, 2 * Math.PI);
        if (this.colliding)
            ctx.fill();
        ctx.stroke();
        //ctx.fillRect(this.x, this.y, squareSize, squareSize);
    }
}

