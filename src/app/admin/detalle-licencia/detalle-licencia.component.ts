import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DetalleLicenciaService } from '../../servicios/detalle-licencia.service';
import { TipoLicenciaService } from '../../servicios/tipo-licencia.service';

@Component({
  selector: 'app-detalle-licencia',
  templateUrl: './detalle-licencia.component.html',
  styleUrls: ['./detalle-licencia.component.css'],
})
export class DetalleLicenciaComponent implements OnInit {
  listDetallelicencia?: Array<any>;
  listTipoLicencia?: Array<any>;
  detallelicenciaForm: FormGroup;
  detallelicenciaEditarForm: FormGroup;
  ids?: string | number;
  estado: string = '1';
  carga: boolean = false;
  p: number = 1;

  constructor(
    private detallelicenciaService: DetalleLicenciaService,
    private tipodetalle: TipoLicenciaService,
    private fb: FormBuilder
  ) {
    this.detallelicenciaForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo_detalle: ['', Validators.required],
    });
    this.detallelicenciaEditarForm = this.fb.group({
      nombre: ['', Validators.required],
      tipo_detalle: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarDetallelicencia();
    this.mostrarTipoDetalle();
  }

  mostrarDetallelicencia() {
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
    this.detallelicenciaService.getDetalleLicencia(this.estado).subscribe(
      (data) => {
        this.listDetallelicencia = data.resp;
        this.carga = false;
        if (!this.carga) {
          Swal.close();
        }
        console.log(data);
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

  mostrarTipoDetalle() {
    this.tipodetalle.getTipoLicencia('1').subscribe(
      (data) => {
        this.listTipoLicencia = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registrarDetallelicencia() {
    const formData = new FormData();
    formData.append('nombre', this.detallelicenciaForm.get('nombre')?.value);
    formData.append(
      'id_tipo_licencia',
      this.detallelicenciaForm.get('tipo_detalle')?.value
    );

    this.detallelicenciaService.postDetalleLicencia(formData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire(
          'Registrado!',
          'Se registro el detalle licencia con exito',
          'success'
        );
        this.mostrarDetallelicencia();
        this.cancelar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarDetallelicencia() {
    const formData = new FormData();
    formData.append(
      'nombre',
      this.detallelicenciaEditarForm.get('nombre')?.value
    );
    formData.append(
      'id_tipo_licencia',
      this.detallelicenciaEditarForm.get('tipo_detalle')?.value
    );
    this.detallelicenciaService
      .putDetalleLicencia(formData, this.ids!)
      .subscribe(
        (data) => {
          Swal.fire(
            'Editado!',
            'Se edito el detalle licencia con exito',
            'success'
          );
          this.mostrarDetallelicencia();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  eliminarDetallelicencia(id: number, estado: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text:
        estado === 1
          ? 'El detalle licencia sera habilitado'
          : 'El detalle licencia sera deshabilitado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.detallelicenciaService.deleteDetalleLicencia(id, estado).subscribe(
          (data) => {
            this.mostrarDetallelicencia();
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

  obtenerDetallelicId(id: number) {
    this.detallelicenciaService.getDetalleLicenciaId(id).subscribe(
      (data) => {
        this.detallelicenciaEditarForm.setValue({
          nombre: data.resp.nombre,
          tipo_detalle: data.resp.id_tipo_detalle,
        });
        this.ids = data.resp.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  mostrarDetallelictipo(event: any) {
    console.log(event?.target.value);
    this.estado = event.target.value;
    this.mostrarDetallelicencia();
  }

  cancelar() {
    this.detallelicenciaForm.setValue({
      nombre: '',
      tipo_detalle: '',
    });
    this.detallelicenciaEditarForm.setValue({
      nombre: '',
      tipo_detalle: '',
    });
  }
}
