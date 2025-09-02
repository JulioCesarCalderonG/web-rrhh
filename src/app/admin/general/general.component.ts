import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.prod';
import { GeneralService } from '../../servicios/general.service';
import { TipodocumentoService } from '../../servicios/tipodocumento.service';
import { CargoService } from '../../servicios/cargo.service';
import { DependenciaService } from '../../servicios/dependencia.service';
import { OrganoService } from '../../servicios/organo.service';
import { AreaService } from '../../servicios/area.service';
import { PersonalService } from '../../servicios/personal.service';
import { ReporteService } from '../../servicios/reporte.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
})
export class GeneralComponent implements OnInit {
  listGeneral?: Array<any>;
  generalForm: FormGroup;
  listTipodocumento?: Array<any>;
  listCargo?: Array<any>;
  listPersonal?: Array<any>;
  listAutoriza?: Array<any>;
  listDependencia?: Array<any>;
  generalEditarForm: FormGroup;
  ids?: string | number;
  tipofiltro: string = '';
  datobuscar: string = '';
  carga: boolean = false;
  p: number = 1;
  
  url = `${environment.backendUrl}/uploadgeneral/recordlaboral`;
  url2 = `${environment.backendUrl}/reporte/recordlaboral`;
  modelReporte = {
    personal: '',
    tiporeporte: '',
    tipodependencia: '',
    dependencia: '',
    inicio: '',
    fin: '',
  };

