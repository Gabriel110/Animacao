let sol
let mercurio 
let venus
let terra
let marte
let jupter
let saturno
let urano
let neturno

let windowW = 900
let windowH = 900
let lateral = 100
let GRAVIDADE = 4

function setup() {
  createCanvas(windowW,windowH)

  sol = new Corpo(200, createVector(0, 0), createVector(0, 0))
  mercurio = new Corpo(25, createVector(1, -150), createVector(2.3, 0))
  venus = new Corpo(30, createVector(1, -200), createVector(2, 0))
  terra = new Corpo(35, createVector(1, -250), createVector(1.8, 0))
  
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

function Corpo(_massa, _posicao, _velocidade){
  this.massa = _massa
  this.posicao = _posicao
  this.velocidade = _velocidade
  this.raio = this.massa
  this.path = []

  this.desenhar = function(cor){
    noStroke()
    fill(cor)
    ellipse(this.posicao.x, this.posicao.y, this.raio, this.raio)
    stroke(30)
    for(let i = 0; i < this.path.length -2; i++){
      line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y)
    }
  }

  this.atulizar = function(){
    this.posicao.x += this.velocidade.x
    this.posicao.y += this.velocidade.y
    this.path.push(this.posicao.copy())
    if(this.path.length > 50){
      this.path.splice(0, 1)
    }
  }

  this.aplicarForca = function(forca){
    this.velocidade.x += forca.x / this.massa
    this.velocidade.y += forca.y / this.massa
  }

  this.gravidade = function(planeta){
    let distacia = this.distanciaEntreDoisAstros(this.posicao.x, this.posicao.y, planeta.posicao.x, planeta.posicao.y)
    let f = {x:((this.posicao.x - planeta.posicao.x) /distacia) , y:((this.posicao.y - planeta.posicao.y) / distacia)}
    let multMassas = this.massa*planeta.massa
    let multDistacia = distacia*distacia
    let constGravitacional = GRAVIDADE * multMassas / multDistacia

    f.x *= constGravitacional
    f.y *= constGravitacional
  
    planeta.aplicarForca(f)
    console.log(`Aplicando forca gravitacional: ${constGravitacional}`);
  }

  this.distanciaEntreDoisAstros = function(x1, y1, x2, y2){
    var a = x2 - x1;
    var b = y2 - y1;
    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return c;
  }
}