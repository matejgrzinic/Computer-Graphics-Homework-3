let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");


let brutecheck = document.getElementById("bruteforce");
let quadtreecheck = document.getElementById("quadtree");
let ratio = document.getElementById("ratio");
let splitLimit = document.getElementById("splitLimit");
let objects = document.getElementById("objects");
let showquadtree = document.getElementById("showquadtree");

let qc = 0;
let bc = 0;

let mousePressed = false;
let squareSize = 7;
let eventMouse;

let squares = []
let quadTree = new Quadtree(0, canvas.width, 0, canvas.height);

for (let i = 0; i < 0; i++){
  squares[i] = new Square();
  quadTree.insert(squares[i]);
}

function update(progress) {  
  qc = 0;
  bc = 0;
  checkIfPressed();
  quadTree.reset(squares);
  quadTree.checkCollision();

  bc = (squares.length * (squares.length + 1)) / 2;
  objects.innerHTML = "current objects:" + squares.length;
  brutecheck.innerHTML = "bruteforce check: " + bc + "</br>";
  quadtreecheck.innerHTML = "quadtree check: " + qc;
  ratio.innerHTML = "ratio: " + Math.round(bc / qc * 100) / 100;
  splitLimit.innerHTML = "split limit: " + Math.floor(Math.log(squares.length) / Math.log(2) + 1);
  

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    if (showquadtree.checked)
      quadTree.show();
      
    for (let i = 0; i < squares.length; i++){    
      squares[i].draw();
    }
  
}

function loop(timestamp) {
  var progress = timestamp - lastRender;

  update(progress);
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);


canvas.onmousedown = function(event) {
  mousePressed = true;
  eventMouse = event;
};

canvas.onmouseup = function(event) {
  mousePressed = false;
};

canvas.onmousemove = function(event) {
  eventMouse = event;
};

canvas.onclick = function(event) {
  let xCoord = event.clientX;
  let yCoord = event.clientY;   
  //squares.push(new Square(xCoord, yCoord));
};

function checkIfPressed(){
  if (mousePressed){
    let xCoord = eventMouse.clientX;
    let yCoord = eventMouse.clientY;
    if (xCoord + squareSize / 2 < canvas.width && yCoord + squareSize / 2 < canvas.height){  
        if (Math.random() < (squares.length / 10 + 5) / 100)   
          squares.push(new Square(xCoord, yCoord));
    }
  }
}

document.getElementById("add").onclick = function() {
  let value = document.getElementById("enterObjects").value;
  squares = [];

  for (let i = 0; i < value; i++){
    squares[i] = new Square();    
  }
  
};



