import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TipoLicenciaService } from '../../servicios/tipo-licencia.service';

@Component({
  selector: 'app-tipo-licencia',
  templateUrl: './tipo-licencia.component.html',
  styleUrls: ['./tipo-licencia.component.css'],
})
export class TipoLicenciaComponent implements OnInit {
  listTipolicencia?: Array<any>;
  tipolicenciaform: FormGroup;
  tipolicenciaEditarform: FormGroup;
  ids?: string | number;
  estado: string = '1';
  carga: boolean = false;

  constructor(
    private tipolicenciaService: TipoLicenciaService,
    private fb: FormBuilder
  ) {
    this.tipolicenciaform = this.fb.group({
      nombre: ['', Validators.required],
    });
    this.tipolicenciaEditarform = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarTipolicencia();
  }

  mostrarTipolicencia() {
    this.carga = true;
    if (this.carga) {
      Swal.fire({
        title: 'Cargando datos!',
        html: 'Por favor espere.',
        timer: 1500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    this.tipolicenciaService.getTipoLicencia(this.estado).subscribe(
      (data) => {
        this.listTipolicencia = data.resp;
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

  registrarTipolicencia() {
    const formData = new FormData();
    formData.append('nombre', this.tipolicenciaform.get('nombre')?.value);
    this.tipolicenciaService.postTipolicencia(formData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire(
          'Registrado!',
          'Se registro el tipo de licencia con exito',
          'success'
        );
        this.mostrarTipolicencia();
        this.cancelar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarTipolicencia() {
    const formData = new FormData();
    formData.append('nombre', this.tipolicenciaEditarform.get('nombre')?.value);
    this.tipolicenciaService.putTipolicencia(formData, this.ids!).subscribe(
      (data) => {
        console.log(data);
        Swal.fire(
          'Editado!',
          'Se edito el tipo de licencia con exito',
          'success'
        );
        this.mostrarTipolicencia();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarTipolicencia(id: number, estado: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text:
        estado === 1
          ? 'El tipo de licencia sera habilitado'
          : 'El tipo de licencia sera deshabilitado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipolicenciaService.deleteTipolicencia(id, estado).subscribe(
          (data) => {
            this.mostrarTipolicencia();
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

  mostrarTipolicTipo(event: any) {
    console.log(event.target.value);
    this.estado = event.target.value;
    this.mostrarTipolicencia();
  }

  obtenerTipolicenciaId(id: number) {
    this.tipolicenciaService.getTipolicenciaId(id).subscribe(
      (data) => {
        this.tipolicenciaEditarform.setValue({
          nombre: data.resp.nombre,
        });
        this.ids = data.resp.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.tipolicenciaform.setValue({
      nombre: '',
    });
    this.tipolicenciaEditarform.setValue({
      nombre: '',
    });
  }
}
