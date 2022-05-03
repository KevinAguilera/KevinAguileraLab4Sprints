import { Juego } from '../clases/juego';

export class Ahorcado extends Juego {

    palabrasRandom =["hola","chau", "elefante", "cosmetologa", "admirable", "embarazo", "hogar","pastelero", 
                    "felino", "pantera", "automovil", "deportes", "aro", "cancha", "paraguas", "boleto", "entrada"];

    palabraSeleccionada:string;

    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super("Ahorcado", true, jugador);
    }

    verificar() {
        this.gano = true;
        
        return this.gano;
    }

   
    SeleccionarPalabra() {
       let palabra = (Math.floor(Math.random() * (this.palabrasRandom.length - 0 + 1)) + 0); 
      
       this.palabraSeleccionada = this.palabrasRandom[palabra];
       return  this.palabraSeleccionada;
    }

}
