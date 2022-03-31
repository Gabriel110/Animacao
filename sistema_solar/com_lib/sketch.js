let sol
let mercurio 
let venus
let terra
let marte
let jupter
let saturno
let urano
let neturno

let windowW = 900//window.screen.width
let windowH = 900//window.screen.height
let GRAVIDADE = 4

function setup() {
  createCanvas(windowW,windowH)
  sol = new Astro(200, createVector(0, 0), createVector(0, 0))
  mercurio = new Astro(25, createVector(1, -150), createVector(2.3, 0))
  venus = new Astro(30, createVector(1, -200), createVector(2, 0))
  terra = new Astro(35, createVector(1, -250), createVector(1.8, 0))
}

function draw() {
  
  translate(width/2, height/2);
  background(180)

  mercurio.desenhar('#6e5707')
  terra.desenhar('#0206ed')
  venus.desenhar('#de049d')
  
  mercurio.atulizar()
  terra.atulizar()
  venus.atulizar()

  sol.desenhar('#e1ed02')
  sol.gravidade(terra)
  sol.gravidade(mercurio)
  sol.gravidade(venus)
}