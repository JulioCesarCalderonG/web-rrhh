import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DependenciaService } from '../../servicios/dependencia.service';
import { OrganoService } from '../../servicios/organo.service';
import { ResultOrgano } from '../../interfaces/organo-interface';

@Component({
  selector: 'app-dependencia',
  templateUrl: './dependencia.component.html',
  styleUrls: ['./dependencia.component.css'],
})
export class DependenciaComponent implements OnInit {
  listUnidad?: Array<any>;
  listOrgano?: Array<any>;
  unidadForm: FormGroup;
  unidadEditarForm: FormGroup;
  ids?: string | number;
  estado: string = '1';
  carga: boolean = false;
  p: number = 1;

  constructor(
    private dependenciaService: DependenciaService,
    private organoService: OrganoService,
    private fb: FormBuilder
  ) {
    this.unidadForm = this.fb.group({
      nombre: ['', Validators.required],
      sigla: ['', Validators.required],
      organo: ['', Validators.required],
    });
    this.unidadEditarForm = this.fb.group({
      nombre: ['', Validators.required],
      sigla: ['', Validators.required],
      organo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarUnidadOrganica();
    this.mostrarOrgano();
  }

  mostrarUnidadOrganica() {
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
    this.dependenciaService.getUnidad(this.estado).subscribe(
      (data) => {
        this.listUnidad = data.resp;
        this.carga = false;
        if (!this.carga) {
          Swal.close();
        }
        console.log(this.listUnidad);
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

  mostrarOrgano() {
    this.organoService.getOrgano().subscribe(
      (data: ResultOrgano) => {
        this.listOrgano = data.resp;
        console.log(this.listOrgano);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registrarUnidadOrganica() {
    const formData = new FormData();
    formData.append('nombre', this.unidadForm.get('nombre')?.value);
    formData.append('sigla', this.unidadForm.get('sigla')?.value);
    formData.append('id_organo', this.unidadForm.get('organo')?.value);

    this.dependenciaService.postUnidad(formData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire(
          'Registrado!',
          'Se registro la unidad organica con exito',
          'success'
        );
        this.mostrarUnidadOrganica();
        this.cancelar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarUnidadOrganica() {
    const formData = new FormData();
    formData.append('nombre', this.unidadEditarForm.get('nombre')?.value);
    formData.append('sigla', this.unidadEditarForm.get('sigla')?.value);
    formData.append('id_organo', this.unidadEditarForm.get('organo')?.value);

    this.dependenciaService.putUnidad(formData, this.ids!).subscribe(
      (data) => {
        console.log(data);
        Swal.fire(
          'Editado!',
          'Se edito la unidad organica con exito',
          'success'
        );
        this.mostrarUnidadOrganica();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarUnidad(id: number, estado: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text:
        estado === 1
          ? 'La Unidad sera habilitado'
          : 'La Unidad sera deshabilitado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, estoy seguro!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dependenciaService.deleteUnidad(id, estado).subscribe(
          (data) => {
            this.mostrarUnidadOrganica();
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

  mostrarUnidadTipo(event: any) {
    console.log(event.target.value);
    this.estado = event.target.value;
    this.mostrarUnidadOrganica();
  }

  obtenerUnidadId(id: number) {
    this.dependenciaService.getUnidadId(id).subscribe(
      (data) => {
        this.unidadEditarForm.setValue({
          nombre: data.resp.nombre,
          sigla: data.resp.sigla,
          organo: data.resp.id_organo,
        });
        this.ids = data.resp.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.unidadForm.setValue({
      nombre: '',
      sigla: '',
      organo: '',
    });
    this.unidadEditarForm.setValue({
      nombre: '',
      sigla: '',
      organo: '',
    });
  }
}
