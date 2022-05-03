import { Component, OnInit } from '@angular/core';
import { Ahorcado } from 'src/app/clases/ahorcado';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  palabraEnJuego:string;
  nuevoJuego: Ahorcado;
  enJuego: boolean = false;
  repetidor: any;
  registrarSecuencia = false;
  contadorIntentos: number = 0;
  contadorAciertos:number=0;
  contadorPuntos:number=0;
  vidas:number=0;
  dibujito:string;
  juegoOff:boolean;
  palabraEscondida:string;

  user: any;
  save: boolean = false;
  letras:Array<string> = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z'];
  letrasUtilizadas:string= '';

  constructor(private toastr: ToastrService, private authService: AuthService,
    private dataService: DataService,private fire:AngularFireAuth) { 
    this.nuevoJuego=new Ahorcado();
  }

  ngOnInit(): void {
    this.dibujito="./assets/imagenes/Ahorcado/ahorcado1.png";
    this.getCurrentUser();
    setTimeout(()=>{},100)
  }

  nuevo() {
    this.contadorPuntos=0;
    this.letrasUtilizadas="";
    this.dibujito="./assets/imagenes/Ahorcado/ahorcado1.png";
    this.vidas=7;
    this.save = false;
    this.contadorIntentos = 0;
    this.enJuego = true;
    this.palabraEnJuego= this.nuevoJuego.SeleccionarPalabra();
    console.log(this.palabraEnJuego);
    this.palabraEscondida='';
    for(let i=0;i<this.palabraEnJuego.length;i++){
      this.palabraEscondida+='-';
    }
  }

  
  finalizar(){
    this.contadorPuntos=0;
    this.enJuego = false;
    this.juegoOff = !this.enJuego;
    this.vidas=7;
    this.palabraEscondida="";
    this.palabraEnJuego="";
    this.letrasUtilizadas="";
    this.toastr.error("¿¿Te rendiste??", "Manco");
  }

  guardar(){
    this.user.puntajes[0]['ahorcadoJugados'] += 1;
    
    console.info(this.user);
    console.info(this.user.puntajes[0]['ahorcadoJugados']);
    this.dataService.savePuntaje('ahorcado', this.user, this.contadorPuntos)
      .then(() => {
        this.toastr.success("Puntos guardados")
      })
      .catch(err => {
        this.toastr.error("Al guardar: " + err.message, "Error");
      })
      this.save=false;
  }

  getCurrentUser() {
    var uid="0";
     this.authService.getUserUid().then(res =>{
       uid = res.toString();
       this.dataService.getUserByUid(uid)
          .subscribe(res => {
            this.user = res;
          })
     }).catch(res =>{
      uid = res.toString();
      console.log("Sin Usuario");
     });
  }

  seleccionarLetra(letra:string){
    this.letrasUtilizadas+=letra+' ';
    console.log(this.letrasUtilizadas);

    let palabra = [...this.palabraEscondida];  
    
    let contador = palabra.length;

    for (let i=0; i<palabra.length; i++) { 
      if(this.palabraEnJuego.charAt(i) ==letra) { 
        palabra[i] = letra; 
        contador--; 
        this.contadorPuntos++; 
      }
    } 
    if(contador == palabra.length) { 
      this.vidas--;
      this.contadorPuntos--;
      this.DibujarAhorcado();
    }
    this.palabraEscondida = palabra.join(""); 
  
    if(this.palabraEscondida == this.palabraEnJuego) { 
      this.save = true;
      this.enJuego = false;
      this.juegoOff = !this.enJuego;
      this.toastr.success("¡¡¡Ganaste!!!", "Felicitaciones!");
    }
  }

  DibujarAhorcado() {
    switch(this.vidas) {
      case 6:
        this.dibujito ="./assets/imagenes/Ahorcado/ahorcado2.png";    
        break;
      case 5:
        this.dibujito ="./assets/imagenes/Ahorcado/ahorcado3.png";    
        break;
      case 4:
          this.dibujito ="./assets/imagenes/Ahorcado/ahorcado4.png";    
        break;
      case 3:    
        this.dibujito = "./assets/imagenes/Ahorcado/ahorcado5.png";    
        break;
      case 2: 
        this.dibujito = "./assets/imagenes/Ahorcado/ahorcado6.png";     
        break;
      case 1: 
        this.dibujito = "./assets/imagenes/Ahorcado/ahorcado7.png"; 
        break;
      case 0: 
        this.dibujito = "./assets/imagenes/Ahorcado/ahorcado8.png"; 
        this.save = true;    
        this.enJuego = false;
        this.juegoOff = !this.enJuego;
        this.toastr.error("PERDISTE...");
        break; 
    }
  }

}
