const W = 87;
const S = 83;
const A = 65;
const D = 68;
const SHOOT = 32;

class Teclado {
  constructor(elemento) {
    this.elemento = elemento;
    this.pressionadas = [];
    this.disparadas = [];
    this.funcaoDisparo = [];

    this.elemento.addEventListener('keydown', (e) => {
      let tecla = e.keyCode;
      this.pressionadas[tecla] = true;
      if (!this.disparadas[tecla] && this.funcaoDisparo[tecla]) {
        this.disparadas[tecla] = true;
        this.funcaoDisparo[tecla]();
      }
    });
    this.elemento.addEventListener('keyup', (e) => {
      let tecla = e.keyCode;
      this.pressionadas[tecla] = false;
      this.disparadas[tecla] = false;
    })
  }

  pressionada(tecla){
    return this.pressionadas[tecla];
  }

  disparada(tecla, callback){
    this.funcaoDisparo[tecla] = callback;
  }
}