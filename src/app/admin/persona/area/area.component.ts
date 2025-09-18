import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AreaService } from '../../../servicios/area.service';
import { DependenciaService } from '../../../servicios/dependencia.service';

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
    this.mostrarAreas();
    this.mostrarUnidadOrganica();
  }

  mostrarAreas() {
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
      (data) => {
        this.listArea = data.resp;
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
        this.mostrarAreas();
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
        this.mostrarAreas();
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
            this.mostrarAreas();
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
    this.mostrarAreas();
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
