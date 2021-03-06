class Bola {
  constructor(context, imagem) {
    this.context = context;
    this.velocidadeX = 0;
    this.velocidadeY = 0;
    this.cor = 'black';
    this.raio = 60;
    this.x = this.raio;
    this.y = this.raio;
    this.imagem = imagem
  }
  atualizar() {
    let ctx = this.context;
    if (this.x < this.raio || this.x > ctx.canvas.width - this.raio*2)
      this.velocidadeX *= -1;
    if (this.y < this.raio || this.y > ctx.canvas.height - this.raio*2)
      this.velocidadeY *= -1;

    this.x += this.velocidadeX;
    this.y += this.velocidadeY;
  }
  desenhar() {
    let ctx = this.context;
    // ctx.save();
    // ctx.fillStyle = this.cor;
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, false);
    // ctx.fill();
    // ctx.restore();

    ctx.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
    
  }
  retanguloColisao() {
    return [{
      x: this.x - this.raio,
      y: this.y - this.raio,
      largura: this.raio * 2,
      altura: this.raio * 2
    }]
  }
  colidiuCom(sprite) {
    if (this.x < sprite.x) // Estou na esquerda
      this.velocidadeX = -Math.abs(this.velocidadeX); // -
    else
      this.velocidadeX = Math.abs(this.velocidadeX); // +
    if (this.y < sprite.y) // Estou acima
      this.velocidadeY = -Math.abs(this.velocidadeY); // -
    else
      this.velocidadeY = Math.abs(this.velocidadeY);
  }
}