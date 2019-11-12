
var s;
var scl = 20;
var food;
var score_display;

function setup() {
    score_display = createElement("div", "Score: 0");
    score_display.style('font-size', '4 0px');    
    createCanvas(600,600);
    s = new Snake();
    s.init();
    frameRate(7);

    pickLocation();
}

function pickLocation() {
    var cols = floor(width/scl);
    var rows = floor(height/scl);

    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

// function mousePressed() {
//     s.total++;
// }

function draw() {
    background(51);
    
    if(s.eat(food)) {
        score_display.elt.innerText = "Score: " + s.total;
        pickLocation();
    }
    s.death();
    s.update();
    s.show();

    fill(255, 102, 102);
    rect(food.x, food.y, scl, scl);
}

function keyPressed() {
    if(keyCode === UP_ARROW) {
        s.dir(0, -1);
    } else if(keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    } else if(keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    } else if(keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    }
}

