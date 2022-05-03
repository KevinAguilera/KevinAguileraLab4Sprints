import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  estado_activo:boolean;
  mail_usuario?:string; 
  perfil:string;
  user:any;
  constructor(private authSv: AuthService, private router: Router,public authFire: AngularFireAuth) {
    //obtengo el mail del usuario logueado
    this.authFire.authState.subscribe(res=>{
      if(res && res.uid){
        this.mail_usuario = res.email;
        
        console.log(this.mail_usuario);
        this.authSv.getUserByMail(this.mail_usuario).then(res =>{
          if(res.length > 0)
          { 
            console.log(res);
            this.user=res[0];
            this.perfil=res[0].perfil;
            console.log("perfil::" +this.perfil);
          }
        }, error=>{});
        console.log("perfil::" +this.perfil);

      } else { console.log(' No hay usuario logueado ');}
    });

    
   }


  ngOnInit(): void {
    this.authSv.isLoggedIn().subscribe(
      data => {
        this.user = data;
        if(this.user){
          this.estado_activo = true;
         // this.mail_usuario='sofia@sofia';
        }
        else{ this.estado_activo = false;
          //this.mail_usuario='';
        }

      },
      err => console.log(err)
    );
  }

  async cerrarSesion(){
    try {
      await this.authSv.logout();
      this.estado_activo = false;
    } catch (error) {
      console.log("Error al cerrar sesion" + error);
    }
  } 


}
