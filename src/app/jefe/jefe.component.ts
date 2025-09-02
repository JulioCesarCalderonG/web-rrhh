import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jefe',
  templateUrl: './jefe.component.html',
  styleUrls: ['./jefe.component.css']
})
export class JefeComponent implements OnInit {

  ano= new Date().getFullYear();
  constructor(
  ) { }

  ngOnInit(): void {
    this.cargar();
  }
  cargar(){
    if (sessionStorage.getItem('carga')==='0') {
      location.reload();
      sessionStorage.setItem('carga','1');
    }
  }
}
