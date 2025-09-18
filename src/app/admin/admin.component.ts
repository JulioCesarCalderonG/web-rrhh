import { Component, OnInit } from '@angular/core';
import { MenuService } from '../servicios/menu.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: [
  ]
})
export class AdminComponent implements OnInit {

  ano= new Date().getFullYear();
  constructor(
    private menuServ:MenuService
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
