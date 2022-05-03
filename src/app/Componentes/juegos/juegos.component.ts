import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
  }
  Juego(tipo: string) {
    this.router.navigate(['/Juegos/'+tipo]);
  }
}
