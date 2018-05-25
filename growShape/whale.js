let mover
let path
let debug = true
let prevPosition = {x:0, y:0}
let newPath = []
let movers = []

function setup() {
    createCanvas(800,800)
    // mover = new Mover(width/2, height/2)
    for(let i = 0; i<15; i++){
        movers.push(new Mover(random(0,width),random(0,height)))
    }
    path = new Path
    path.points = [
        createVector(0, height/2),
        createVector(width, height/1.5)
    ]
}

function draw() {
    background(122)
    path.render()
    let mouse = createVector(mouseX, mouseY)
    movers.forEach((m)=>{
        m.update()
        m.render()
        m.borders(path)
    })
    // mover.follow(path)
    // mover.update()
    // mover.render()
    // mover.borders(path)
    
}
// function mousePressed() {
//     path.points = [
//         createVector(0, mouseY)
//     ]
// }

function mouseDragged() {
    
    if(dist(prevPosition.x, prevPosition.y, mouseX, mouseY)>100){
        console.log('wao')
        prevPosition.x = mouseX
        prevPosition.y = mouseY
        newPath.push(createVector(prevPosition.x, prevPosition.y))
    }
}
function mouseReleased() {
    console.log('hi')
    path.points = [createVector(0, mouseY), ...newPath, createVector(width, mouseY) ]
    // path.points.push(createVector(width, height/2))
    newPath = [];
    
}
class Mover {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.acceleration = createVector(0,0)
        this.velocity = createVector(2,0)
        this.r = 4
        this.maxSpeed = 4
        this.maxForce = 0.2
        this.futurePos = this.futurePos.bind(this)
    }


    update() {
        const followForce = this.follow(path)
        const alignForce = this.align(movers)
        const sepForce = this.separation(movers)
        followForce.mult(0.5)
        alignForce.mult(0.8)
        sepForce.mult(1.4)
        this.applyForce(followForce)
        this.applyForce(alignForce)
        this.applyForce(sepForce)
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxSpeed)
        this.pos.add(this.velocity)
        this.acceleration.mult(0)
    }

    applyForce(force) {
        this.acceleration.add(force)
    }
    separation(allMovers) {
        let desiredSpace = 20
        let steer = createVector(0,0)
        let count = 0;
        for(let i = 0; i<allMovers.length; i++){
            let d = dist(this.pos, allMovers[i].pos)
            if(d>0 && d< desiredSpace){
                let diff = p5.Vector.sub(this.pos, allMovers[i].pos)
                diff.normalize()
                diff.div(d)
                steer.add(diff)
                count++
            }
        }
        if(count>0){
            steer.div(count)
        }
        if(steer.mag() > 0) {
            steer.setMag(this.maxSpeed)
            steer.sub(this.velocity)
            steer.limit(this.maxForce)
        }
        if(debug){
            
            fill(200)
            stroke(200)
            line(this.pos.x, this.pos.y, steer.x, steer.y)
        }
        return this.seek(steer)
    }
    seek(target) {
        let desired = p5.Vector.sub(target, this.pos)
        let distance =   desired.mag()
        if(distance === 0) return
        // if( distance < 100) {
        //     let newMag = map(distance, 0, 100, 0, this.maxSpeed);
        //     desired.setMag(newMag)
        // } else {
            desired.setMag(this.maxSpeed)            
        // }
        let steer = p5.Vector.sub(desired, this.velocity)
        steer.limit(this.maxForce)
        // this.applyForce(steer)
        return steer
    }

    render() {
        let theta = this.velocity.heading() + PI /2;
        fill(255)
        stroke(200)
        push()
        translate(this.pos.x, this.pos.y)
        rotate(theta)
        triangle(0, -this.r*2, -this.r, this.r*2, this.r, this.r*2)
        pop()
    }

    applyForce(force) {
        this.acceleration.add(force)
    }

    follow(pathInstance) {
        let futureSelf = this.futurePos()
        let currentMinDistance = 10000
        let currentTarget = null
        let currentNormal = null
        for(let i = 0; i<pathInstance.points.length -1; i++){
            let a = pathInstance.points[i]
            let b = pathInstance.points[i+1]
            let normalPoint = getNormalPoint(futureSelf, a, b)
            if(normalPoint.x < a.x || normalPoint.x > b.x){
                normalPoint.x = b.x
                normalPoint.y = b.y
            }
            let dir = p5.Vector.sub(b, a)
            dir.setMag(10)
            let target = p5.Vector.add(normalPoint, dir)
            let distance = p5.Vector.dist(futureSelf, normalPoint)
            if(distance < currentMinDistance){
                currentMinDistance = distance
                currentTarget = target
                currentNormal = normalPoint
            }
        }
        if(currentMinDistance > pathInstance.radius){
            return this.seek(currentTarget)
        }
        // let a = pathInstance.points[0]
        // let b = pathInstance.points[1]

        // let normalPoint = getNormalPoint(futureSelf, a, b)

        // //Find target point
        // let dir = p5.Vector.sub(b, a);
        // dir.setMag(10)
        // let target = p5.Vector.add(normalPoint, dir)

        // let distance = p5.Vector.dist(futureSelf, normalPoint)
        // if(distance > pathInstance.radius){
        //     console.log('pingaling')
        //     this.seek(target)
        // }

        // if(debug){
        //     fill(200)
        //     stroke(200)
        //     line(this.pos.x, this.pos.y, futureSelf.x, futureSelf.y)
            
        //     fill(200)
        //     stroke(200)
        //     line(futureSelf.x, futureSelf.y, currentNormal.x, currentNormal.y)
        // }
        return createVector(0,0)
        
    }

    align(allMovers) {
        let sum = createVector(0,0);
        let count = 0;
        let maxNeighborDist = 30
        for (let i = 0; i<allMovers.length; i++){
            let distance = dist(this.pos, allMovers[i].pos)
            if(distance > 0 && d<maxNeighborDist){
                sum.add(movers[i].velocity)
                count++
            }
        }
        if (count > 0){
            sum.div(count)
            sum.normalize()
            sum.mult(this.maxspeed)
            let steer = p5.Vector.sub(sum, this.velocity)
            steer.limit(this.maxForce)
            return steer
        } else {
            return createVector(0,0)
        }
    }

    futurePos() {
        let velocityClone = this.velocity.copy()
        velocityClone.setMag(50)
        return p5.Vector.add(this.pos, velocityClone)
    }

    borders (p) {
        if (this.pos.x > p.points[p.points.length-1].x + this.r) {
            this.pos.x = p.points[0].x - this.r
            this.pos.y = p.points[0].y + (this.pos.y - p.points[p.points.length-1].y)
        }
    }
}

