import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { OrganoService } from '../../../servicios/organo.service';
import { SedeService } from '../../../servicios/sede.service';
import { Organo, ResultOrgano } from '../../../interfaces/organo-interface';
import { ResultSede } from '../../../interfaces/sede-interface';
import { ColumnaTabla } from 'src/app/interfaces/columna-tabla';
import { TableMaterialComponent } from 'src/app/shared/table-material/table-material.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-organo',
  templateUrl: './organo.component.html',
  styleUrls: ['./organo.component.css'],
})
export class OrganoComponent implements OnInit {
  listOrgano?: Organo[];
  listSedes?: Array<any>;
  organoForm: FormGroup;
  organoEditarForm: FormGroup;
  ids?: string | number;
  estado: string = '1';
  carga: boolean = false;
  p: number = 1;

  //SHARED TABLA GENERAL
  columnasPersonal:ColumnaTabla[] = [
    { campo: 'nombre', titulo: 'Nombre' },
    { campo: 'sigla', titulo: 'Sigla' },
    { campo: 'Sede.nombre', titulo: 'Sede' }
  ];
  page: number = 1;
  total:number = 0;
  pageSize:number = 30;

  @ViewChild(TableMaterialComponent) tabla!: TableMaterialComponent;

  constructor(
    private organoService: OrganoService,
    private sedeService: SedeService,
    private fb: FormBuilder
  ) {
    this.organoForm = this.fb.group({
      nombre: ['', Validators.required],
      sigla: ['', Validators.required],
      sede: ['', Validators.required],
    });
    this.organoEditarForm = this.fb.group({
      nombre: ['', Validators.required],
      sigla: ['', Validators.required],
      sede: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarOrgano(0,this.pageSize);
    this.mostrarSede();
  }

  mostrarOrgano(page:number,limit:number) {
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
    this.organoService.getOrgano(this.estado,page,limit).subscribe(
      (data: ResultOrgano) => {
        //this.listOrgano = data.resp;
        this.carga = false;
        this.total = data.totalRegistros;
        //this.pageSize = data.totalPaginas;
        this.tabla.setData(data.resp);
        if (!this.carga) {
          Swal.close();
        }
        console.log(this.listOrgano);
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

  editar(event:Organo){
     this.organoEditarForm.setValue({
          nombre: event.nombre,
          sigla: event.sigla,
          sede: event.id_sede,
        });
        this.ids = event.id;
  }
  eliminar(event:Organo){
     Swal.fire({
      title: 'Estas seguro?',
      text:'El Organo sera Eliminado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.organoService.deleteOrgano(event.id, 0).subscribe(
          (data) => {
            this.mostrarOrgano(0,this.pageSize);
            Swal.fire(
              'Eliminado',
              'Correcto',
              'success'
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
    
  }
  cambiarPagina(event:PageEvent){
  this.page = event.pageIndex + 1;
  this.pageSize = event.pageSize;
  console.log(this.page,this.pageSize);
  this.mostrarOrgano(this.page,this.pageSize);  
  
  }
  mostrarSede() {
    this.sedeService.getSedes().subscribe(
      (data: ResultSede) => {
        this.listSedes = data.resp;
        console.log(this.listSedes);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registrarOrgano() {
    const formData = new FormData();
    formData.append('nombre', this.organoForm.get('nombre')?.value);
    formData.append('sigla', this.organoForm.get('sigla')?.value);
    formData.append('id_sede', this.organoForm.get('sede')?.value);
    this.organoService.postOrgano(formData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Registrado!', 'Se registro el organo con exito', 'success');
        this.mostrarOrgano(0,this.pageSize);
        this.cancelar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarOrgano() {
    const formData = new FormData();
    formData.append('nombre', this.organoEditarForm.get('nombre')?.value);
    formData.append('sigla', this.organoEditarForm.get('sigla')?.value);
    formData.append('id_sede', this.organoEditarForm.get('sede')?.value);

    this.organoService.putOrgano(formData, this.ids!).subscribe(
      (data) => {
        Swal.fire('Editado!', 'Se edito el organo con exito', 'success');
        this.mostrarOrgano(0,this.pageSize);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarOrgano(id: number, estado: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text:
        estado === 1
          ? 'El Organo sera habilitado'
          : 'El Organo sera deshabilitado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.organoService.deleteOrgano(id, estado).subscribe(
          (data) => {
            this.mostrarOrgano(0,this.pageSize);
            Swal.fire(
              estado === 1 ? 'Habilitado' : 'Deshabilitado',
              'Correcto',
              'success'
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  mostrarOrganoTipo(event: any) {
    console.log(event.target.value);
    this.estado = event.target.value;
    this.mostrarOrgano(0,this.pageSize);
  }

  obtenerOrganoId(id: number) {
    this.organoService.getOrganoId(id).subscribe(
      (data) => {
        this.organoEditarForm.setValue({
          nombre: data.resp.nombre,
          sigla: data.resp.sigla,
          sede: data.resp.id_sede,
        });
        this.ids = data.resp.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.organoForm.setValue({
      nombre: '',
      sigla: '',
      sede: '',
    });
    this.organoEditarForm.setValue({
      nombre: '',
      sigla: '',
      sede: '',
    });
  }
}
