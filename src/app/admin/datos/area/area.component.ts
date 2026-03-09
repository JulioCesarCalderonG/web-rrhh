import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AreaService } from '../../../servicios/area.service';
import { DependenciaService } from '../../../servicios/dependencia.service';
import { ColumnaTabla } from 'src/app/interfaces/columna-tabla';
import { TableMaterialComponent } from 'src/app/shared/table-material/table-material.component';
import { ResultArea } from 'src/app/interfaces/area-interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-area',
  standalone:false,
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent implements OnInit {
  listArea?: Array<any>;
  listUnidad?: Array<any>;
  areaForm: FormGroup;
  areaEditarForm: FormGroup;
  ids?: string | number;
  estado: string = '1';
  carga: boolean = false;
  p: number = 1;
//SHARED TABLA GENERAL
  columnasPersonal:ColumnaTabla[] = [
    { campo: 'nombre', titulo: 'nombre' },
    { campo: 'sigla', titulo: 'sigla' },
    { campo: 'UnidadOrganica.nombre', titulo: 'Unidad Organica' }
  ];
  page: number = 1;
  total:number = 0;
  pageSize:number = 30;

  @ViewChild(TableMaterialComponent) tabla!: TableMaterialComponent;
  constructor(
    private areaService: AreaService,
    private dependenciaService: DependenciaService,
    private fb: FormBuilder
  ) {
    this.areaForm = this.fb.group({
      nombre: ['', Validators.required],
      sigla: ['', Validators.required],
      unidad: ['', Validators.required],
    });
    this.areaEditarForm = this.fb.group({
      nombre: ['', Validators.required],
      sigla: ['', Validators.required],
      unidad: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarAreas(0,this.pageSize);
    this.mostrarUnidadOrganica();
  }

  mostrarAreas(page:number,limit:number) {
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
    this.areaService.getAreas(this.estado).subscribe(
      (data:ResultArea) => {
        //this.listArea = data.resp;
        this.carga = false;
        this.total = data.totalRegistros;
        //this.pageSize = data.totalPaginas;
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
editar(event:any){
    console.log(event);
  }
  eliminar(event:any){
    console.log(event);
    
  }
  cambiarPagina(event:PageEvent){
  this.page = event.pageIndex + 1;
  this.pageSize = event.pageSize;
  console.log(this.page,this.pageSize);
  this.mostrarAreas(this.page,this.pageSize);  
  
  }
  mostrarUnidadOrganica() {
    this.dependenciaService.getUnidad().subscribe(
      (data) => {
        this.listUnidad = data.resp;
        console.log(this.listUnidad);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registrarAreas() {
    const formData = new FormData();
    formData.append('nombre', this.areaForm.get('nombre')?.value);
    formData.append('sigla', this.areaForm.get('sigla')?.value);
    formData.append('id_unidad_organica', this.areaForm.get('unidad')?.value);

    this.areaService.postAreas(formData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Registrado!', 'Se registro el area con exito', 'success');
        this.mostrarAreas(0,this.pageSize);
        this.cancelar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarAreas() {
    const formData = new FormData();
    formData.append('nombre', this.areaEditarForm.get('nombre')?.value);
    formData.append('sigla', this.areaEditarForm.get('sigla')?.value);
    formData.append(
      'id_unidad_organica',
      this.areaEditarForm.get('unidad')?.value
    );

    this.areaService.putAreas(formData, this.ids!).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Editado!', 'Se edito el area con exito', 'success');
        this.mostrarAreas(0,this.pageSize);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  eliminarArea(id: number, estado: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text:
        estado === 1 ? 'El area sera habilitado' : 'El area sera deshabilitado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.areaService.deleteAreas(id, estado).subscribe(
          (data) => {
            this.mostrarAreas(0,this.pageSize);
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
  mostrarAreaTipo(event: any) {
    console.log(event.target.value);
    this.estado = event.target.value;
    this.mostrarAreas(0,this.pageSize);
  }
  obtenerDatosId(id: number) {
    this.areaService.getAreaId(id).subscribe(
      (data) => {
        this.areaEditarForm.setValue({
          nombre: data.resp.nombre,
          sigla: data.resp.sigla,
          unidad: data.resp.id_unidad_organica,
        });
        this.ids = data.resp.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.areaForm.setValue({
      nombre: '',
      sigla: '',
      unidad: '',
    });
    this.areaEditarForm.setValue({
      nombre: '',
      sigla: '',
      unidad: '',
    });
  }
}
