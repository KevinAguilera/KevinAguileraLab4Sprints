import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

   user:string;
   cuil:number;
   //email:string;
   sexo:string;
   clave:string;
   clave2:string;

   registroForm = new FormGroup({
    correo: new FormControl(''),
    clave: new FormControl(''),
    });  

  constructor( private toastr: ToastrService,
    private authService: AuthService,private formBuilder: FormBuilder,
    private router: Router ) {
      this.registroForm = this.formBuilder.group({
        correo:['', [Validators.required, Validators.email,
          Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
        clave:['', [Validators.required, Validators.minLength(6)]]
      });
   }

  registro()
  {
    const { correo, clave } = this.registroForm.value;
    console.log("email:: "+correo);
    console.log("constraseña:: "+ clave)
    //if(this.user!= null && this.cuil!=null && this.sexo!=null && this.email!=null && this.clave!=null && this.clave2!=null)
    //{
      //if(this.clave == this.clave2)
      //{
        if(this.registroForm.valid){
         this.authService.register(correo, clave)
         .then(auth => {
           this.authService.login(correo, clave)
           .then(res => {
            this.router.navigate(['/Home']);
          })
         })
         .catch(err => {
           console.log("Usuario ya registrado");
          // this.toastr.error("Usuario ya registrado", "ERROR");
         })
        }
     // }
     //else
     // {
      // this.toastr.error("Las claves no coinciden", "ERROR");

     // }
   // }
    //else
//{
    //  this.toastr.error("Datos incompletos o inválidos", "ERROR");
  //  }
  }


  ngOnInit() {
  }

  get email(){
    return this.registroForm.get('email');
  }
  get emailValido(){
    return this.email?.touched && this.email.valid;
  }
  get emailInvalido(){
    return this.email?.touched && this.email.invalid;
  }

  /**campo password */
  get password(){
    return this.registroForm.get('clave');
  }
  get passwordValido(){
    return this.password?.touched && this.password.valid;
  }
  get passwordInvalido(){
    return this.password?.touched && (this.password.value).minLength<4;
  }


  }
