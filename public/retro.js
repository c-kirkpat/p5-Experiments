let horizon;
let grid;
let perspective



class Horizon {
    constructor(height){
        this.height = .25 * height;
    }
    render(){
        strokeWeight(4)
        line(0, this.height, windowWidth, this.height);
    }
}

class Grid {
    constructor(){
        this.lines = [];
    }
    render(){
        this.lines.forEach(line => {
            line.render();
        })
    }
}
class Perspective {
    constructor(width, horizon){
        this.width = width;
        this.horizon = horizon;
    }
    render(){
        for(let i = 1; i<=7; i++){
            let offSet = 0
            if(i < 4) offSet = -200
            if(i > 4) offSet = 200
            let x = (i/8)*this.width
            console.log(x)
            strokeWeight(4)
            stroke(217, 4, 238)
            line(x, this.horizon, x + offSet, windowHeight)
        }
    }
}
class MovingLine {
    constructor(start, horizon){
        this.horizon = horizon;
        this.maxSpeed = 7;
        this.start = start;
        this.pos = createVector(0, this.start);
        this.accel = createVector(0,.1)
        this.vel = createVector(0,1)
    }
    update(){
        this.vel.add(this.accel)
        this.vel.limit(this.maxSpeed)        
        this.pos.add(this.vel)
        // this.accel.mult(0)
    }
    render(){
        this.borders();
        this.update();
        strokeWeight(4)
        stroke(217, 4, 238)
        line(0,this.pos.y, windowWidth, this.pos.y)
    }
    borders(){
        if (this.pos.y > windowHeight){
            this.pos.y = this.horizon
            this.vel.mult(0)
        }
    }
}



function setup() {
    createCanvas(windowWidth, windowHeight)
    background(34, 1, 32)
    horizon = new Horizon(windowHeight)
    grid = new Grid
    perspective = new Perspective(windowWidth, horizon.height)
    for (let i = 0; i<20; i++){
        grid.lines.push(new MovingLine(horizon.height + i*200, horizon.height))
    }    
}
function draw() {
    background(34, 1, 32)
    horizon.render();
    grid.render();
    perspective.render();
}