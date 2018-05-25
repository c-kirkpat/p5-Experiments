var ship
var bullet = [];
function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight)
  ship = new Ship();
}
function draw() {
  // put drawing code here
  
  background(0);
  ship.render();
  ship.turn ();
  ship.update();
  ship.edges();
  bullet.forEach(instance => {
    instance.render();
    instance.update();
  })
}
function keyReleased() {
  ship.setRotation(0);
  ship.boosting = false
}
function keyPressed() {
  if(keyCode == RIGHT_ARROW || key === 'D') {
    ship.setRotation(0);
    
    ship.setRotation (0.1);
  } else if (keyCode == LEFT_ARROW || key === 'A') {
    ship.setRotation(0);
    
    ship.setRotation (-0.1);
  } else if (keyCode == UP_ARROW || key === 'W') {
    ship.setRotation(0);
    
    ship.boosting = true;
  }
  if(key == ' ') {
    ship.fire();
  }
}
function Bullet(pos, heading, rotation) {
  this.pos = createVector(pos.x, pos.y)
  this.r = 4
  this.heading = heading
  this.vel = p5.Vector.fromAngle(this.heading);
  this.update = function () {
    // this.setSpeed();
    this.pos.add(this.vel.mult(1.2));
  }
  // this.setSpeed = function () {
  //   const force = p5.Vector.fromAngle(this.heading);
  //   this.vel.add(force)
  // }
  this.render = function() {
    push()
    translate(this.pos.x, this.pos.y);
    // rotate(this.heading + PI/2)
    
    noFill();
    stroke(255)
    ellipse(0,0,this.r*2)
    pop();
  }
}
function Ship() {
  this.pos = createVector(width/2, height/2);
  this.r = 10;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0,0);
  this.fire = function (){
    bullet.push(new Bullet(this.pos, this.heading, this.rotation))
  }
  this.update = function() {
    // console.log(ship.pos.x - ship.r, width)
    if(this.boosting){
      this.boost()
    }
    
    this.pos.add(this.vel);
    this.vel.mult(.99)
  }
  this.boost = function () {
    const force = p5.Vector.fromAngle(this.heading);
    force.mult(.5)
    this.vel.add(force)
  }
  this.render= function() {
    push()
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI/2)
    
    noFill();
    
    stroke(255)
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r)
    pop()
  }
  this.setRotation = function (a) {
    this.rotation = a;
  }
  this.turn = function (angle) {
    this.heading += this.rotation;

  }
  this.edges = function () {
    if(this.pos.x > width + this.r){
      this.pos.x = -this.r
    } else if(this.pos.x < -this.r){
      this.pos.x = width - this.r
    }
    if(this.pos.y > height + this.r){
      this.pos.y = -this.r
    } else if (this.pos.y < -this.r){
      this.pos.y = height - this.r
    }
  }
}