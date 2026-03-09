import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipodocumentoService } from 'src/app/servicios/tipodocumento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipodocumento',
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.css'],
})
export class TipodocumentoComponent implements OnInit {
  listTipodocumento?: Array<any>;
  tipodocumentoform: FormGroup;
  tipodocumentoEditarform: FormGroup;
  ids?: string | number;
  estado: string = '1';
  carga: boolean = false;

  constructor(
    private tipodocumentoService: TipodocumentoService,
    private fb: FormBuilder
  ) {
    this.tipodocumentoform = this.fb.group({
      descripcion: ['', Validators.required],
    });
    this.tipodocumentoEditarform = this.fb.group({
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrartipodocumento();
  }

  mostrartipodocumento() {
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
    this.tipodocumentoService.getTipodocumento(this.estado).subscribe(
      (data) => {
        this.listTipodocumento = data.resp;
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

  registrarTipodocumento() {
    const formData = new FormData();
    formData.append(
      'descripcion',
      this.tipodocumentoform.get('descripcion')?.value
    );

    this.tipodocumentoService.postTipodocumento(formData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire(
          'Registrado!',
          'Se registro el tipo licencia con exito',
          'success'
        );
        this.mostrartipodocumento();
        this.cancelar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarTipodocumento() {
    const formData = new FormData();

    formData.append(
      'descripcion',
      this.tipodocumentoEditarform.get('descripcion')?.value
    );

    this.tipodocumentoService.putTipodocumento(formData, this.ids!).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Editado!', 'Se edito el tipo licencia con exito', 'success');
        this.mostrartipodocumento();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarTipodocumento(id: number, estado: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text:
        estado === 1
          ? 'El tipo de documento sera habilitado'
          : 'El tipo de documento sera deshabilitado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tipodocumentoService.deleteTipodocumento(id, estado).subscribe(
          (data) => {
            this.mostrartipodocumento();
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

  mostrarTipodocTipo(event: any) {
    console.log(event.target.value);
    this.estado = event.target.value;
    this.mostrartipodocumento();
  }

  obtenerTipodocumentoId(id: number) {
    this.tipodocumentoService.getTipodocumentoId(id).subscribe(
      (data) => {
        this.tipodocumentoEditarform.setValue({
          descripcion: data.resp.descripcion,
        });
        this.ids = data.resp.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.tipodocumentoform.setValue({
      descripcion: '',
    });
    this.tipodocumentoEditarform.setValue({
      descripcion: '',
    });
  }
}
