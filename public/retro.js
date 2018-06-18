let horizon;
let grid;
let perspective
// let blue = [0,145,180]
let blue = [109,234,243]
// let blue = [250,229,97]
let sky 
let sun
let foreground
let pink = [233,56,137]
let font 
let fontReady = false;

function fontRead () {
    fontReady = true;
}

class Horizon {
    constructor(height){
        this.height = .65 * height;
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
class GrowingLine {
    constructor(x,y,r){
        this.pos = createVector(x, y)
        this.accel = createVector(0,0)
        this.vel = createVector(0,0)
        this.stroke = 1
        this.age = 0
    }
    update(){
        if(this.age%10 === 0) this.stroke++
        this.vel.add(this.accel)
        this.pos.add(this.vel)
    }
    render(){
        push()

        strokeWeight(this.stroke)
        line(0, this.pos.y, width, this.pos.y )

        pop()
    }
}
class MovingLine {
    constructor(start, horizon, growBool, border, color){
        this.horizon = horizon;
        this.maxSpeed = 5;
        this.start = start;
        this.pos = createVector(0, this.start);
        this.accel = createVector(0,.1)
        this.vel = createVector(0,0)
        this.inBounds = true;
        this.growing = growBool;
        this.strokeWeight = 4;
        this.border = border
        this.color = color
    }
    update(){
        this.vel.add(this.accel)
        this.vel.limit(this.maxSpeed)        
        this.pos.add(this.vel)
        // this.accel.mult(0)
    }
    grow(){
        if(frameCount % 5 === 0)this.strokeWeight++
    }
    render(){
        this.borders();
        this.update();
        if(this.growing) this.grow();

        push()
        strokeWeight(this.strokeWeight)
        // stroke(217, 4, 238)
        stroke(...this.color)
        line(0,this.pos.y, width, this.pos.y)
        pop()
    }
    borders(){
        if (this.pos.y > this.border){
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
        this.lines = this.lines.filter(line => line.inBounds)
    }
    render(){
        this.prune();
        this.makeLine();
        this.lines.forEach(line => {
            line.render();
        })
    }
    makeLine(){
        if(frameCount % 15 === 0){
            this.lines.push(new MovingLine(this.horizon, this.horizon, false, height, blue))
        }
    }
}
class Foreground {
    constructor(x, y, width, height){
        this.pos = createVector(x, y)
        this.width = width;
        this.height = height;
    }
    render(){
        push()
        noStroke();
        // fill(31,46,93)
        fill(28,30,67);
        rect(this.pos.x, this.pos.y, this.width, this.height);
        pop()
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
        let divisions = 15
        for(let i = 1; i<=divisions - 1; i++){
            let x1 = (i/divisions)*this.width
            let x2 = (i/divisions)*this.bottom - this.offSet

            push()
            strokeWeight(4)
            // stroke(217, 4, 238)
            stroke(...blue)
            line(x1, this.horizon, x2, height)
            pop()

        }
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
        this.lines = [];
    }
    setup(){
        push()
        noFill()
        for (var i = this.y; i <= this.y+this.h; i++) {
            var inter = map(i, this.y, this.y+this.h, 0, 1);
            var c = lerpColor(this.c1, this.c2, inter);
            this.lines.push({c, x: this.x, i, w: this.w})
            // stroke(c);
            // line(this.x, i, this.x+this.w, i);
          }          
        pop()
    }
    prune(){
        console.log('before',this.lines.length)
        this.lines = this.lines.filter(li => {
            console.log(li.inBounds)
            return li.inBounds
        })
        console.log('after',this.lines.length)
    }
    makeLine(){
        if(frameCount % 10 === 0) this.lines.push(new MovingLine(this.h/2, this.h, true, this.h, [18,16,67]))
    }
    
    render(){
        this.lines.forEach(li => {
            // stroke(li.c);
            stroke(31,46,93)
            line(li.x, li.i, li.x + li.w, li.i)
        })
    }
    shimmer(height){
        // this.prune();
        // this.makeLine();
        // if(this.lines.length)console.log(this.lines[0].border)
        // this.lines.forEach(li => {
        //     li.render();
        // })
        let currentDivision = 1
        let divisions = 9
        let buckets = (this.h - height) / divisions
        let taper = 2
        let newLines = this.lines.slice(height)
        let filtered = [];
        for (let i = 1; i <= divisions; i++){
            filtered.push(newLines.slice(i*buckets, i*buckets + buckets))
        }
        filtered = filtered.map(arr => {
            taper++
            return arr.filter( (ele, innerdex)=>{
                if(innerdex >= arr.length - taper) return true;
            })
        })
        filtered.forEach( outer => {
            outer.forEach( inner => {
                // stroke(inner.c);
                stroke(31,46,93)
                
                line(inner.x, inner.i, inner.x + inner.w, inner.i)
            })
        })


    }
}

class Sun {
    constructor(r ){
        this.r = r
    }
    render(){
        push()     
        // fill(250,229,97)
        fill(234,76,116)
        // fill(236,123,106)  
        // fill(224,109,178)
        // rgb(231,126,131)
        noStroke()
        ellipse(width/2, horizon.height*.60, this.r * 2, this.r *2)
    
        pop()
    }
}
function preload() {
    font = loadFont('atarian.ttf', fontRead)
}
function setup() {
    createCanvas(windowWidth, windowHeight * .50)
    background(34, 1, 32)
    sun = new Sun(150);
    horizon = new Horizon(height)
    // sky = new Sky(0, 0, width, horizon.height, color(150, 249, 250), color(30, 20, 133))
    sky = new Sky(0, 0, width, horizon.height, color(22,24,52), color(234,76,116))
    
    sky.setup();
    foreground = new Foreground(0, horizon.height, width, height - horizon.height);
    grid = new Grid(horizon.height)
    perspective = new Perspective(width, horizon.height)
    for (let i = 0; i<4; i++){
        grid.lines.push(new MovingLine(horizon.height + i*200, horizon.height, false, height, blue))
    }    
}


function draw() {

    background(19, 14, 70)
    sky.render();
    sun.render();
    sky.shimmer(horizon.height / 2);
    foreground.render();
    horizon.render();
    grid.render();
    perspective.render();
    if(fontReady){
        textFont(font)
        fill(250,229,97)
        textSize(60)
        textAlign(RIGHT)
        text('CHARLEY', width/2 - sun.r, horizon.height-10)
        textAlign(LEFT)
        text('KIRKPATRICK', width/2 + sun.r, horizon.height-10)
    }

}
