import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from 'src/app/Componentes/ahorcado/ahorcado.component';
import { MayoOMenorComponent } from 'src/app/Componentes/mayo-omenor/mayo-omenor.component';
import { PreguntadosComponent } from 'src/app/Componentes/preguntados/preguntados.component';

@NgModule({
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }