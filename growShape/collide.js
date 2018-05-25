var head
var tails = [];
var prey
var preys = []
function setup() {
  createCanvas(800, 800);
  head = new Head
  // tail1 = new Tail1
  for (let i = 0; i < 2; i++) {
    tails.push(new Tail1)
  }
  for (let i = 0; i<50; i++){
    preys.push(new Prey(i))
  }
}

function draw() {
  background(0);


  for (let i = 0; i < tails.length; i++) {
    if (i === tails.length - 1) {
      tails[i].render()
      tails[i].update(head.pos.x, head.pos.y)
    } else {
      tails[i].render()
      tails[i].update(tails[i + 1].pos.x, tails[i + 1].pos.y)
    }
  }
  preys = preys.filter(prey => {if(!prey.dead)return true}).sort((a,b) => a.distance - b.distance)
  preys.forEach(prey => {
    if(prey.dead === false){
      prey.render()
      prey.eaten()
      prey.procreate()
      prey.bounce()
      prey.update()
      prey.edgeCheck()
    }
  })
  head.render()
  head.edgeCheck()  
  head.hunt()  
  head.update()
  // tail1.render()
  // tail1.update(head.pos.x, head.pos.y)

}
function keyPressed() {
  if (key == ' ') {
    tails.unshift(new Tail1)
  }
}
function Head() {
  this.pos = createVector(width / 2, height / 2)
  this.mouse = createVector(0, 0)
  this.r = 30
  this.target = preys[0];
  this.vel = createVector(0, 0)
  this.accel = createVector(0, 0)
  this.update = function () {
    // if (this.offscreen()) {
    //   console.log('rip')
    //   // this.mouse = createVector(mouseX, mouseY);
    //   // this.accel = this.mouse.sub(this.pos).normalize().mult(.03)
    //   this.accel = createVector(width/2, height/2)
    // } else {
    //   // this.accel = p5.Vector.random2D().normalize().mult(.6)
    //   // this.vel.add(this.accel)
      // this.mouse = createVector(mouseX, mouseY);
      // this.accel = this.mouse.sub(this.pos).normalize().mult(.03)
    // }
    // this.accel = p5.Vector.random2D().normalize().mult(.6)

    // this.mouse = createVector(mouseX, mouseY);
    // this.accel = this.mouse.sub(this.pos).normalize().mult(.03)
    this.accel = createVector(this.target.pos.x, this.target.pos.y).sub(this.pos.x, this.pos.y).normalize().mult(1) 
    this.vel.add(this.accel)
    this.vel.limit(1.5)
    this.pos.add(this.vel)
  }
  this.hunt = function() {
    // if(this.target === null){
      this.target = preys[0]
    // }
    // if(this.target === null){
    //   this.targets = preys.filter(prey => {
    //     if(dist(prey.pos.x, prey.pos.y, this.pos.x, this.pos.y) < width/4){
    //       return true
    //     }
    //   })
    //   this.target = this.targets.length !== 0 ? this.targets[Math.floor(Math.random()*this.targets.length)] : preys[Math.floor(Math.random()*preys.length)]
    // } else {
    //   if(dist(this.target && this.pos.x, this.pos.y, this.target.pos.x, this.target.pos.y) > 100) {
    //     this.target = null;
    //   }
    // }
  }
  
  this.edgeCheck = function() {
    if(this.pos.x > width) {
      this.pos.x = width;
      this.vel.mult(-1)
    } else if (this.pos.x < 0){
      this.vel.mult(-1)
      this.pos.x = 0
    }

    if(this.pos.y > height) {
      this.vel.mult(-1)
      this.pos.y = height
    } else if (this.pos.y < 0){
      this.vel.mult(-1)
      this.pos.y = 0
    }
  
  }
  this.render = function () {
    push()
    translate(this.pos.x, this.pos.y);
    stroke(255)
    fill(0)
    ellipse(0, 0, this.r)
    pop()
  }
}


