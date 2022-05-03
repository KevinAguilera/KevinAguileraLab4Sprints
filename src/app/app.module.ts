import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { QuienSoyComponent } from './page/quien-soy/quien-soy.component';
import { RegistroComponent } from './page/registro/registro.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig  } from 'src/environments/environment';
import { MenuPrincipalComponent } from './page/menu-principal/menu-principal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AhorcadoComponent } from './Componentes/ahorcado/ahorcado.component';
import { MayoOMenorComponent } from './Componentes/mayo-omenor/mayo-omenor.component';
import { PreguntadosComponent } from './Componentes/preguntados/preguntados.component';
import { JuegosComponent } from './Componentes/juegos/juegos.component';
import { ChatComponent } from './Componentes/chat/chat.component';
import { ListadosComponent } from './Componentes/listados/listados.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    QuienSoyComponent,
    RegistroComponent,
    MenuPrincipalComponent,
    AhorcadoComponent,
    MayoOMenorComponent,
    PreguntadosComponent,
    JuegosComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