  constructor(
    private generalService: GeneralService,
    private tipodocumentoService: TipodocumentoService,
    private cargoService: CargoService,
    private organoService: OrganoService,
    private unidadService: DependenciaService,
    private areaService: AreaService,
    private personalService: PersonalService,
    private reporteService: ReporteService,
    private fb: FormBuilder
  ) {
    this.generalForm = this.fb.group({
      tipodocumento: ['', Validators.required],
      numero: [''],
      ano: [''],
      tiposigla: ['0'],
      autoriza: ['0'],
      tipodependencia: ['', Validators.required],
      dependencia: ['', Validators.required],
      cargo: ['', Validators.required],
      desde: ['', Validators.required],
      hasta: [''],
      personal: ['', Validators.required],
    });
    this.generalEditarForm = this.fb.group({
      tipodocumento: ['', Validators.required],
      numero: [''],
      ano: [''],
      tiposigla: ['0'],
      autoriza: ['0'],
      tipodependencia: ['', Validators.required],
      dependencia: ['', Validators.required],
      cargo: ['', Validators.required],
      desde: ['', Validators.required],
      hasta: [''],
      personal: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarGeneral();
    this.mostrartipodocumento();
    this.mostrarCargos();
    this.mostrarPersonal();
  }

  mostrarGeneral() {
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
    this.generalService.getGeneral(this.tipofiltro, this.datobuscar).subscribe(
      (data) => {
        this.listGeneral = data.resp;
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

  mostrartipodocumento() {
    this.tipodocumentoService.getTipodocumento().subscribe(
      (data) => {
        this.listTipodocumento = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mostrarCargos() {
    this.cargoService.getCargos().subscribe(
      (data) => {
        this.listCargo = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mostrarPersonal() {
    this.carga = true;
    if (this.carga) {
      Swal.fire({
        title: 'Cargando datos!',
        html: 'Por favor espere',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      })
    }
    this.personalService.getPersonal().subscribe(
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

  buscarSigla(event: any) {
    switch (event.target.value) {
      case '1':
        this.organoService.getOrgano().subscribe(
          (data) => {
            console.log(data);
            this.listAutoriza = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      case '2':
        this.unidadService.getUnidad().subscribe(
          (data) => {
            console.log(data);
            this.listAutoriza = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      case '3':
        this.areaService.getAreas().subscribe(
          (data) => {
            console.log(data);
            this.listAutoriza = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      default:
        this.listAutoriza = [];
        return;
    }
  }
  buscarDependencia(event: any) {
    switch (event.target.value) {
      case '1':
        this.organoService.getOrgano().subscribe(
          (data) => {
            console.log(data);
            this.listDependencia = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      case '2':
        this.unidadService.getUnidad().subscribe(
          (data) => {
            console.log(data);
            this.listDependencia = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      case '3':
        this.areaService.getAreas().subscribe(
          (data) => {
            console.log(data);
            this.listDependencia = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      default:
        this.listDependencia = [];
        return;
    }
  }

  editarGeneral() {
    const formData = new FormData();

    formData.append(
      'tipo_documento',
      this.generalEditarForm.get('tipodocumento')?.value
    );
    formData.append('numero', this.generalEditarForm.get('numero')?.value);
    formData.append('ano', this.generalEditarForm.get('ano')?.value);
    formData.append(
      'tipo_sigla',
      this.generalEditarForm.get('tiposigla')?.value
    );
    formData.append('autoriza', this.generalEditarForm.get('autoriza')?.value);
    formData.append(
      'tipo_dependencia',
      this.generalEditarForm.get('tipodependencia')?.value
    );
    formData.append(
      'dependencia',
      this.generalEditarForm.get('dependencia')?.value
    );
    formData.append('id_cargo', this.generalEditarForm.get('cargo')?.value);
    formData.append('desde', this.generalEditarForm.get('desde')?.value);
    formData.append('hasta', this.generalEditarForm.get('hasta')?.value);
    formData.append(
      'id_personal',
      this.generalEditarForm.get('personal')?.value
    );

    this.generalService.putGeneral(formData, this.ids!).subscribe(
      (data) => {
        console.log(data);
        this.mostrarGeneral();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerGeneralId(id: number) {
    this.generalService.getGeneralId(id).subscribe(
      (data) => {
        this.generalEditarForm.setValue({
          tipodocumento: data.resp.tipodocumento,
          numero: data.resp.numero,
          ano: data.resp.ano,
          tiposigla: data.resp.tiposigla,
          autoriza: data.resp.autoriza,
          tipodependencia: data.resp.tipodependencia,
          dependencia: data.resp.dependencia,
          cargo: data.resp.cargo,
          desde: data.resp.desde,
          hasta: data.resp.hasta,
          personal: data.resp.personal,
        });
        this.ids = data.resp.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  filtrar() {
    if (this.tipofiltro !== '' && this.datobuscar !== '') {
      console.log(this.tipofiltro, this.datobuscar);
      this.mostrarGeneral();
    }
    if (this.tipofiltro === '0') {
      this.tipofiltro = '';
      this.datobuscar = '';
      this.mostrarGeneral();
    }
  }
  tipoFiltro(event: any) {
    this.tipofiltro = event.target.value;
    console.log(this.tipofiltro);
  }
  funcionReporte(event: any) {
    const valor = event.target.value;
    this.modelReporte.tiporeporte = valor;
    if (valor !== '' && valor === '1') {
      document.getElementById('seleTwo')?.classList.add('invi');
      document.getElementById('seleOne')?.classList.remove('invi');
    }
    if (valor !== '' && valor === '2') {
      document.getElementById('seleTwo')?.classList.remove('invi');
      document.getElementById('seleOne')?.classList.add('invi');
    }
    if (valor === '') {
      document.getElementById('seleTwo')?.classList.add('invi');
      document.getElementById('seleOne')?.classList.add('invi');
    }
  }


  generarReporte() {
    this.carga = true;
    if (this.carga) {
      Swal.fire({
        title: 'Generando reporte!',
        html: 'Por favor espere',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      })
    }
    if (this.modelReporte.tiporeporte === '1') {
      console.log(this.modelReporte);

      if (
        this.modelReporte.tipodependencia === '' ||
        this.modelReporte.dependencia === '' ||
        this.modelReporte.inicio === ''
      ) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'warning',
          title: 'Completa los datos',
        });
      } else {
        const formData = new FormData();
        formData.append('tipofiltro', this.modelReporte.tiporeporte);
        formData.append('tipodependencia', this.modelReporte.tipodependencia);
        formData.append('dependencia', this.modelReporte.dependencia);
        formData.append('fechainicio', this.modelReporte.inicio);
        formData.append('fechafin', this.modelReporte.fin);
        formData.append('personal', '');

        this.reporteService.postReporteRecord(formData).subscribe((data) => {
          console.log(data);

          const urlreport = `${this.url2}/${data.nombre}`;
          window.open(urlreport, '_blank');
          this.carga= false;
          if (!this.carga) {
            Swal.close();
          }
        },
        (error)=>{
          this.carga = false;
          if (!this.carga) {
            Swal.close();
          }
          console.log(error);
        }
        );
      }
    } else if (this.modelReporte.tiporeporte === '2') {
      if (this.modelReporte.personal === '') {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'warning',
          title: 'Completa los datos',
        });
      } else {
        const formData = new FormData();
        formData.append('tipofiltro', '');
        formData.append('tipodependencia', '');
        formData.append('dependencia', '');
        formData.append('fechainicio', '');
        formData.append('fechafin', '');
        formData.append('personal', this.modelReporte.personal);
        this.reporteService.postReporteRecord(formData).subscribe((data) => {
          const urlreport = `${this.url2}/${data.nombre}`;
          window.open(urlreport, '_blank');
        });
      }
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'warning',
        title: 'Selecciona el tipo de reporte',
      });
    }
  }
  cancelar() {
    this.generalForm.setValue({
      tipodocumento: '',
      numero: '',
      ano: '',
      tiposigla: '',
      autoriza: '',
      tipodependencia: '',
      dependencia: '',
      cargo: '',
      desde: '',
      hasta: '',
      personal: '',
    });
    this.generalEditarForm.setValue({
      tipodocumento: '',
      numero: '',
      ano: '',
      tiposigla: '',
      autoriza: '',
      tipodependencia: '',
      dependencia: '',
      cargo: '',
      desde: '',
      hasta: '',
      personal: '',
    });
  }
}
