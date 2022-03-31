class Astro{
  constructor(_massa, _posicao, _velocidade){
    this.massa = _massa
    this.posicao = _posicao
    this.velocidade = _velocidade
    this.raio = this.massa
    this.path = []
  }

  desenhar(cor){
    
    stroke(30)
    for(let i = 0; i < this.path.length -2; i++){
      line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y)
    }
    noStroke()
    fill(cor)
    ellipse(this.posicao.x, this.posicao.y, this.raio, this.raio)
   
  }

  atulizar(){
    this.posicao.x += this.velocidade.x
    this.posicao.y += this.velocidade.y
    this.path.push(this.posicao.copy())
  }

  aplicarForca(forca){
    this.velocidade.x += forca.x / this.massa
    this.velocidade.y += forca.y / this.massa
  }

  gravidade(planeta){
    let distacia = this.distanciaEntreDoisAstros(this.posicao.x, this.posicao.y, planeta.posicao.x, planeta.posicao.y)
    let f =  {y:0, y:0}
    let multMassas = this.massa*planeta.massa
    let multDistacia = distacia*distacia
    let constGravitacional = GRAVIDADE * multMassas / multDistacia

    let cos = ((this.posicao.x - planeta.posicao.x) / distacia)
    let sen = ((this.posicao.y - planeta.posicao.y) / distacia)

    f.x = constGravitacional * cos
    f.y = constGravitacional * sen
  
    planeta.aplicarForca(f)
    console.log(`Aplicando forca gravitacional: ${constGravitacional}`);
  }

  distanciaEntreDoisAstros(x1, y1, x2, y2){
    var a = x2 - x1;
    var b = y2 - y1;
    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return c;
  }
}