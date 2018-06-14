let horizon;
let grid;
let perspective
let blue = [0,145,180]
let sky 



class Horizon {
    constructor(height){
        this.height = .40 * height;
    }
    render(){
        push()
        strokeWeight(4)
        // stroke(217, 4, 238)
        stroke(...blue)
        line(0, this.height, width, this.height);
        pop()
    }
}
class MovingLine {
    constructor(start, horizon){
        this.horizon = horizon;
        this.maxSpeed = 10;
        this.start = start;
        this.pos = createVector(0, this.start);
        this.accel = createVector(0,.1)
        this.vel = createVector(0,1)
        this.inBounds = true;
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

        push()
        strokeWeight(4)
        // stroke(217, 4, 238)
        stroke(...blue)
        line(0,this.pos.y, width, this.pos.y)
        pop()
    }
    borders(){
        if (this.pos.y > height){
            // this.pos.y = this.horizon
            // this.vel.mult(0)
            this.inBounds = false;
        }
        
    }
}

class Grid {
    constructor(horizon){
        this.lines = [];
        this.horizon = horizon
    }
    prune(){
        this.lines.filter(line => line.inBounds)
    }
    render(){
        this.prune();
        this.makeLine();
        this.lines.forEach(line => {
            line.render();
        })
    }
    makeLine(){
        if(frameCount % 30 === 0){
            this.lines.push(new MovingLine(this.horizon, this.horizon))
        }
    }
}
class Foreground {
    constructor(width){
        this.horizonWidth = width
        this.width = this.horizonWidth * 2;
        this.start = 0 - this.width
    }
    
}
class Perspective {
    constructor(width, horizon){
        this.width = width;
        this.horizon = horizon;
        this.bottom = this.width * 2
        this.offSet = (this.bottom - this.width) / 2       
    }
    render(){
        for(let i = 1; i<=7; i++){
            let offSet = 0
            if(i < 4) offSet = -200
            if(i > 4) offSet = 200
            let x1 = (i/8)*this.width
            let x2 = (i/8)*this.bottom - this.offSet

            push()
            strokeWeight(4)
            // stroke(217, 4, 238)
            stroke(...blue)
            line(x1, this.horizon, x2, height)
            pop()

        }
    }
}




function setup() {
    createCanvas(windowWidth, 400)
    background(34, 1, 32)
    horizon = new Horizon(height)
    sky = new Sky(0, 0, width, horizon.height, color(30, 20, 133), color(209, 60, 68))
    grid = new Grid(horizon.height)
    perspective = new Perspective(width, horizon.height)
    for (let i = 0; i<4; i++){
        grid.lines.push(new MovingLine(horizon.height + i*200, horizon.height))
    }    
}

class Sky {
    constructor(x, y, w, h, c1, c2){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c1 = c1;
        this.c2 = c2;
    }
    render(){
        push()
        noFill()
        for (var i = this.y; i <= this.y+this.h; i++) {
            var inter = map(i, this.y, this.y+this.h, 0, 1);
            var c = lerpColor(this.c1, this.c2, inter);
            stroke(c);
            line(this.x, i, this.x+this.w, i);
          }
        pop()
    }
}
function draw() {
    background(19, 14, 70)

    sky.render();
    // push()
    // noFill()
    // rect(0,30, 60, 10)
    
    // fill(253,254,88)
    // noStroke()
    // ellipse(width/2, horizon.height*.50, 200, 200)

    // pop()
    horizon.render();
    grid.render();
    perspective.render();


}
