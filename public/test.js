
  // If you need to load assets, do that here
  let newTriangle 
  let amp
  let song
  let graph
  let fft
  function preload() {
      song = loadSound('jack.mp3')
  }
  function setup() {
    // Make the area p5.js draws in fill up the entire window.
    createCanvas(1000, 1000)
    noFill()
    fft = new p5.FFT(null, 256)
    fft.setInput(song)
    // newTriangle = new Triangle
    // newTriangle.init()
    graph = new Graph
    amp = new p5.Amplitude();
    song.play()
  }
  
  // This is ran ~60 times a second to update the screen
  function draw() {
    // newTriangle.draw()
    // graph.update()
    // graph.draw()
    // graph.borders()

    background(200)
    let spectrum = fft.analyze()
    beginShape()
    for(let i = 0; i<spectrum.length; i++){
      vertex(i+100, map(spectrum[i], 0, 255, height, 0))
    }
    endShape()
  }
  function keyPressed() {
      if(key == ' '){
          song.play()
      }
  }




  class Graph {
    constructor(){
      this.position = createVector(0, height/2)
      this.velocity = createVector(1,0)
    }
    update(){
      this.position.y = amp.getLevel()*100 % height
      this.position.add(this.velocity)
    }
    draw(){
      point(this.position.x, this.position.y)
    }
    borders(){
      if(this.position.x > width) {
        background(255)
        this.position.x = 0
      }
    }
  }













  class Triangle {
    constructor(){
      this.magnitude = createVector(0,3)
      this.verticies = []
      this.movers = []
    }
    init () {
      this.magnitude.rotate(random(0,TWO_PI))
      let angleBetween = TWO_PI  / 3;
      for(let i=0; i<3; i++) {
        this.verticies.push({ x:this.magnitude.x, y:this.magnitude.y });
        this.magnitude.rotate(angleBetween);
        this.movers.push(new Mover(this.magnitude.copy()))
      }
    }
    draw() {
      for(let i = 0; i<this.movers.length; i++){
        this.movers[i].update()        
        let partner 
        if(i === 0) partner = 2
        else if(i === 2) partner = 0
        else partner = i+1
        line(this.movers[i].position.x, this.movers[i].position.y, this.movers[partner].position.x, this.movers[partner].position.y)
      }
    }
  }
  class Mover {
    constructor(vector){
      this.position = createVector(width/2, height/2)
      this.velocity = vector
    }
    update () {
      this.position.add(this.velocity)
    }
    draw() {
      this.update()
    }
  }



// Please see the learn & examples section of https://p5js.org for a more comprehensive introduction to p5.js.
//
// https://gist.github.com/zachlatta/abe14c8e1c7ab32c8d8297bdf986dbbb has more info.
// If you need to load assets, do that here
let newTriangle 
let triangles = []
// function setup() {
//   // Make the area p5.js draws in fill up the entire window.
//   colorMode(HSB, 360, 100, 100, 1)
//   createCanvas(window.innerWidth, window.innerHeight)
//   newTriangle = new Triangle
//   newTriangle.init()
// }

// // This is ran ~60 times a second to update the screen
// function draw() {
//   background(255)
//   triangles.slice(-40).forEach((tri)=>{
//     tri.draw()
//   })
// }

// function keyPressed() {
//   if( key == ' ') {
//     console.log('hi')
//     triangles.push(new Triangle)
//     triangles[triangles.length -1].init()
//   }
// }
class Mesmer {
  constructor(mag){
    this.age = 0
    this.magnitude = createVector(0,mag)
    this.verticies = []
    this.movers = []
    this.weight = mag*2
    // this.color = [random(0,255),random(0,255),random(0,255)]
    this.color = [frameCount/4 % 255,random(100,255),200]

  }
  init (sides) {
    // this.magnitude.rotate(random(0,TWO_PI))
    let angleBetween = TWO_PI  / sides;
    for(let i=0; i<sides; i++) {
      this.verticies.push({ x:this.magnitude.x, y:this.magnitude.y });
      this.magnitude.rotate(angleBetween);
      this.movers.push(new Mover(this.magnitude.copy()))
    }
  }
  draw() {
    // for(let i = 0; i<this.movers.length; i++){
    //   this.movers[i].update()
    //   let partner 
    //   if(i === 0) partner = 2
    //   else if(i === 2) partner = 0
    //   else partner = i+1
    //   line(this.movers[i].position.x, this.movers[i].position.y, this.movers[partner].position.x, this.movers[partner].position.y)
    // }
    strokeWeight(this.weight)
    fill(...this.color, 1-this.age)
    this.age = this.age + .007
    stroke(0,0,211,1-this.age)
    beginShape()
    this.movers.forEach((mover)=>{
      mover.update()
      vertex(mover.position.x, mover.position.y)
            // arc(mover.position.y, mover.position.y, 80, 80, 0, PI + QUARTER_PI, CHORD)

    })
    endShape(CLOSE)
  }
}
class Mover {
  constructor(vector){
    this.position = createVector(width/2, height/2)
    this.velocity = vector
  }
  update () {
    this.position.add(this.velocity)
  }
  draw() {
    this.update()
  }
}