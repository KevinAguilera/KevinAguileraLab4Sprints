import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ChatService } from 'src/app/servicios/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  mensaje:string='';
  element:any;

  constructor(public chatServ :ChatService , private afs:AngularFirestore) { 
   this.chatServ.cargarMensajes().subscribe(()=>{
      setTimeout(()=> {
        this.element.scrollTop=this.element.scrollHeight;
      },20)
    });   
   
  }

  ngOnInit():void{
    this.element=document.getElementById('mensajes');
  }
  enviar_mensaje(){
    
    if(this.mensaje.length!=0){
      this.element.scrooltop=this.element.scrolHeight;
      this.chatServ.agregarMensaje(this.mensaje)
      .then(()=> this.mensaje="")
      .catch( (e:any)=>console.log("Error",e));
    }
  //console.log(this.mensaje);
  this.mensaje='';
  }
}
