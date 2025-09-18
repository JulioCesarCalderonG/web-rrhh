import { PersonalService } from '../../../servicios/personal.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-record-laboral',
  templateUrl: './record-laboral.component.html',
  styleUrls: ['./record-laboral.component.css'],
})
export class RecordLaboralComponent implements OnInit {
  listPersonal?: Array<any>;
  estado: string = '1';
  inputBuscar: string = '';
  carga: boolean = false;
  p: number = 1;
  
  constructor(
    private personalService: PersonalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mostrarPersonal();
  }

  mostrarPersonal() {
    this.carga = true;
    if (this.carga) {
      Swal.fire({
        title: 'Cargando datos!',
        html: 'Por favor espere.',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    this.personalService.getPersonal(this.estado, this.inputBuscar).subscribe(
      (data) => {
        this.listPersonal = data.resp;
        this.carga = false;
        if (!this.carga) {
          Swal.close();
        }
      },
      (error) => {
        this.carga = false;
        if (!this.carga) {
          Swal.close();
        }
        console.log(error);
      }
    );
  }

  buscar(event: string) {
    this.inputBuscar = event;
    if (this.inputBuscar.length >= 0) {
      this.personalService.getPersonal(this.estado, this.inputBuscar).subscribe(
        (data) => {
          this.listPersonal = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  mostrarPersonalTipo(event: any) {
    console.log(event.target.value);
    this.estado = event.target.value;
    this.mostrarPersonal();
  }
  redireccionarCrear(id: number, nombre: string, apellido: string) {
    this.router.navigateByUrl(
      `admin/reporte-laboral/${id}/${nombre} ${apellido}`
    );
  }
}
