let sol
let planeta

let windowW = 900
let windowH = 900
let lateral = 100
let GRAVIDADE = 2

function setup() {
  createCanvas(windowW,windowH)

  sol = new Corpo(200, createVector(0, 0), createVector(0, 0))
  let raio = random(sol.raio, min((windowW/2)+lateral, (windowH/2)-lateral))
  let teta = random(TWO_PI)

  let posicaoPlaneta = createVector(raio*cos(teta), raio*sin(teta))
 
  planeta = new Corpo(25, posicaoPlaneta, createVector(1, 0))
  
}

function draw() {
  
  translate(width/2, height/2);
  background(180)
  planeta.desenhar()
  sol.desenhar()
  sol.gravidade(planeta)
  
  planeta.atulizar()
}

function Corpo(_massa, _posicao, _velocidade){
  this.massa = _massa
  this.posicao = _posicao
  this.velocidade = _velocidade
  this.raio = this.massa

  this.desenhar = function(){
    noStroke()
    fill(255)
    ellipse(this.posicao.x, this.posicao.y, this.raio, this.raio)
  }

  this.atulizar = function(){
    this.posicao.x += this.velocidade.x
    this.posicao.y += this.velocidade.y
  }

  this.aplicarForca = function(forca){
    this.velocidade.x += forca.x / this.massa
    this.velocidade.y += forca.y / this.massa
  }

  this.gravidade = function(planeta){
    let distacia = this.distanciaEntreDoisAstros(this.posicao.x, this.posicao.y, planeta.posicao.x, planeta.posicao.y)
    let f = {x:this.posicao.x - planeta.posicao.x/distacia , y:this.posicao.y - planeta.posicao.y/distacia}
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