class Path {
    constructor() {
        this.radius = 20
        // this.start = createVector(0, height/3);
        // this.end = createVector(width, 2*height/3)
        this.points = []
    }
    addPoint (x, y) {
        let point = createVector(x, y)
        this.points.push(point)
    }
    render() {
        push()
        strokeWeight(this.radius * 2)
        stroke(200, 100)
        noFill()
        beginShape();
        for(let i = 0; i<this.points.length; i++){
            vertex(this.points[i].x, this.points[i].y)
        }
        endShape();
        pop()
        // line(this.start.x, this.start.y, this.end.x, this.end.y)

        // strokeWeight(1)
        // stroke(200)
        // line(this.start.x, this.start.y, this.end.x, this.end.y)
    }
}


function getNormalPoint(point, a, b) {
    let aPoint = p5.Vector.sub(point, a)
    let ab = p5.Vector.sub(b, a)
    ab.normalize()
    ab.mult(aPoint.dot(ab))
    return p5.Vector.add(a, ab)
}
// let whale

// function setup() {
//     createCanvas(800, 800)
//     whale = new Whale
//     // whale.add(whale.pos.x, whale.pos.y - 40, whale.r - 20)
//     // whale.add(whale.pos.x, whale.pos.y - 20, whale.r - 30)
//     let up = true;
//     for (let i = 1; i < 8; i++) {
//         up = i > 4 ? false : true;
//         whale.add(whale.pos.x, whale.pos.y + (i * 40), up ? i % 5 * 30 : (5 - i % 5) * 30, i)
//     }

// }

// function draw() {
//     background(0)
//     whale.render()
// }

// function Whale() {
//     this.pos = createVector(width / 2, height / 2)
//     this.r = 50
//     this.segments = []
//     this.head = new WhaleHead(this.pos.x, this.pos.y + (8 * 40), (5 - 8 % 5) * 30)
//     this.render = function () {
//         this.segments.forEach((segment) => {
//             segment.update()
//             segment.render()
//         })
//         this.head.render()
//     }
//     this.add = function (x, y, r, i) {
//         this.segments.push(new Segment(x, y, r, i))
//     }

// }
// function WhaleHead(x, y, r) {
//     this.pos = createVector(x, y)






//     this.r = r
//     this.acceleration = createVector(0, 0)
//     this.velocityoctiy = createVector(0, 0)
//     this.render = function () {
//         stroke(140)
//         translate(mouseX, mouseY)
//         ellipse(0, 0, this.r, this.r / 3.5)
//     }
// }
// function Segment(x, y, r, index) {
//     this.pos = createVector(x, y)
//     this.accel = createVector(0,0)
//     this.velocityocity = createVector(0,0)
//     this.r = r
//     this.index = index
//     console.log(x, y, r)
//     this.render = function () {
//         push()
//         //

//         stroke(255)
//         translate(this.pos.x, this.pos.y)
//         ellipse(0, 0, this.r, this.r / 3.5)

//         //
//         pop()
//     }
//     this.calculateFollow = function () {
//         let desired
//         if (this.index < 6) {
//             desired = whale.segments[this.index + 1].pos.sub(this.pos)
//         } else {
//             console.log(this.index)
//             desired = whale.head.pos.sub(this.pos)
//         }
//         return desired
//     }
//     this.applyForce = function(force) {
//         this.accel.add(force)
//     }
//     this.update = function () {
//         this.applyForce(this.calculateFollow())
//         this.velocityocity.add(this.accel)
//         this.pos.add(this.velocityoctiy)
//         this.accel.mult(0)
//     }

// }