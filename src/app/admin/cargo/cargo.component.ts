import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CargoService } from '../../servicios/cargo.service';
import { TipoPersonalService } from '../../servicios/tipo-personal.service';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css'],
})
export class CargoComponent implements OnInit {
  listCargo?: Array<any>;
  listTipoPersonal?: Array<any>;
  cargoForm: FormGroup;
  cargoEditarForm: FormGroup;
  ids?: string | number;
  estado: string = '1';
  carga: boolean = false;
  p: number = 1;

  constructor(
    private cargoService: CargoService,
    private tipoPersonal: TipoPersonalService,
    private fb: FormBuilder
  ) {
    this.cargoForm = this.fb.group({
      descripcion: ['', Validators.required],
      tipo_personal: ['', Validators.required],
    });
    this.cargoEditarForm = this.fb.group({
      descripcion: ['', Validators.required],
      tipo_personal: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarCargos();
    this.mostrarTipoPersonal();
  }

  mostrarCargos() {
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
    this.cargoService.getCargos(this.estado).subscribe(
      (data) => {
        this.listCargo = data.resp;
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

  mostrarTipoPersonal() {
    this.tipoPersonal.getTipoPersonal('1').subscribe(
      (data) => {
        this.listTipoPersonal = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registrarCargo() {
    const formData = new FormData();
    formData.append('descripcion', this.cargoForm.get('descripcion')?.value);
    formData.append(
      'id_tipo_personal',
      this.cargoForm.get('tipo_personal')?.value
    );

    this.cargoService.postCargos(formData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Registrado!', 'Se registro el cargo con exito', 'success');
        this.mostrarCargos();
        this.cancelar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  modificarCargo() {
    const formData = new FormData();
    formData.append(
      'descripcion',
      this.cargoEditarForm.get('descripcion')?.value
    );
    formData.append(
      'id_tipo_personal',
      this.cargoEditarForm.get('tipo_personal')?.value
    );
    this.cargoService.putCargo(formData, this.ids!).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Editado!', 'Se edito el cargo con exito', 'success');
        this.mostrarCargos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarCargo(id: number, estado: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text:
        estado === 1
          ? 'El cargo sera habilitado'
          : 'El cargo sera deshabilitado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargoService.deleteCargo(id, estado).subscribe(
          (data) => {
            this.mostrarCargos();
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

  mostrarCargoTipo(event: any) {
    console.log(event.target.value);
    this.estado = event.target.value;
    this.mostrarCargos();
  }

  obtenerDatosId(id: number) {
    this.cargoService.getCargoId(id).subscribe(
      (data) => {
        console.log(data);

        this.cargoEditarForm.setValue({
          descripcion: data.resp.descripcion,
          tipo_personal: data.resp.id_tipo_personal,
        });
        this.ids = data.resp.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.cargoForm.setValue({
      descripcion: '',
      tipo_personal: '',
    });
    this.cargoEditarForm.setValue({
      descripcion: '',
      tipo_personal: '',
    });
  }
}
