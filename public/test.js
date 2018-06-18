
  // If you need to load assets, do that here
  let newTriangle 
  let amp
  let song
  let graph
  let fft
  let mesmers = [];
  let mousePos = {x: 0, y: 0};
  let inertia = 50;



  class Mesmer {
    constructor(mag){
      this.age = 0
      this.magnitude = createVector(0,mag)
      this.verticies = []
      this.movers = []
      this.weight = mag*2
      // this.color = [random(0,255),random(0,255),random(0,255)]
      this.color = [mouseX%360, mouseY%100, 100]
  
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
      colorMode(HSB);
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
  


  function setup() {
    // Make the area p5.js draws in fill up the entire window.
    createCanvas(1000, 1000)
    colorMode(HSB)
    
  }
  function mouseMoved(){
    inertia = ++inertia > 50 ? 50: inertia;
    background(230)
    let xDiff = abs(mouseX - mousePos.x)
    let yDiff = abs(mouseY - mousePos.y)
    if(xDiff > 20 || yDiff > 20){
      mousePos.x = mouseX;
      mousePos.y = mouseY;
      mesmers.push(new Mesmer((mouseX + mouseY)% 5))
      mesmers[mesmers.length - 1].init((mouseX + mouseY) % 18 + 3)
    }
    mesmers = mesmers.slice(-50)
    mesmers = mesmers.filter((mes)=>{
      return mes.age < 1
    })
    mesmers.forEach(mes => {
      mes.draw()
    })
  }
  // This is ran ~60 times a second to update the screen
  function draw() {
    // let xDiff = abs(mouseX - mousePos.x)
    // let yDiff = abs(mouseY - mousePos.y)
    // if(xDiff > 20 || yDiff > 20){
    //   mousePos.x = mouseX;
    //   mousePos.y = mouseY;
    //   mesmers.push(new Mesmer((mouseX + mouseY)% 5))
    //   mesmers[mesmers.length - 1].init((mouseX + mouseY) % 18 + 3)
    // }
    if(inertia > 10){
      background(230)
      inertia--
      mesmers = mesmers.filter((mes)=>{
        return mes.age < 1
      })
      mesmers.forEach(mes => {
        mes.draw()
      })
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



let triangles = []

