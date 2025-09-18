import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonalService } from '../../../servicios/personal.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent implements OnInit {
  listPersonal?: Array<any>;
  personalForm: FormGroup;
  personalEditarForm: FormGroup;
  ids?: string | number;
  estado: string = '1';
  inputBuscar: string = '';
  carga: boolean = false;
  p: number = 1;

  constructor(
    private personalService: PersonalService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.personalForm = this.fb.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      escalafon: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
    });
    this.personalEditarForm = this.fb.group({
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      escalafon: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
    });
  }

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
  mostrarPersonal2() {
    this.personalService.getPersonal(this.estado, this.inputBuscar).subscribe(
      (data) => {
        this.listPersonal = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registrarPersonal() {
    let cargando = true;
    if (cargando === true) {
      document.getElementById('registrar')?.classList.add('registrar');
    }
    const formData = new FormData();
    formData.append('dni', this.personalForm.get('dni')?.value);
    formData.append('nombre', this.personalForm.get('nombre')?.value);
    formData.append('apellido', this.personalForm.get('apellido')?.value);
    formData.append('escalafon', this.personalForm.get('escalafon')?.value);
    formData.append(
      'fechainicio',
      this.personalForm.get('fecha_inicio')?.value
    );

    this.personalService.postPersonal(formData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire(
          'Registrado!',
          'Se registro el personal con exito',
          'success'
        );

        this.mostrarPersonal2();
        this.cancelar();
        cargando = false;
          if (cargando === false) {
            setTimeout(() => {
              document
                .getElementById('registrar')
                ?.classList.remove('registrar');
            }, 1500);
          }
      },
      (error) => {
        console.log(error);
        cargando = false;
        Swal.fire({
          position:"top-end",
          icon: "warning",
          title: error.error.errors[0].msg,
          showConfirmButton: false,
          timer: 1500          
        });
          if (cargando === false) {
            setTimeout(() => {
              document
                .getElementById('registrar')
                ?.classList.remove('registrar');
            }, 1500);
          }
      }
    );
  }

  editarPersonal() {
    const formData = new FormData();
    formData.append('dni', this.personalEditarForm.get('dni')?.value);
    formData.append('nombre', this.personalEditarForm.get('nombre')?.value);
    formData.append('apellido', this.personalEditarForm.get('apellido')?.value);
    formData.append(
      'escalafon',
      this.personalEditarForm.get('escalafon')?.value
    );
    formData.append(
      'fechainicio',
      this.personalEditarForm.get('fecha_inicio')?.value
    );

    this.personalService.putPersonal(formData, this.ids!).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Editado!', 'Se edito el personal con exito', 'success');
        this.mostrarPersonal2();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarPersonal(id: number, estado: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text:
        estado === 1
          ? 'El personal sera habilitado'
          : 'El personal sera deshabilitado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.personalService.deletePersonal(id, estado).subscribe(
          (data) => {
            this.mostrarPersonal();
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

  mostrarPersonalTipo(event: any) {
    console.log(event.target.value);
    this.estado = event.target.value;
    this.mostrarPersonal();
  }

  obtenerPersonalId(id: number) {
    this.personalService.getPersonalId(id).subscribe(
      (data) => {
        this.personalEditarForm.setValue({
          dni: data.resp.dni,
          nombre: data.resp.nombre,
          apellido: data.resp.apellido,
          escalafon: data.resp.escalafon,
          fecha_inicio: data.resp.fecha_inicio,
        });
        this.ids = data.resp.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  redireccionarCrear(id: number, nombre: string, apellido: string) {
    this.router.navigateByUrl(
      `admin/reporte-personal/${id}/${nombre} ${apellido}`
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
  cancelar() {
    this.personalForm.setValue({
      dni: '',
      nombre: '',
      apellido: '',
      escalafon: '',
      fecha_inicio: '',
    });
    this.personalEditarForm.setValue({
      dni: '',
      nombre: '',
      apellido: '',
      escalafon: '',
      fecha_inicio: '',
    });
  }
}
