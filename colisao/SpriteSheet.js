class SpriteSheet {
  constructor(ctx, img, linhas, colunas) {
    this.ctx = ctx;
    this.img = img;
    this.numLinhas = linhas;
    this.numColunas = colunas;
    this.linha = 0;
    this.coluna = 0;
    this.intervalo = 60;

  }

  proximoQuadro(){
    let agora = new Date().getTime();
    if (!this.ultimoTempo) this.ultimoTempo = agora;
    if (agora - this.ultimoTempo < this.intervalo) return;
    if (this.coluna < this.numColunas - 1)
      this.coluna++;
    else
      this.coluna = 0;
    this.ultimoTempo = agora;
  }

  desenhar(x,y){
    let larguraQuadro = this.img.width/this.numColunas;
    let alturaQuadro = this.img.height/this.numLinhas;
    this.ctx.drawImage(
      this.img,
      larguraQuadro * this.coluna,
      alturaQuadro * this.linha,
      larguraQuadro,
      alturaQuadro,
      x,
      y,
      larguraQuadro,
      alturaQuadro
    )
  }
}