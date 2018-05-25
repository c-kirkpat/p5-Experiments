// // var ps
var body
function setup() {
    createCanvas(windowWidth, windowHeight)
    body = new Body
}
function draw() {
    background(0);
    const gravity = createVector(0,1)
    body.render()
}

function Body () {
    this.segments = [];
    this.addSegment = function(r) {
        let newSegment = new Segment
        newSegment.r = r
        this.segments.push(newSegment)
    }
}
// // function keyPressed() {
// //     if(key == ' '){
// //         ps.add();
// //     }
// // }
// // function Particle() {
// //     this.pos = createVector(mouseX, mouseY)
// //     this.r = 20
// //     this.vel = p5.Vector.random2D().normalize().mult(1)
// //     this.accel = p5.Vector.random2D().normalize().mult(1)
// //     this.update = function () {
// //         this.vel.add(this.accel)
// //         this.vel.limit(10)
// //         this.pos.add(this.vel)
// //         this.accel.mult(0)
// //     }

// //     this.render = function () {
// //         push()
// //         translate(this.pos.x, this.pos.y)
// //         stroke(255)
// //         fill(255)
// //         ellipse(0, 0, this.r * 2)
// //         pop()
// //     }

// //     this.edges = function () {
// //         if(this.pos.x > width){
// //             this.pos.x = width
// //             this.accel.mult(-1)
// //         } else if (this.pos.x < 0){
// //             this.pos.x = 0
// //             this.accel.mult(-1)
// //         }
// //         if(this.pos.y > height){
// //             this.pos.y = height
// //             this.accel.mult(-1)
// //         } else if(this.pos.y < 0){
// //             this.pos.y = 0
// //             this.accel.mult(-1)
// //         }
// //     }
// // }
// // function ParticleSystem() {
// //     this.particles = []
// //     this.add = function (particle) {
// //         let newParticle = particle || new Particle
// //         this.particles.push(newParticle)
// //     }
// //     this.applyForce = function(force) {
// //         this.particles.forEach(part => part.accel.add(force))
// //     }
// //     this.renderAll = function() {
// //         this.particles.forEach(part => {
// //             part.edges()
// //             part.update()
            
// //             part.render()
// //         })    
// //     }

// // }




// var flock;
// var whale;
// function setup() {
//   createCanvas(800,800);
//   whale = new Whale;
//   flock = new Flock();
//   // Add an initial set of boids into the system
//   for (var i = 0; i < 100; i++) {
//     var b = new Boid(width/2,height/2);
//     flock.addBoid(b);
//   }
// }

// function draw() {
//   background(51);
//   flock.run();
//   whale.render();
// }

// // Add a new boid into the System
// function mouseDragged() {
//   flock.addBoid(new Boid(mouseX,mouseY));
// }

// // The Nature of Code
// // Daniel Shiffman
// // http://natureofcode.com

// // Flock object
// // Does very little, simply manages the array of all the boids

// function Flock() {
//   // An array for all the boids
//   this.boids = []; // Initialize the array
// }

// Flock.prototype.run = function() {
//   for (var i = 0; i < this.boids.length; i++) {
//     this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
//   }
// }

// Flock.prototype.addBoid = function(b) {
//   this.boids.push(b);
// }

// // The Nature of Code
// // Daniel Shiffman
// // http://natureofcode.com

// // Boid class
// // Methods for Separation, Cohesion, Alignment added
// function Whale() {
//     this.pos = createVector(250, 250);
//     this.r = 30;
//     this.render = function () {
//         noFill()
//         translate(this.pos.x, this.pos.y)
//         stroke(255)
//         ellipse(0,0,this.r*2)
//     }
// }
// function Boid(x,y) {
//   this.acceleration = createVector(0,0);
//   this.velocity = createVector(random(-1,1),random(-1,1));
//   this.position = createVector(x,y);
//   this.r = 3.0;
//   this.fill = 127
//   this.maxspeed = 3;    // Maximum speed
//   this.maxforce = 0.05; // Maximum steering force
// }

// Boid.prototype.run = function(boids) {
//   this.flock(boids);
//   this.update();
// //   this.avoid(boids);
//   this.borders();
//   this.render();
// }

// Boid.prototype.applyForce = function(force) {
//   // We could add mass here if we want A = F / M
//   this.acceleration.add(force);
// }

// // We accumulate a new acceleration each time based on three rules
// Boid.prototype.flock = function(boids) {
//   var sep = this.separate(boids);   // Separation
//   var ali = this.align(boids);      // Alignment
//   var coh = this.cohesion(boids);   // Cohesion
//   let avoid = this.avoid(boids);
//   // Arbitrarily weight these forces
//   sep.mult(1.5);
//   ali.mult(1.0);
//   coh.mult(1.0);
//   avoid.mult(2.0);
//   // Add the force vectors to acceleration
//   this.applyForce(sep);
//   this.applyForce(ali);
//   this.applyForce(coh);
//   this.applyForce(avoid);
// }

