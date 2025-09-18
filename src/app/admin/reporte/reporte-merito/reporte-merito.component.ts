import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { EstadoService } from '../../../servicios/estado.service';
import { SancionService } from '../../../servicios/sancion.service';
import { MeritoService } from '../../../servicios/merito.service';
import { OrganoService } from '../../../servicios/organo.service';
import { DependenciaService } from '../../../servicios/dependencia.service';
import { AreaService } from '../../../servicios/area.service';
import { ReporteService } from '../../../servicios/reporte.service';
import { pathUrl } from 'src/app/api/api';

@Component({
  selector: 'app-reporte-merito',
  templateUrl: './reporte-merito.component.html',
  styleUrls: ['./reporte-merito.component.css'],
})
export class ReporteMeritoComponent implements OnInit {
  idpersonal?: string | number;
  personal = '';
  listEstado?: Array<any>;
  listSancion?: Array<any>;
  listMerito?: Array<any>;
  listInstancia?: Array<any>;
  meritoForm: FormGroup;
  meritoEditarForm: FormGroup;
  loadMerito: string = '';
  loadDocumentoMerito: string = '';
  idDocumentoMerito: string = '';
  carga: boolean = true;

  @ViewChild('fileMerito', { static: false }) fileMerito?: ElementRef;
  @ViewChild('fileDocumentoMerito', { static: false })
  fileDocumentoMerito?: ElementRef;
  uploadMerito?: File;
  uploadDocumentoMerito?: File;
  url3 = `${pathUrl}/reporte`;
  url5 = `${pathUrl}/uploadgeneral/merito`;
  constructor(
    private rutaActiva: ActivatedRoute,
    private estadoService: EstadoService,
    private sancionService: SancionService,
    private meritoService: MeritoService,
    private organoService: OrganoService,
    private unidadService: DependenciaService,
    private areaService: AreaService,
    private reporteService: ReporteService,
    private fb: FormBuilder
  ) {
    this.meritoForm = this.fb.group({
      tipodocumento: ['', Validators.required],
      tipoinstancia: ['', Validators.required],
      id_instancia: ['', Validators.required],
      id_sancion: ['', Validators.required],
      id_estado: ['', Validators.required],
      fecha: ['', Validators.required],
      cod_documento: ['', Validators.required],
      observacion: [''],
    });
    this.meritoEditarForm = this.fb.group({
      tipodocumento: ['', Validators.required],
      tipoinstancia: ['', Validators.required],
      id_instancia: ['', Validators.required],
      id_sancion: ['', Validators.required],
      id_estado: ['', Validators.required],
      fecha: ['', Validators.required],
      cod_documento: ['', Validators.required],
      observacion: [''],
    });
  }

  ngOnInit(): void {
    this.idpersonal = this.rutaActiva.snapshot.params.id;
    this.personal = this.rutaActiva.snapshot.params.personal;
    this.mostrarTablas();
    this.mostrarEstado();
    this.mostrarSancion();
  }

