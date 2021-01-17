class Spritesheet{
  constructor(context, imagem, linha, coluna){
    this.context = context;
    this.imagem = imagem;
    this.numeroLinha = linha;
    this.numeroColuna = coluna;
    this.intervalo = 0;
    this.linha = 0;
    this.coluna = 0;
  }
  proximoQuadro(){
    let agora = new Date().getTime();
    if(!this.ultimoTempo) this.ultimoTempo = agora;
    if(agora - this.ultimoTempo < this.intervalo) return;
    if(this.coluna < this.numeroColuna-1)
      this.coluna++;
    else
      this.coluna = 0;
    this.ultimoTempo = agora;
  }
  desenhar(x,y){
    let larguraQuadro = this.imagem.width/this.numeroColuna;
    let alturaQuadro = this.imagem.height/this.numeroLinha;

    this.context.drawImage(
      this.imagem,
      larguraQuadro*this.coluna,
      alturaQuadro*this.linha,
      larguraQuadro,
      alturaQuadro,
      x,
      y,
      larguraQuadro,
      alturaQuadro
    )
  }
}