import { PersonalService } from '../../../servicios/personal.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ColumnaTabla } from 'src/app/interfaces/columna-tabla';
import { Personal, PersonalResult } from 'src/app/interfaces/result-personal';
import { TableMaterialComponent } from 'src/app/shared/table-material/table-material.component';
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

  //SHARED TABLA GENERAL
  columnasPersonal: ColumnaTabla[] = [
    { campo: 'nombre', titulo: 'Nombres' },
    { campo: 'apellido', titulo: 'Apellidos' },
    { campo: 'escalafon', titulo: 'Escalafon' },
    { campo: 'fecha_inicio', titulo: 'FechaInicio' }
  ];
  page: number = 1;
  total: number = 0;
  pageSize: number = 30;

  @ViewChild(TableMaterialComponent) tabla!: TableMaterialComponent;
  tipo: number = 2
  constructor(
    private personalService: PersonalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mostrarPersonal(0, this.pageSize);
  }

  mostrarPersonal(page: number, limit: number) {
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
    this.personalService.getPersonal(this.estado, this.inputBuscar, page, limit).subscribe(
      (data: PersonalResult) => {
        this.carga = false;
        this.total = data.totalRegistros;
        this.tabla.setData(data.resp);
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
  reporte(event: Personal) {
    this.router.navigateByUrl(
      `admin/reporte/reporte-laboral/${event.id}/${event.nombre} ${event.apellido}`
    );
  }
  cambiarPagina(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    console.log(this.page, this.pageSize);
    this.mostrarPersonal(this.page, this.pageSize);

  }
  buscar(event: string) {
    this.inputBuscar = event;
    if (this.inputBuscar.length >= 0) {
      this.personalService.getPersonal(this.estado, this.inputBuscar,0,this.pageSize).subscribe(
        (data:PersonalResult) => {
          this.total = data.totalRegistros;
          this.tabla.setData(data.resp);
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
    //this.mostrarPersonal();
  }
  redireccionarCrear(id: number, nombre: string, apellido: string) {
    this.router.navigateByUrl(
      `admin/reporte/reporte-laboral/${id}/${nombre} ${apellido}`
    );
  }
}
