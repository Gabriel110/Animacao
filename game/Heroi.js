const UPs = 1;
const LEFTs = 2;
const RIGHTs = 3;
const DOWNs = 4

class Heroi{
  constructor(context,imagem,animacao,teclado){
    this.context = context;
    this.animacao = animacao;
    this.teclado = teclado;
    this.andando = false;
    this.posciacao = UPs;

    this.x = 0;
    this.y = 0;
    this.raio = 20;
    this.velocidade = 10;
    this.intervalo = 30;
    this.sheet = new Spritesheet(context,imagem, 4, 4);
  }
  atualizar(){
    let ctx = this.context;
    if(this.teclado.pressionada(W) && this.y > 0){
      if(!this.andando || this.posciacao != UPs){
        this.sheet.linha = 3;
        this.sheet.coluna = 0;
      }
      this.y -= this.velocidade;
      this.posciacao = UPs;
      this.sheet.proximoQuadro();
      this.andando = true;
    }else if(this.teclado.pressionada(S) && this.y < ctx.canvas.height - 55){
      if(!this.andando || this.posciacao != DOWNs){
        this.sheet.linha = 0;
        this.sheet.coluna = 0;
      };
      this.y += this.velocidade;
      this.sheet.proximoQuadro();
      this.posciacao = DOWNs;
      this.andando = true;
    }else if(this.teclado.pressionada(D) && this.x < ctx.canvas.width - 30){
      if(!this.andando || this.posciacao != LEFTs){
        this.sheet.linha = 2;
        this.sheet.coluna = 0;
      }
      this.x += this.velocidade;
      this.sheet.proximoQuadro();
      this.posciacao = LEFTs;
      this.andando = true;
    }else if(this.teclado.pressionada(A) && this.x  > 0){
      if(!this.andando || this.posciacao != RIGHTs){
        this.sheet.linha = 1;
        this.sheet.coluna = 0;
      }
      this.x -= this.velocidade;
      this.sheet.proximoQuadro();
      this.posciacao = RIGHTs;
      this.andando = true;
    }else{
      if(this.posciacao == UPs){
        this.sheet.coluna = 3;
      }else if(this.posciacao == DOWNs){
        this.sheet.linha = 0;
      }
      this.sheet.coluna = 0;
      this.andando = false;
    }
     
  }
  desenhar(){
    // let ctx = this.context;
    // ctx.save();
    // ctx.fillStyle = this.cor;
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.raio, 0, 2 * Math.PI, false);
    // ctx.fill();
    // ctx.restore();
    this.sheet.desenhar(this.x,this.y);
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