  mostrarTablas() {
    if (this.carga) {
      Swal.fire({
        title: 'Generando reporte!',
        html: 'Por favor espere',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    this.meritoService.getMeritoPersonal(`${this.idpersonal}`).subscribe(
      (data) => {
        this.listMerito = data.resp;
        console.log(this.listMerito);
        this.carga = this.carga?false:true;
        if (!this.carga) {
          Swal.close();
        }
        this.carga=true;
      },
      (error) => {
        this.carga = false;
        if (!this.carga) {
          Swal.close();
        }
        this.carga=true;
        console.log(error);
      }
    );
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
      });
    }
    this.reporteService.postReporteMeritoId(`${this.idpersonal}`).subscribe(
      (data) => {
        const urlreport = `${this.url3}/merito/${data.nombre}`;
        window.open(urlreport, '_blank');
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


  registrarMerito() {
    const formData = new FormData();
    formData.append(
      'tipo_documento',
      this.meritoForm.get('tipodocumento')?.value
    );
    formData.append(
      'tipo_instancia',
      this.meritoForm.get('tipoinstancia')?.value
    );
    formData.append('id_instancia', this.meritoForm.get('id_instancia')?.value);
    formData.append('id_sancion', this.meritoForm.get('id_sancion')?.value);
    formData.append('id_estado', this.meritoForm.get('id_estado')?.value);
    formData.append('fecha', this.meritoForm.get('fecha')?.value);
    formData.append(
      'cod_documento',
      this.meritoForm.get('cod_documento')?.value
    );
    formData.append('observacion', this.meritoForm.get('observacion')?.value);
    formData.append('id_personal', `${this.idpersonal}`);
    formData.append('personal', this.personal);
    if (this.loadMerito === '') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Seleccione el documento que autoriza',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      formData.append('archivo', this.fileMerito?.nativeElement.files[0]);
      this.meritoService.postMerito(formData).subscribe(
        (data) => {
          Swal.fire('Registrado!', data.msg, 'success');
          this.carga=false;
          this.cancelarcuatro();
          this.reset();
          this.mostrarTablas();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  EditarMerito() {
    const formData = new FormData();
    formData.append(
      'tipo_documento',
      this.meritoEditarForm.get('tipodocumento')?.value
    );
    formData.append(
      'tipo_instancia',
      this.meritoEditarForm.get('tipoinstancia')?.value
    );
    formData.append(
      'id_instancia',
      this.meritoEditarForm.get('id_instancia')?.value
    );
    formData.append(
      'id_sancion',
      this.meritoEditarForm.get('id_sancion')?.value
    );
    formData.append('id_estado', this.meritoEditarForm.get('id_estado')?.value);
    formData.append('fecha', this.meritoEditarForm.get('fecha')?.value);
    formData.append(
      'cod_documento',
      this.meritoEditarForm.get('cod_documento')?.value
    );
    formData.append(
      'observacion',
      this.meritoEditarForm.get('observacion')?.value
    );
    formData.append('personal', this.personal);

    this.meritoService.putMerito(formData, `${this.idpersonal}`).subscribe(
      (data) => {
        Swal.fire('Editado!', data.msg, 'success');
        this.carga=false;
        this.mostrarTablas();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  editarDocumentoMerito() {
    if (this.loadDocumentoMerito === '') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Falta seleccionar el documento actualizar',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const formData = new FormData();
      formData.append(
        'archivo',
        this.fileDocumentoMerito?.nativeElement.files[0]
      );
      formData.append('personal', this.personal);
      this.meritoService
        .putDocumentoMerito(formData, this.idDocumentoMerito)
        .subscribe(
          (data) => {
            Swal.fire('Actualizado!', data.msg, 'success');
            this.carga=false;
            this.mostrarTablas();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  eliminarMerito(id: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Este registro sera eliminado de la base de datos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.meritoService.deleteMerito(id, this.personal).subscribe(
          (data) => {
            Swal.fire(
              'Eliminado!',
              'Registro eliminado de la base de datos.',
              'success'
            );
            this.mostrarTablas();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  obtenerMeritoId(id: number) {
    this.meritoService.getMeritoId(id).subscribe(
      (data) => {
        this.buscarSiglaMeritoDos(`${data.resp.tipo_instancia}`);
        this.meritoEditarForm.setValue({
          tipodocumento: `${data.resp.tipo_documento}`,
          tipoinstancia: `${data.resp.tipo_instancia}`,
          id_instancia: `${data.resp.id_instancia}`,
          id_sancion: `${data.resp.id_sancion}`,
          id_estado: `${data.resp.id_estado}`,
          fecha: data.resp.fecha,
          cod_documento: data.cod_documento,
          observacion: data.resp.observacion,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  obtenerIdDocumentoMerito(id: number) {
    this.idDocumentoMerito = `${id}`;
  }
  mostrarEstado() {
    this.estadoService.getEstados().subscribe(
      (data) => {
        console.log(data);
        this.listEstado = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mostrarSancion() {
    this.sancionService.getSancion().subscribe(
      (data) => {
        console.log(data);
        this.listSancion = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarSiglaMerito(event: any) {
    switch (event.target.value) {
      case '1':
        this.organoService.getOrgano().subscribe(
          (data) => {
            console.log(data);
            this.listInstancia = data.resp;
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
            this.listInstancia = data.resp;
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
            this.listInstancia = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      default:
        this.listInstancia = [];
        return;
    }
  }
  buscarSiglaMeritoDos(id: string) {
    switch (id) {
      case '1':
        this.organoService.getOrgano().subscribe(
          (data) => {
            console.log(data);
            this.listInstancia = data.resp;
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
            this.listInstancia = data.resp;
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
            this.listInstancia = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
        return;
      default:
        this.listInstancia = [];
        return;
    }
  }
  capturarFileMerito(event: any) {
    this.uploadMerito = event.target.files[0];

    if (this.uploadMerito!.size > 2500000) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El tamaño maximo es de 20MB',
        showConfirmButton: false,
        timer: 1500,
      });
      this.reset();
      this.loadMerito = '';
    } else {
      this.loadMerito = 'cargado';
    }
  }
  capturarDocumentoMerito(event: any) {
    this.uploadDocumentoMerito = event.target.files[0];

    if (this.uploadDocumentoMerito!.size > 2500000) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El tamaño maximo es de 20MB',
        showConfirmButton: false,
        timer: 1500,
      });
      this.reset();
      this.loadDocumentoMerito = '';
    } else {
      this.loadDocumentoMerito = 'cargado';
    }
  }
  /* Funciones Secundarias */
  reset() {
    this.fileMerito!.nativeElement.value = '';
    this.fileDocumentoMerito!.nativeElement.value = '';
  }

  extraserBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        /* const unsafeImg = window.URL.createObjectURL($event);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg); */
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            base: null,
          });
        };
      } catch (e) {
        reject(e);
      }
    });
  cancelarcuatro() {
    this.meritoForm.setValue({
      tipodocumento: '',
      tipoinstancia: '',
      id_instancia: '',
      id_sancion: '',
      id_estado: '',
      fecha: '',
      cod_documento: '',
      observacion: '',
    });
    this.meritoEditarForm.setValue({
      tipodocumento: '',
      tipoinstancia: '',
      id_instancia: '',
      id_sancion: '',
      id_estado: '',
      fecha: '',
      cod_documento: '',
      observacion: '',
    });
    this.loadMerito = '';
    this.reset();
  }
}
