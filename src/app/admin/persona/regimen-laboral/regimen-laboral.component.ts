import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PersonalService } from '../../../servicios/personal.service';
import { RegimenService } from '../../../servicios/regimen.service';
import { CondicionService } from '../../../servicios/condicion.service';
import { TipoPersonalService } from '../../../servicios/tipo-personal.service';
import { RegimenLaboralService } from '../../../servicios/regimen-laboral.service';

@Component({
  selector: 'app-regimen-laboral',
  templateUrl: './regimen-laboral.component.html',
  styleUrls: ['./regimen-laboral.component.css'],
})
export class RegimenLaboralComponent implements OnInit {
  listRegimen?: Array<any>;
  listCondicion?: Array<any>;
  listTipoPersonal?: Array<any>;
  listPersonal?: Array<any>;
  listRegimenLaboral?: Array<any>;
  estado: string = '1';
  buscar: string = '';
  regimenLaborarForm: FormGroup;
  regimenLaborarEditarForm: FormGroup;
  idRegimenLaboral: string = '';
  carga: boolean = false;
  constructor(
    private personalService: PersonalService,
    private regimenService: RegimenService,
    private condicionService: CondicionService,
    private tipoPersonalService: TipoPersonalService,
    private regimenLaboralService: RegimenLaboralService,
    private fb: FormBuilder
  ) {
    this.regimenLaborarForm = this.fb.group({
      id_regimen: [0, Validators.required],
      id_condicion: ['', Validators.required],
      id_tipo_personal: ['', Validators.required],
      id_personal: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: [''],
    });
    this.regimenLaborarEditarForm = this.fb.group({
      id_regimen: [0, Validators.required],
      id_condicion: ['', Validators.required],
      id_tipo_personal: ['', Validators.required],
      id_personal: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: [''],
    });
  }

  ngOnInit(): void {
    this.mostrarRegimenLaboral();
    this.mostrarPersonal();
    this.mostrarTipoPersonal();
    this.mostrarRegimen();
    //this.mostrarCondicion();
  }

  mostrarRegimenLaboral() {
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
    this.regimenLaboralService
      .getRegimenlaboral(this.estado, this.buscar)
      .subscribe(
        (data) => {
          this.listRegimenLaboral = data.resp;
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

  mostrarRegimenLaboralTipo(event: any) {
    console.log(event.target.value);
    this.estado = event.target.value;
    this.buscar = '';
    this.mostrarRegimenLaboral();
  }

  buscador(event: any) {
    if (event !== '') {
      this.buscar = event;
      this.regimenLaboralService
        .getRegimenlaboral(this.estado, this.buscar)
        .subscribe(
          (data) => {
            this.listRegimenLaboral = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.buscar = event;
      this.mostrarRegimenLaboral();
    }
  }

  mostrarPersonal() {
    this.personalService.getPersonal().subscribe(
      (data) => {
        this.listPersonal = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  mostrarTipoPersonal() {
    this.tipoPersonalService.getTipoPersonal('1').subscribe(
      (data) => {
        this.listTipoPersonal = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  mostrarRegimen() {
    this.regimenService.getRegimen().subscribe(
      (data) => {
        this.listRegimen = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  mostrarCondicion(event: any) {
    const id = event.target.value;
    this.condicionService.getCondicion(id).subscribe(
      (data) => {
        this.listCondicion = data.resp;
        console.log(data);

      },
      (error) => {
        console.log(error);
      }
    );
  }

  mostrarCondicionDos(id: string) {
    this.condicionService.getCondicion(id).subscribe(
      (data) => {
        this.listCondicion = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerDatosId(id: number) {
    this.regimenLaboralService.getRegimenLaboralId(id).subscribe(
      (data) => {
        this.regimenLaborarEditarForm.setValue({
          id_regimen: `${data.resp.Condicion.id_regimen}`,
          id_condicion: `${data.resp.id_condicion}`,
          id_tipo_personal: `${data.resp.id_tipo_personal}`,
          id_personal: `${data.resp.id_personal}`,
          inicio: data.resp.inicio,
          fin: data.resp.fin === '2030-12-30' ? '' : data.resp.fin,
        });
        this.idRegimenLaboral = `${data.resp.id}`;
        this.mostrarCondicionDos(`${data.resp.Condicion.id_regimen}`);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  agregarRegimenLaboral() {
    const body = new FormData();
    body.append(
      'id_condicion',
      this.regimenLaborarForm.get('id_condicion')?.value
    );
    body.append(
      'id_personal',
      this.regimenLaborarForm.get('id_personal')?.value
    );
    body.append(
      'id_tipo_personal',
      this.regimenLaborarForm.get('id_tipo_personal')?.value
    );
    body.append('inicio', this.regimenLaborarForm.get('inicio')?.value);
    body.append('fin', this.regimenLaborarForm.get('fin')?.value);
    this.regimenLaboralService.postRegimenlaboral(body).subscribe(
      (data) => {
        Swal.fire('Registrado!', data.msg, 'success');
        this.mostrarRegimenLaboral();
        this.cancelar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarRegimenLaboral() {
    const body = new FormData();
    body.append(
      'id_condicion',
      this.regimenLaborarEditarForm.get('id_condicion')?.value
    );
    body.append(
      'id_personal',
      this.regimenLaborarEditarForm.get('id_personal')?.value
    );
    body.append(
      'id_tipo_personal',
      this.regimenLaborarEditarForm.get('id_tipo_personal')?.value
    );
    body.append('inicio', this.regimenLaborarEditarForm.get('inicio')?.value);
    body.append('fin', this.regimenLaborarEditarForm.get('fin')?.value);

    this.regimenLaboralService
      .putRegimenlaboral(body, this.idRegimenLaboral)
      .subscribe(
        (data) => {
          Swal.fire('Editado!', data.msg, 'success');
          this.mostrarRegimenLaboral();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  cancelar() {
    this.idRegimenLaboral = '';
    this.regimenLaborarForm.setValue({
      id_regimen: 0,
      id_condicion: '',
      id_tipo_personal: '',
      id_personal: '',
      inicio: '',
      fin: '',
    });
    this.regimenLaborarEditarForm.setValue({
      id_regimen: 0,
      id_condicion: '',
      id_tipo_personal: '',
      id_personal: '',
      inicio: '',
      fin: '',
    });
  }
}