// // Method to update location
// Boid.prototype.update = function() {
//   // Update velocity
//   this.velocity.add(this.acceleration);
//   // Limit speed
//   this.velocity.limit(this.maxspeed);
//   this.position.add(this.velocity);
//   // Reset accelertion to 0 each cycle
//   this.acceleration.mult(0);
// }

// // A method that calculates and applies a steering force towards a target
// // STEER = DESIRED MINUS VELOCITY
// Boid.prototype.seek = function(target) {
//   var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
//   // Normalize desired and scale to maximum speed
//   desired.normalize();
//   desired.mult(this.maxspeed);
//   // Steering = Desired minus Velocity
//   var steer = p5.Vector.sub(desired,this.velocity);
//   steer.limit(this.maxforce);  // Limit to maximum steering force
//   return steer;
// }

// Boid.prototype.render = function() {
//   // Draw a triangle rotated in the direction of velocity
//   var theta = this.velocity.heading() + radians(90);
//   fill(this.fill);
//   stroke(200);
//   push();
//   translate(this.position.x,this.position.y);
//   rotate(theta);
//   beginShape();
//   vertex(0, -this.r*2);
//   vertex(-this.r, this.r*2);
//   vertex(this.r, this.r*2);
//   endShape(CLOSE);
//   pop();
// }

// // Wraparound
// Boid.prototype.borders = function() {
//   if (this.position.x < -this.r)  this.position.x = width +this.r;
//   if (this.position.y < -this.r)  this.position.y = height+this.r;
//   if (this.position.x > width +this.r) this.position.x = -this.r;
//   if (this.position.y > height+this.r) this.position.y = -this.r;
// }

// // Separation
// // Method checks for nearby boids and steers away
// Boid.prototype.separate = function(boids) {
//   var desiredseparation = 25.0;
//   var steer = createVector(0,0);
//   var count = 0;
//   // For every boid in the system, check if it's too close
//   for (var i = 0; i < boids.length; i++) {
//     var d = p5.Vector.dist(this.position,boids[i].position);
//     // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
//     if ((d > 0) && (d < desiredseparation)) {
//       // Calculate vector pointing away from neighbor
//       var diff = p5.Vector.sub(this.position,boids[i].position);
//       diff.normalize();
//       diff.div(d);        // Weight by distance
//       steer.add(diff);
//       count++;            // Keep track of how many
//     }
//   }
//   // Average -- divide by how many
//   if (count > 0) {
//     steer.div(count);
//   }

//   // As long as the vector is greater than 0
//   if (steer.mag() > 0) {
//     // Implement Reynolds: Steering = Desired - Velocity
//     steer.normalize();
//     steer.mult(this.maxspeed);
//     steer.sub(this.velocity);
//     steer.limit(this.maxforce);
//   }
//   return steer;
// }
// Boid.prototype.avoid = function(boids) {
//     let birth = 30
//     let steer = createVector(0,0);
//     // for(let i = 0; i < boids.length; i++){
//         // let distance = p5.Vector.dist(boids[i].position, whale.pos)
//     //     // let distance = dist(boids[i].position.x,boids[i].position.y, whale.pos.x, whale.pos.y)
//     //     if(distance < birth + whale.r){
//     //         boids[i].fill = 255
//     //     }
//     // }
//     let distance = p5.Vector.dist(this.position, whale.pos)
    
//     let diff = p5.Vector.sub(whale.pos, this.position)
//     diff.div(distance)
//     steer.add(diff)
//     steer.normalize().mult(this.maxspeed)
//     steer.sub(this.velocity)
//     steer.limit(this.maxforce)
//     return steer
    

// }
// // Alignment
// // For every nearby boid in the system, calculate the average velocity
// Boid.prototype.align = function(boids) {
//   var neighbordist = 50;
//   var sum = createVector(0,0);
//   var count = 0;
//   for (var i = 0; i < boids.length; i++) {
//     var d = p5.Vector.dist(this.position,boids[i].position);
//     if ((d > 0) && (d < neighbordist)) {
//       sum.add(boids[i].velocity);
//       count++;
//     }
//   }
//   if (count > 0) {
//     sum.div(count);
//     sum.normalize();
//     sum.mult(this.maxspeed);
//     var steer = p5.Vector.sub(sum,this.velocity);
//     steer.limit(this.maxforce);
//     return steer;
//   } else {
//     return createVector(0,0);
//   }
// }


// // Cohesion
// // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
// Boid.prototype.cohesion = function(boids) {
//   var neighbordist = 50;
//   var sum = createVector(0,0);   // Start with empty vector to accumulate all locations
//   var count = 0;
//   for (var i = 0; i < boids.length; i++) {
//     var d = p5.Vector.dist(this.position,boids[i].position);
//     if ((d > 0) && (d < neighbordist)) {
//       sum.add(boids[i].position); // Add location
//       count++;
//     }
//   }
//   if (count > 0) {
//     sum.div(count);
//     return this.seek(sum);  // Steer towards the location
//   } else {
//     return createVector(0,0);
//   }
// }


// //