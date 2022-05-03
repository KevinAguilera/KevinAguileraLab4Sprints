import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Chat } from '../clases/chat';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public usuario:any={};

  public chats:Chat[]=[];

  private chatsCollection:any;

  constructor(private afs:AngularFirestore , public afAuth:AngularFireAuth) {
    this.afAuth.authState.subscribe(user=>{
      if(user){
        this.usuario.name=user.displayName;
        this.usuario.email=user.email;
        this.usuario.id=user.uid;
      }
    });
    this.chatsCollection=this.afs.collection<Chat>('chats',ref=>ref.orderBy('date','desc').limit(10));
   }
  

  cargarMensajes(){
   return this.chatsCollection.valueChanges().pipe(map(
    (mensajes:Chat[])=>{
      
      this.chats=[];
      for(let mensaje of mensajes){
        this.chats.unshift(mensaje);
      }
    }
   ))
  }

  agregarMensaje(texto:string){
    let dayandHour=new Date().toLocaleDateString()+" - "+new Date().toLocaleTimeString();
    let mensaje:Chat={
        nombre:this.usuario.name,
        email:this.usuario.email,
        mensaje:texto,
        date:new Date().getTime(),
        time:dayandHour,
        id:this.usuario.id
    }
    //var scrollDiv= <HTMLOutputElement>document.getElementById("idChat");
     //pongo el scroll en el fondo
    // scrollDiv.scrollTop=scrollDiv.scrollHeight;
    return this.chatsCollection.add(mensaje);
  }

}