function Prey(index) {
  this.pos = createVector(random(width), random(height))
  this.r = 5
  this.index = index
  this.energy = 15
  this.dead = false
  this.fed = false
  this.collision = false
  // this.sex = !!Math.floor(Math.random()*2)
  this.age = Math.floor(Math.random()* 100)
  this.vel = createVector(0, 0)
  this.accel = createVector(0, 0)
  this.predatorVector = createVector(head.pos.x, head.pos.y);

  this.danger = function () {
    if (dist(this.pos.x, this.pos.y, head.pos.x, head.pos.y) < 150) return true
    return false
  }
  this.applyForce = function (force) {
    this.accel.add(force)
  }
  this.bounce = function () {
    
  }
  this.eaten = function () {
    if(dist(this.pos.x, this.pos.y, head.pos.x, head.pos.y) < head.r - this.r){
      this.dead = true;
      head.target = null;
      if(!this.fed) {
        this.fed = !this.fed
        const newTail = new Tail1   
        newTail.pos.x = tails[0].pos.x
        newTail.pos.y = tails[0].pos.y     
        tails.unshift(newTail)
      }
    }
  }
  this.procreate = function () {
    this.mates = preys.filter(prey => {
      if(dist(this.pos.x, this.pos.y, prey.pos.x, prey.pos.y) < this.r && prey.age > 900 ){
        return true;
      }
    })
    
    if(this.mates.length > 0 && this.age > 255){
      console.log('baby!')
      this.age = 0
      this.mates.forEach(mate => mate.age = Math.floor(Math.random()*200))
      let newPrey = new Prey
      newPrey.pos = createVector(this.pos.x, this.pos.y)
      preys.push(newPrey)
    }
  }
  this.update = function () {
    this.distance = dist(this.pos.x, this.pos.y, head.pos.x, head.pos.y)
    if (this.danger()) {
      this.predatorVector = createVector(head.pos.x, head.pos.y);
      this.accel = this.predatorVector.sub(this.pos).rotate(180).mult(0.03)
    } else {
      if (this.resting) {
        if (++this.energy === 15) this.resting = !this.resting

      } else {
        if (--this.energy <= 0) this.resting = !this.resting
        this.accel = p5.Vector.random2D().normalize().mult(.8)
      }
    }
    this.accel.limit(.5)
    this.pos.add(this.accel) 
    this.age++
  }

  this.render = function () {
    if(!this.dead){
      push()
      translate(this.pos.x, this.pos.y)
      rotate(this.heading + PI / 2)
      stroke(255)
      // if(this.sex){
      //   fill(255,this.age < 255 ? 255-this.age: 0,240)
      // } else {
        fill(this.age < 255 ? 255-this.age: 0, this.age < 255 ? 255-this.age: 0,255)
      // }
      ellipse(0, 0, this.r * 2)
      pop()
    }

  }
  this.edgeCheck = function() {
    if(this.pos.x > width) {
      this.pos.x = width;
      this.vel.mult(-1)
    } else if (this.pos.x < 0){
      this.vel.mult(-1)
      this.pos.x = 0
    }

    if(this.pos.y > height) {
      this.vel.mult(-1)
      this.pos.y = height
    } else if (this.pos.y < 0){
      this.vel.mult(-1)
      this.pos.y = 0
    }
  }
  
}
function Tail1(x, y) {
  this.pos = createVector(head.x, head.y)
  this.r = 30
  this.vel = createVector(head.x, head.y)
  // this.accel = createVector(0, 0)
  this.collision = function (x, y) {
    if (dist(this.pos.x, this.pos.y, x, y) < this.r / 2) return true
    return false
  }

  this.update = function (x, y) {
    let trackingX = x
    let trackingY = y
    let trackingVector = createVector(trackingX, trackingY)
    this.accel = trackingVector.sub(this.pos).normalize().mult(.5)
    this.vel.add(this.accel)
    if (this.collision(trackingX, trackingY)) this.vel.mult(.4)
    this.vel.limit(2)
    this.pos.add(this.vel)
  }
  this.edges = function () {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r
    } else if (this.pos.x < -this.r) {
      this.pos.x = width - this.r
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r
    } else if (this.pos.y < -this.r) {
      this.pos.y = height - this.r
    }
  }
  this.render = function () {
    push()
    translate(this.pos.x, this.pos.y);
    stroke(255)
    ellipse(0, 0, this.r)
    pop()
  }
}
// function Tail (index) {
//   console.log(index)
//   this.pos = createVector(index, index)
//   this.headPos = tails[index+1] ? createVector(tails[index+1].pos.x, tails[index+1].pos.y) : createVector(head.pos.x, head.pos.y)
//   this.r = 30
// 	this.vel = createVector(0,0)
// 	this.accel = createVector(0,0)
// 	this.update = function () {
//     this.distance = dist(this.pos.x, this.pos.y, this.headPos.x, this.headPos.y)
//     this.accel = this.headPos.sub(this.pos).normalize().mult(1)
//     if(this.distance < this.r){
//       this.accel = this.headPos.cross(this.pos).normalize().mult(1)

//     }
// 		this.vel.add(this.accel)
//     this.vel.limit(1)

//     this.pos.add(this.vel)

// 	}
	//   this.render= function() {
  //   push()
  //   translate(this.pos.x, this.pos.y);    
  //   noFill();
  //   stroke(255)
  //   ellipse(0,0,this.r)
  //   pop()
  // }
// }
