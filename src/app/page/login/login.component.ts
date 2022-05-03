import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
private subscription: Subscription;
  email = '';
  clave= '';
  nombre="";
  estado=false;
  progreso: number;
  progresoMensaje="esperando...";
  logeando=true;
  ProgresoDeAncho:string;
  spiner:boolean = false;
  emailClass = "form-control";
  claveClass = "form-control";

  clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private route: ActivatedRoute,
    private rutas: Router,
    private auth:AuthService,
    private toast:ToastrService) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";

  }

  ngOnInit(): void {
  }

  invitado(){
    
    this.email = "invitado@invitado.com";
    this.clave = "123456";
  }

  administrador(){
    this.email = "kevin@gmail.com";
    this.clave = "222222";
  }

  invitado2(){
    this.email = "sofia@saladejuegossr.com";
    this.clave = "123456";
  }
  Entrar() {
   
    this.spiner=true
    this.emailClass="form-control";
    this.claveClass="form-control";

    if(this.email.length<4)
    {
      this.emailClass="form-control error";

    }
    if(this.clave.length<4)
    {
      this.claveClass="form-control error";

    }
    
    this.auth.login(this.email, this.clave)
      .then(res => {
        this.spiner=false;
        this.rutas.navigate(['/Home']).then(()=> this.usuarioLogueado());
      })
      .catch(error => {
       
        this.toast.error("Los datos son incorrectos o no existe el usuario");
        this.spiner=false;
        this.logeando =true;
       
      })
  }

  usuarioLogueado() { 
    let usuario= this.auth.getUserUid();//.getCurrentUser();
    if(usuario == null) {
    this.estado =false;
    }
    else if(usuario!=null){
      console.log("UID::"+JSON.stringify(usuario));
      //this.nombre= usuario;
      this.estado =true;
    }
  }


}
