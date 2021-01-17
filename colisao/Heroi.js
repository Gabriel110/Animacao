const CIMA = 1;
const BAIXO = 2;
const ESQUERDA = 3;
const DIREITA = 4;

class Heroi {
  constructor(context, image, linhas, colunas, teclado) {
    this.context = context;
    this.image = image;
    this.numLinhas = linhas;
    this.numColunas = colunas;
    this.teclado = teclado;
    this.x = 100; 
    this.y= 100;
    this.andando = false;
    this.posicao = BAIXO;
    this.velocidade = 10;
    this.sheet = new SpriteSheet(this.context, this.image, this.numLinhas, this.numColunas);
    this.sheet.intervalo = 60;
    
  }

  atualizar() {
    let ctx = this.context;
    if(this.teclado.pressionada(W) && this.y > -16 ){
      if(!this.andando || this.posicao != CIMA){
        this.sheet.linha = 6;
        this.sheet.coluna = 0;
      }
      this.y -= this.velocidade;
      this.posicao = CIMA;
      this.sheet.proximoQuadro();
      this.andando = true;
    }else if(this.teclado.pressionada(S) && this.y < ctx.canvas.height -120){
      if(!this.andando ||this.posicao != BAIXO){
        this.sheet.linha = 4;
        this.sheet.coluna = 0;
      }
      this.y += this.velocidade;
      this.sheet.proximoQuadro();
      this.posicao = BAIXO;
      this.andando = true;
    }else if(this.teclado.pressionada(A) && this.x > -19){
      if(!this.andando || this.posicao != ESQUERDA){
        this.sheet.linha = 5;
        this.sheet.coluna = 0;
      }
      this.andando = true;
      this.sheet.proximoQuadro();
      this.posicao = ESQUERDA;
      this.x -= this.velocidade;
    }else if(this.teclado.pressionada(D) && this.x < ctx.canvas.width -100){
      if(!this.andando || this.posicao != DIREITA){
        this.sheet.linha  = 7;
        this.sheet.coluna = 0;
      }
      this.andando = true;
      this.sheet.proximoQuadro();
      this.posicao = DIREITA;
      this.x += this.velocidade;
    }else{
      if(this.posicao == CIMA){
        this.sheet.linha = 2;
        
      }else if(this.posicao == BAIXO){
        this.sheet.linha = 0;
       
      }else if(this.posicao == ESQUERDA){
        this.sheet.linha = 1;
       
      }else if(this.posicao == DIREITA){
        this.sheet.linha = 3;
        
      }
      this.sheet.coluna = 0;
      this.andando = false;
    }
  }

  desenhar() {
    this.sheet.desenhar(this.x,this.y);
  }

  retanguloColisao(){
    return [{
      x:this.x,
      y:this.y,
      largura: this.image.width/this.numColunas,
      altura: this.image.height/this.numLinhas
    }]
  }
  colidiuCom(sprite){
    //alert('pa');
  }
}