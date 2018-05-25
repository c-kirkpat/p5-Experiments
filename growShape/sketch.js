
var shape;
function setup() {
  createCanvas(windowWidth, windowHeight)
  shape = new Shape
}
function draw() {
  background(0);
  shape.render()
  if(shape.bool)shape.grow()
  // shape.grow();
}
function keyPressed() {
  if(key == ' ') {

    shape.bool = !shape.bool
  }
}

function Shape() {
  const vector1 = createVector(10,10)
  // vector1.setMag(100)
  // vector1.rotate()
  const vector2 = createVector(20,60)
  // vector2.setMag(5)
  // vector2.rotate(15)
  const vector3 = createVector(40,40)
  // vector3.setMag(15)
  // vector3.rotate(20)
  const vector4 = createVector(30,30)
  
  const verticesTest = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 5, y: 10 }
  ]
  this.vertices = [
    vector1, vector2, vector3, vector4
  ]
  this.bool = false;
  this.grow = function(currentArea) {
    const rando = Math.floor(Math.random()*this.vertices.length)
    const x1 = this.vertices[rando].x
    const y1 = this.vertices[rando].y
    const x2 = rando === this.vertices.length - 1 ? this.vertices[0].x : this.vertices[rando + 1].x
    const y2 = rando === this.vertices.length - 1 ? this.vertices[0].y : this.vertices[rando + 1].y
    const a = x2 - x1
    const b = y2 - y1
    const before = this.getArea();
    const oldVertices = this.vertices.slice();
    let test = createVector(-a, b)
    test.setMag(random(50,width/2))
    this.vertices.splice(rando, 0, test)
    const after = this.getArea();
    // if(before > after){
    //   test = createVector(a,-b)
    //   test.setMag(random(50,width/2))
    //   this.vertices = oldVertices
    //   this.vertices.splice(rando,0,test)      
    // }

    
  }
  this.getArea = function () {
    const topProducts = this.vertices.reduce((acc, val, index, array)=> {
      return array[index + 1] ? acc + ((val.x * array[index+1].y)-(val.y * array[index+1].x)) : acc + ((val.x*array[0].y)-(val.y*array[0].x))
    }, 0)
    console.log('hit')
    return Math.abs(topProducts / 2)
  }
  this.render = function(){
    stroke(255);
    noFill()
    translate(width/2, width/2);
    beginShape(TRIANGLE_STRIP);
    this.vertices.slice(0, 10).map(vert => vertex(vert.x, vert.y))
    endShape(CLOSE);
  }

}

