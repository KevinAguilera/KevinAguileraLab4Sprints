
import { Juego } from '../clases/juego';

export class SimonDice extends Juego {

    secuencia: Array<number> = [];
    secuenciaUsuario: Array<number> = [];

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super("Simón dice", true, jugador);
    }

    generarJugada() {
        this.secuencia.push(Math.floor(Math.random() * 4 + 1));
        console.info("secuencia generada", this.secuencia);
    }

    verificar() {
        this.gano = true;
        for (var i = 0; i < this.secuenciaUsuario.length; i++) {
            if (this.secuenciaUsuario[i] != this.secuencia[i]) {
                this.gano = false;
            }
        }
        return this.gano;
    }

    reset() {
        this.secuencia = [];
        this.secuenciaUsuario = [];
        this.gano = true;
    }
}
