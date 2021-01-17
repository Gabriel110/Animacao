class Animacao{
  constructor(context){
    this.sprites = [];
    this.ligado = false;
    this.context = context;
    this.aoColidir = null;
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
    if(!this.ligado)return;
    this.limparTela();
    for(let i in this.sprites){
      this.sprites[i].atualizar();
      this.sprites[i].desenhar();
    }
    this.processar();
    requestAnimationFrame(()=>{this.proximoFrame()});
  }
  limparTela(){
    let ctx = this.context;
    ctx.clearRect(0,0, ctx.canvas.width,ctx.canvas.height);
  }

  stringUnica(sprite){
    let str = ' ';
    let retangulo = sprite.retanguloColisao();
    for(let i in retangulo){
      str +=  'x:'+retangulo[i].x+','+
              'y:'+retangulo[i].y+','+
              'l:'+retangulo[i].largura+','+
              'a:'+retangulo[i].altura+'\n';
    }
    return str;
  }
  processar(){
    let jaTestado = Object();
    for(let i in this.sprites){
      for(let j in this.sprites){
        if(i == j)continue;
        let id1 = this.stringUnica(this.sprites[i]);
        let id2 = this.stringUnica(this.sprites[j]);
        if(!jaTestado[id1]) jaTestado[id1] = [];
        if(!jaTestado[id2]) jaTestado[id2] = [];

        if(!(jaTestado[id1].indexOf(id2)>= 0 || jaTestado[id2].indexOf(id1) >=0)){
          this.testarColisao(this.sprites[i], this.sprites[j]);
          jaTestado[id1].push(id2);
          jaTestado[id2].push(id1);
        }
      }
    }
  }
  testarColisao(sprite1, sprite2){
    let rest1 =  sprite1.retanguloColisao();
    let rest2 =  sprite2.retanguloColisao();

    colisao:
    for(let i in rest1){
      for(let j in rest2){
        if(this.retanguloColidem(rest1[i], rest2[j])){
          if(this.aoColidir) this.aoColidir(sprite1, sprite2);
          sprite1.colidiuCom(sprite2);
          sprite2.colidiuCom(sprite1);
          break colisao;
        }
      }
    }
  }
  retanguloColidem(ret1, ret2){
    return  (ret1.x + ret1.largura) > ret2.x &&
            (ret2.x + ret2.largura) > ret1.x &&
            (ret1.y + ret1.altura) > ret2.y &&
            (ret2.y + ret2.altura) > ret1.y
  }
}