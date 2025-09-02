import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistorialService } from '../../servicios/historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  listHistorial?: Array<any>;
  idFiltro: string = '';
  historialForm:FormGroup;
  p: number = 1;

  constructor(
    private fb:FormBuilder,
    private historialService: HistorialService
  ) {
    this.historialForm = this.fb.group({
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarHistorial();
  }

  mostrarHistorial(){
    this.historialService.getHistorial(this.idFiltro).subscribe(
      (data)=>{
        this.listHistorial = data.resp;
      }, (error)=>{
        console.log(error);
      }
    )
  }

  filtrar() {
    if (this.idFiltro !== '') {
      this.mostrarHistorial();
    }
    if (this.idFiltro === '0') {
      this.idFiltro = '';
      this.mostrarHistorial();
    }
  }


  tipoFiltro(event: any) {
    this.idFiltro = event.target.value;
    console.log(this.idFiltro);
  }

}
