
  // If you need to load assets, do that here
  let newTriangle 
  let amp
  let song
  function preload() {
      song = loadSound('jack.mp3')
  }
  function setup() {
    // Make the area p5.js draws in fill up the entire window.
    createCanvas(window.innerWidth, window.innerHeight)
    // newTriangle = new Triangle
    // newTriangle.init()
    amp = new p5.Amplitude();
    song.play()
  }
  
  // This is ran ~60 times a second to update the screen
  function draw() {
    // newTriangle.draw()
  }
  function keyPressed() {
      if(key == ' '){
          song.play()
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


//   class Graph(){

//   }