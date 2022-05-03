import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit {

  juegoElegido:string='';
  listado:any;
  constructor(private dataSrv:DataService) { }

  ngOnInit(): void {
  }

  ConsultarPuntos(juego:string){
    console.log(juego);
    this.dataSrv.getPuntosByJuego(juego).subscribe((res)=>{
      console.log(res);
      this.listado = res;
      console.log(this.listado);
    });
  }

}
