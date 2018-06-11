
let newTriangle 
let triangles = []

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