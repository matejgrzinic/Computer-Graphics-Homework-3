class Quadtree{
    constructor(x1, x2, y1, y2){
        this.elements = [];
        this.boundary = { x1 : x1, x2: x2, y1: y1, y2: y2};
        this.children = [];
        this.divided = false;
    }

    show(){
        if (this.divided){
            ctx.beginPath();
            ctx.moveTo((this.boundary.x2 + this.boundary.x1) / 2, this.boundary.y1);
            ctx.lineTo((this.boundary.x2 + this.boundary.x1) / 2, this.boundary.y2);               
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.boundary.x1, (this.boundary.y2 + this.boundary.y1) / 2);
            ctx.lineTo(this.boundary.x2, (this.boundary.y2 + this.boundary.y1) / 2);            
            ctx.stroke();
           
            this.children[0].show();
            this.children[1].show();
            this.children[2].show();
            this.children[3].show();            
        }
    }

    reset(squares){
        this.elements = [];
        this.children = [];
        this.divided = false;

        for (let e of squares){
            e.update();
            this.insert(e);
            e.colliding = false;
        }
    }

    insert(element){
        if (!this.divided){

            this.elements.push(element);
            
            if (this.elements.length > (Math.log(squares.length) / Math.log(2)) + 1){
                this.divided = true;
                
                this.children[0] = new Quadtree(this.boundary.x1, (this.boundary.x2 + this.boundary.x1) / 2, this.boundary.y1, (this.boundary.y2 + this.boundary.y1) / 2);
                this.children[1] = new Quadtree((this.boundary.x2 + this.boundary.x1) / 2, this.boundary.x2, this.boundary.y1, (this.boundary.y2 + this.boundary.y1) / 2);
                this.children[2] = new Quadtree(this.boundary.x1, (this.boundary.x2 + this.boundary.x1) / 2, (this.boundary.y2 + this.boundary.y1) / 2, this.boundary.y2);
                this.children[3] = new Quadtree((this.boundary.x2 + this.boundary.x1) / 2, this.boundary.x2, (this.boundary.y2 + this.boundary.y1) / 2, this.boundary.y2);  
                
                for (let e of this.elements){
                    this.insertInto(e);
                }
            }
        }
        else{
            this.insertInto(element);            
        }
    }

    checkCollision(){
        if(this.divided){
            for (let child of this.children){
                child.checkCollision();
            }
        }
        else{
            for (let i = 0; i < this.elements.length; i++){
                for (let j = i; j < this.elements.length; j++){                    
                    if (isCollision(this.elements[i], this.elements[j])){
                        this.elements[i].colliding = true;
                        this.elements[j].colliding = true;
                    }                                    
                }
            }
        }
    }

    insertInto(element){
        if (element.x - squareSize / 2 < (this.boundary.x2 + this.boundary.x1) / 2 && (element.y - squareSize / 2 < (this.boundary.y2 + this.boundary.y1) / 2)){
            this.children[0].insert(element);
        }
        if (element.x + squareSize / 2 >= (this.boundary.x2 + this.boundary.x1) / 2 && (element.y - squareSize / 2 < (this.boundary.y2 + this.boundary.y1) / 2)){
            this.children[1].insert(element);
        }
        if (element.x - squareSize / 2 < (this.boundary.x2 + this.boundary.x1) / 2 && (element.y + squareSize / 2 >= (this.boundary.y2 + this.boundary.y1) / 2)){
            this.children[2].insert(element);
        }
        if (element.x >= (this.boundary.x2 + this.boundary.x1) / 2 && (element.y + squareSize / 2 >= (this.boundary.y2 + this.boundary.y1) / 2)){
            this.children[3].insert(element);
        }
    }
}

function isCollision(elementA, elementB){
    qc++;
    distance = Math.sqrt(Math.pow((elementA.x - elementB.x), 2) + Math.pow((elementA.y - elementB.y), 2));
    //console.log(distance);
    if (distance > 0 && distance <= squareSize)
        return true;
    return false;
}