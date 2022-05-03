import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  estaLogueado:boolean=false;

  constructor(private router: Router, public authFire: AngularFireAuth) {
    this.authFire.authState.subscribe(res=>{
      if(res && res.uid){
       this.estaLogueado=true;

      } else { console.log(' No hay usuario logueado ');}
    });
   }
  

  ngOnInit(): void {
  }

  Juego(tipo: string) {
    this.router.navigate(['/Juegos/'+tipo]);
  }
}
