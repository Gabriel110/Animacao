const UPs = 1;
const LEFTs = 2;
const RIGHTs = 3;
const DOWNs = 4

class Heroi{
  constructor(context,animacao,teclado){
    this.context = context;
    this.animacao = animacao;
    this.teclado = teclado;
    this.andando = false;
    this.posciacao = UPs;

    this.x = 0;
    this.y = 0;
    this.raio = 20;
    this.velocidade = 10;
  }
  atualizar(){
    let ctx = this.context;
    if(this.teclado.pressionada(W) && this.y > this.raio){
      this.y -= this.velocidade;
      this.posciacao = UPs;
    }else if(this.teclado.pressionada(S) && this.y < ctx.canvas.height - this.raio){
      this.y += this.velocidade;
      this.posciacao = DOWNs;
    }else if(this.teclado.pressionada(D) && this.x < ctx.canvas.width - this.raio){
      this.x += this.velocidade;
      this.posciacao = LEFTs;
    }else if(this.teclado.pressionada(A) && this.x  > this.raio){
      this.x -= this.velocidade;
      this.posciacao = RIGHTs;
    }
     
  }
  desenhar(){
    let ctx = this.context;
    ctx.save();
    ctx.fillStyle = this.cor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
  }
  atirar(){
    let bola = new Bola(this.context);
    bola.x = this.x;
    bola.y = this.y;
    bola.cor = 'red';
    bola.raio = 5;

    if(this.posciacao == UPs)
      bola.velocidadeY = -20;
    else if(this.posciacao == DOWNs)
      bola.velocidadeY = 20;
    else if(this.posciacao == RIGHTs)
      bola.velocidadeX = -20;
    else if(this.posciacao == LEFTs)
      bola.velocidadeX = 20;

    this.animacao.novoSprite(bola);
  }
}