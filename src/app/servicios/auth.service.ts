import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dbUsersRef:AngularFirestoreCollection<any>;

  constructor(
    private AFauth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore) {
      this.dbUsersRef=this.db.collection("usuarios");
  }

  getUserUid()
  {  
      return new Promise((resolve, reject) => {
        this.AFauth.onAuthStateChanged(function(user){
            if(user)
            {
              console.log(user);
              resolve(user.uid)
            }
            else
            {
              resolve("0")
            }
        })
        
      })
  }
  getUserEmail()
  {  
      return new Promise((resolve, reject) => {
        this.AFauth.onAuthStateChanged(function(user){
            if(user)
            {
              console.log(user);
              resolve(user.email)
            }
            else
            {
              resolve("0")
            }
        })
        
      })
  }

    
  getLogueado (){

    let user = this.AFauth.currentUser;
    console.log(user);
    if(user != undefined && user!= null)
    {
      console.log(user); 
      console.log(JSON.stringify(user));
      console.info(JSON.stringify(user));
      return true;
    }
    else
    {
      return false;
    }
  }

  async getUserByMail(email: string) {

    console.log("buscando usuario por mail");
    let usrsRef = await this.dbUsersRef.ref.where("email", "==", email).get();
    let listado:Array<any> = new Array<any>();
    usrsRef.docs.map(function(x){
        listado.push(x.data());
    });
    return listado;
  }

  /*getCurrentUserMail(): string {
    return firebase.auth().currentUser.email;
  }*/

  getCurrentUser() {
     let user = this.AFauth.currentUser;
    return user;
  }

  isLoggedIn() {
    return this.AFauth.authState;
  }

  login(email: string, password: string) {

    return new Promise((resolve, reject) => {
      this.AFauth.signInWithEmailAndPassword(email, password)
        .then(user => {
          let fecha=new Date();
          this.db.collection('ingresos').add({
            email: email,
            fechaacceso:  fecha.getDate() + '-' + (fecha.getMonth()+1) +  '-' +fecha.getFullYear(),
            dato: 'Ingreso al sistema'
        })
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    })
  }

  logout() {
    this.AFauth.signOut().then(() => {
      this.router.navigate(['/Login']);
    })
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res.user.uid);
          const uid = res.user.uid;
          this.db.collection("usuarios").doc(res.user.uid).set({
            uid: uid,
            email:email,
            clave:password,
            perfil: 'usuario',
            puntajes : [
              {'ahorcadoJugados': 0},
              {'mayorMenosJugados': 0},
              {'preguntadosJugados': 0},
              {'simonJugados': 0}
            ]
          })
          resolve(res)
        })
        .catch(error => { reject(error) });
    });
  }

}
