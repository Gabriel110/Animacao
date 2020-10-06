class Animacao{
  constructor(context){
    this.context = context;
    this.ligado = false;
    this.sprites = [];
  }

  novoSprite(sprite){
    this.sprites.push(sprite);
  }

  ligar(){
    this.ligado = true;
    this.proximoFrame();
  }

  desligar(){
    this.ligado = false;
  }

  proximoFrame(){
    if(!this.ligado) return;
    this.limparTela();
    for(let i in this.sprites){
      this.sprites[i].atualizar();
      this.sprites[i].desenhar();
    }
    
    requestAnimationFrame(()=>{this.proximoFrame()});
  }

  limparTela(){
    let ctx = this.context;
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
    
  }

}