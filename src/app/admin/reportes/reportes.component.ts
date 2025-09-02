import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.prod';
import { GeneralService } from '../../servicios/general.service';
import { TipodocumentoService } from '../../servicios/tipodocumento.service';
import { TipoPersonalService } from '../../servicios/tipo-personal.service';
import { CargoService } from '../../servicios/cargo.service';
import { OrganoService } from '../../servicios/organo.service';
import { DependenciaService } from '../../servicios/dependencia.service';
import { AreaService } from '../../servicios/area.service';
import { TipoLicenciaService } from '../../servicios/tipo-licencia.service';
import { DetalleLicenciaService } from '../../servicios/detalle-licencia.service';
import { LicenciaService } from '../../servicios/licencia.service';
import { VacacionalService } from '../../servicios/vacacional.service';
import { ReporteService } from '../../servicios/reporte.service';
import { EstadoService } from '../../servicios/estado.service';
import { SancionService } from '../../servicios/sancion.service';
import { MeritoService } from '../../servicios/merito.service';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  idpersonal?: string | number;
  personal = '';
  listLicencia?: Array<any>;
  listRecord?: Array<any>;
  listVacacional?: Array<any>;
  listTipodocumento?: Array<any>;
  listCargo?: Array<any>;
  listAutoriza?: Array<any>;
  listInstancia?:Array<any>;
  listDependencia?: Array<any>;
  listTipoPersonal?: Array<any>;
  listTipoLicencia?: Array<any>;
  listDetalleLicencia?: Array<any>;
  listEstado?:Array<any>;
  listSancion?:Array<any>;
  listMerito?:Array<any>;
  generalForm: FormGroup;
  licenciaForm: FormGroup;
  vacacionalForm: FormGroup;
  recordEditarForm: FormGroup;
  licenciaEditarForm:FormGroup;
  vacacionalEditarForm: FormGroup;
  meritoForm:FormGroup;
  meritoEditarForm:FormGroup;
  loadImage: string = '';
  loadLicencia: string = '';
  loadVacacional: string = '';
  loadDocumentoVacacional:string='';
  loadDocumentoImage: string='';
  loadDocumentoLicencia:string='';
  loadMerito:string='';
  loadDocumentoMerito:string='';
  opcionFiltro: string = '';
  idrecord: string = '';
  idLicencia:string='';
  idVacacional:string='';
  idDocumentoVacacional:string='';
  idDocumentoLaboral:string='';
  idDocumentoLicencia:string='';
  idDocumentoMerito:string='';
  @ViewChild('fileInput', { static: false }) fileInput?: ElementRef;
  @ViewChild('fileLicencia', { static: false }) fileLicencia?: ElementRef;
  @ViewChild('fileVacacional', { static: false }) fileVacacional?: ElementRef;
  @ViewChild('fileDocumentoVacacional', { static: false }) fileDocumentoVacacional?: ElementRef;
  @ViewChild('fileDocumentoLaboral', { static: false }) fileDocumentoLaboral?: ElementRef;
  @ViewChild('fileDocumentoLicencia', { static: false }) fileDocumentoLicencia?: ElementRef;
  @ViewChild('fileMerito', { static: false }) fileMerito?: ElementRef;
  @ViewChild('fileDocumentoMerito', { static: false }) fileDocumentoMerito?: ElementRef;
  url = `${environment.backendUrl}/uploadgeneral/recordlaboral`;
  url2 = `${environment.backendUrl}/uploadgeneral/licencia`;
  url4 = `${environment.backendUrl}/uploadgeneral/vacacional`;
  url5 = `${environment.backendUrl}/uploadgeneral/merito`;
  url3 = `${environment.backendUrl}/reporte`;
  uploadFiles?: File;
  uploadLicencia?: File;
  uploadVacacional?: File;
  uploadDocumentoVacacional?: File;
  uploadDocumentoLaboral?: File;
  uploadDocumentoLicencia?: File;
  uploadMerito?:File;
  uploadDocumentoMerito?:File;
  constructor(
    private rutaActiva: ActivatedRoute,
    private generalService: GeneralService,
    private tipodocumentoService: TipodocumentoService,
    private tipoPersonalServicie: TipoPersonalService,
    private cargoService: CargoService,
    private organoService: OrganoService,
    private unidadService: DependenciaService,
    private areaService: AreaService,
    private tipoLicenciaService: TipoLicenciaService,
    private detalleLicenciaService: DetalleLicenciaService,
    private licenciaService: LicenciaService,
    private vacacionalService: VacacionalService,
    private reporteService: ReporteService,
    private estadoService:EstadoService,
    private sancionService:SancionService,
    private meritoService:MeritoService,
    private fb: FormBuilder
  ) {
    this.generalForm = this.fb.group({
      periodo: ['', Validators.required],
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
    });
    this.licenciaForm = this.fb.group({
      tipodocumento: ['', Validators.required],
      areauno: [''],
      areados: [''],
      numero: [Number, Validators.required],
      ano: [Number, Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      detallelicencia: ['', Validators.required],
    });
    this.vacacionalForm = this.fb.group({
      tipodocumento: ['', Validators.required],
      areauno: [''],
      areados: [''],
      numero: [Number, Validators.required],
      ano: [Number, Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      periodo: ['', Validators.required],
    });
    this.recordEditarForm = this.fb.group({
      periodo: ['', Validators.required],
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
      tipo_personal: [''],
    });
    this.licenciaEditarForm = this.fb.group({
      tipodocumento: ['', Validators.required],
      areauno: [''],
      areados: [''],
      numero: [Number, Validators.required],
      ano: [Number, Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      detallelicencia: ['', Validators.required],
      tipo_licencia:['',Validators.required]
    });
    this.vacacionalEditarForm = this.fb.group({
      tipodocumento: ['', Validators.required],
      areauno: [''],
      areados: [''],
      numero: [Number, Validators.required],
      ano: [Number, Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      periodo: ['', Validators.required],
    });
    this.meritoForm= this.fb.group({
      tipodocumento:['',Validators.required],
      tipoinstancia:['',Validators.required],
      id_instancia:['',Validators.required],
      id_sancion:['',Validators.required],
      id_estado:['',Validators.required],
      fecha:['',Validators.required],
      cod_documento:['',Validators.required],
      observacion:['']
    });
    this.meritoEditarForm= this.fb.group({
      tipodocumento:['',Validators.required],
      tipoinstancia:['',Validators.required],
      id_instancia:['',Validators.required],
      id_sancion:['',Validators.required],
      id_estado:['',Validators.required],
      fecha:['',Validators.required],
      cod_documento:['',Validators.required],
      observacion:['']
    })
  }

  ngOnInit(): void {
    this.idpersonal = this.rutaActiva.snapshot.params.id;
    this.personal = this.rutaActiva.snapshot.params.personal;
    this.mostrartipodocumento();
    this.mostrarTipoPersonal();
    this.mostrarTipoLicencia();
    this.mostrarEstado();
    this.mostrarSancion();
  }

  /* Mostrar Tablas */

  mostrarTablas() {
    if (this.opcionFiltro === '1') {
      document.getElementById('tableRecord')?.classList.remove('invi');
      document.getElementById('tableLicencia')?.classList.add('invi');
      document.getElementById('tableVacacional')?.classList.add('invi');
      document.getElementById('tableMerito')?.classList.add('invi');
      this.generalService.getGeneralPersonal(`${this.idpersonal}`).subscribe(
        (data) => {
          console.log(data);
          this.listRecord = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.opcionFiltro === '2') {
      document.getElementById('tableRecord')?.classList.add('invi');
      document.getElementById('tableLicencia')?.classList.add('invi');
      document.getElementById('tableVacacional')?.classList.remove('invi');
      document.getElementById('tableMerito')?.classList.add('invi');
      this.vacacionalService
        .getVacacionalPersonal(`${this.idpersonal}`)
        .subscribe(
          (data) => {
            console.log(data);
            this.listVacacional = data.resp;
          },
          (error) => {
            console.log(error);
          }
        );
    } else if (this.opcionFiltro === '3') {
      document.getElementById('tableRecord')?.classList.add('invi');
      document.getElementById('tableLicencia')?.classList.remove('invi');
      document.getElementById('tableVacacional')?.classList.add('invi');
      document.getElementById('tableMerito')?.classList.add('invi');
      this.licenciaService.getLicenciaPersonal(`${this.idpersonal}`).subscribe(
        (data) => {
          console.log(data);
          this.listLicencia = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.opcionFiltro === '4') {
      document.getElementById('tableRecord')?.classList.add('invi');
      document.getElementById('tableLicencia')?.classList.add('invi');
      document.getElementById('tableVacacional')?.classList.add('invi');
      document.getElementById('tableMerito')?.classList.remove('invi');
      this.meritoService.getMeritoPersonal(`${this.idpersonal}`).subscribe(
        (data) => {
          this.listMerito = data.resp;
          console.log(this.listMerito);

        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      document.getElementById('tableRecord')?.classList.add('invi');
      document.getElementById('tableLicencia')?.classList.add('invi');
      document.getElementById('tableVacacional')?.classList.add('invi');
      document.getElementById('tableMerito')?.classList.add('invi');
    }
  }

  generarReporte() {
    if (this.opcionFiltro === '1') {
      this.reporteService.postReporteRecordId(`${this.idpersonal}`).subscribe(
        (data) => {
          const urlreport = `${this.url3}/recordlaboral/${data.nombre}`;
          window.open(urlreport, '_blank');
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.opcionFiltro === '2') {
      this.reporteService.postReporteVacacionalId(`${this.idpersonal}`).subscribe(
        (data) => {
          console.log(data);

          const urlreport = `${this.url3}/vacacional/${data.nombre}`;
          window.open(urlreport, '_blank');
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.opcionFiltro === '3') {
      this.reporteService.postReporteLicenciaId(`${this.idpersonal}`).subscribe(
        (data) => {
          const urlreport = `${this.url3}/licencia/${data.nombre}`;
          window.open(urlreport, '_blank');
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (this.opcionFiltro === '4') {
      this.reporteService.postReporteMeritoId(`${this.idpersonal}`).subscribe(
        (data) => {
          const urlreport = `${this.url3}/merito/${data.nombre}`;
          window.open(urlreport, '_blank');
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
    }
  }

  filtrarOpcion(event: any) {
    const valor = event.target.value;
    this.opcionFiltro = valor;
    console.log(valor);
  }

  /* Registro de Record Laboral */
  registrarGeneral() {
    const formData = new FormData();
    formData.append(
      'tipo_documento',
      this.generalForm.get('tipodocumento')?.value
    );
    formData.append('periodo', this.generalForm.get('periodo')?.value);
    formData.append('numero', this.generalForm.get('numero')?.value);
    formData.append('ano', this.generalForm.get('ano')?.value);
    formData.append('tipo_sigla', this.generalForm.get('tiposigla')?.value);
    formData.append('autoriza', this.generalForm.get('autoriza')?.value);
    formData.append(
      'tipo_dependencia',
      this.generalForm.get('tipodependencia')?.value
    );
    formData.append('dependencia', this.generalForm.get('dependencia')?.value);
    formData.append('id_cargo', this.generalForm.get('cargo')?.value);
    formData.append('desde', this.generalForm.get('desde')?.value);
    formData.append('hasta', this.generalForm.get('hasta')?.value);
    formData.append('id_personal', `${this.idpersonal}`);
    if (this.loadImage === '') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Seleccione el documento que autoriza',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      formData.append('archivo', this.fileInput?.nativeElement.files[0]);
      this.generalService.postGeneral(formData).subscribe(
        (data) => {
          Swal.fire('Registrado!', data.msg, 'success');
          this.cancelaruno();
          this.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  actualizarGeneral() {
    const formData = new FormData();
    formData.append(
      'tipo_documento',
      this.recordEditarForm.get('tipodocumento')?.value
    );
    formData.append('periodo', this.recordEditarForm.get('periodo')?.value);
    formData.append('numero', this.recordEditarForm.get('numero')?.value);
    formData.append('ano', this.recordEditarForm.get('ano')?.value);
    formData.append('tipo_sigla', this.recordEditarForm.get('tiposigla')?.value);
    formData.append('autoriza', this.recordEditarForm.get('autoriza')?.value);
    formData.append(
      'tipo_dependencia',
      this.recordEditarForm.get('tipodependencia')?.value
    );
    formData.append('dependencia', this.recordEditarForm.get('dependencia')?.value);
    formData.append('id_cargo', this.recordEditarForm.get('cargo')?.value);
    formData.append('desde', this.recordEditarForm.get('desde')?.value);
    formData.append('hasta', this.recordEditarForm.get('hasta')?.value);
    formData.append('id_personal', `${this.idpersonal}`);

    this.generalService.putGeneral(formData, this.idrecord).subscribe(
      (data) => {
        Swal.fire('Editado!', data.msg, 'success');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarDocumentoLaboral(){
    if (this.loadDocumentoImage==='') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Falta seleccionar el documento actualizar',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
      const formData = new FormData();
      formData.append('archivo', this.fileDocumentoLaboral?.nativeElement.files[0])
      this.generalService.putDocumentoLaboral(formData, this.idDocumentoLaboral).subscribe(
        (data)=>{
          Swal.fire('Registrado!', data.msg, 'success');
        }, (error)=>{
          console.log(error);
        }
      )
    }
  }


  eliminarRecord(id:number){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Este registro sera eliminado de la base de datos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.generalService.deleteGeneral(id).subscribe(
          (data)=>{
            Swal.fire(
              'Eliminar!',
              'Registro eliminado de la base de datos.',
              'success'
            )
          },(error)=>{
            console.log(error);
          }
        )
      }
    })
  }

  obtenerIdDocumentoLaboral(id: number){
    this.idDocumentoLaboral = `${id}`;
  }

  obtenerDatosRecordId(id: number) {
    console.log(id);
    this.idrecord = `${id}`;
    this.generalService.getGeneralId(id).subscribe(
      (data) => {
        console.log(data);
        this.recordEditarForm.setValue({
          periodo: data.resp.periodo,
          tipodocumento: `${data.resp.tipo_documento}`,
          numero: data.resp.numero,
          ano: data.resp.ano,
          tiposigla: `${data.resp.tipo_sigla}`,
          autoriza: `${data.resp.id_area}`,
          tipodependencia: `${data.resp.tipo_dependencia}`,
          dependencia: `${data.resp.id_dependencia}`,
          cargo: `${data.resp.id_cargo}`,
          desde: data.resp.inicio,
          hasta: data.resp.fin === '2030-12-30' ? '' : data.resp.fin,
          tipo_personal: data.resp.Cargo.TipoPersonal.id,
        });
        this.buscarSiglaDos(`${data.resp.tipo_sigla}`);
        this.buscarDependenciaDos(`${data.resp.tipo_dependencia}`);
        this.filtrarTipoPersonalDos(`${data.resp.Cargo.TipoPersonal.id}`);
      },
      (error) => {
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
  mostrarTipoPersonal() {
    this.tipoPersonalServicie.getTipoPersonal('1').subscribe(
      (data) => {
        this.listTipoPersonal = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  mostrarTipoLicencia() {
    this.tipoLicenciaService.getTipoLicencia().subscribe(
      (data) => {
        this.listTipoLicencia = data.resp;
      },
      (error) => {
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
  buscarSiglaDos(id: string) {
    switch (id) {
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
  buscarDependenciaDos(id: string) {
    switch (id) {
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
  filtrarTipoPersonal(event: any) {
    const tipo = event.target.value;
    if (!tipo) {
      this.cargoService.getCargoPersonal(0).subscribe(
        (data) => {
          this.listCargo = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.cargoService.getCargoPersonal(tipo).subscribe(
        (data) => {
          this.listCargo = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  filtrarTipoPersonalDos(id: string) {
    const tipo = id;
    if (!tipo) {
      this.cargoService.getCargoPersonal(0).subscribe(
        (data) => {
          this.listCargo = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.cargoService.getCargoPersonal(tipo).subscribe(
        (data) => {
          this.listCargo = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  capturarFile(event: any) {
    this.uploadFiles = event.target.files[0];

    if (this.uploadFiles!.size > 2500000) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El tamaño maximo es de 20MB',
        showConfirmButton: false,
        timer: 1500,
      });
      this.reset();
      this.loadImage = '';
    } else {
      this.loadImage = 'cargado';
    }
  }

  capturarDocumentoLaboral(event: any) {
    this.uploadFiles = event.target.files[0];
    if (this.uploadFiles!.size > 2500000) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El tamaño maximo es de 20MB',
        showConfirmButton: false,
        timer: 1500,
      });
      this.reset();
      this.loadDocumentoImage = '';
    } else {
      this.loadDocumentoImage = 'cargado';
    }
  }

  /*  Seccion Crear Licencias */
  registrarLicencia() {
    const tipo = this.licenciaForm.get('tipodocumento')?.value;
    const areauno = this.licenciaForm.get('areauno')?.value;
    const areados = this.licenciaForm.get('areados')?.value;
    const formData = new FormData();
    formData.append(
      'tipo_documento',
      this.licenciaForm.get('tipodocumento')?.value
    );
    formData.append('numero', this.licenciaForm.get('numero')?.value);
    formData.append('ano', this.licenciaForm.get('ano')?.value);
    formData.append('id_personal', `${this.idpersonal}`);
    formData.append(
      'id_detalle_licencia',
      this.licenciaForm.get('detallelicencia')?.value
    );
    formData.append('inicio', this.licenciaForm.get('inicio')?.value);
    formData.append('fin', this.licenciaForm.get('fin')?.value);
    if (tipo === '1') {
      if (areauno === '') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Falta seleccionar el area que genera el documento',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      } else {
        formData.append('area', this.licenciaForm.get('areauno')?.value);
      }
    }
    if (tipo === '2') {
      if (areados === '') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Falta seleccionar el area que genera el documento',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      } else {
        formData.append('area', this.licenciaForm.get('areados')?.value);
      }
    }
    if (this.loadLicencia === '') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Seleccione el documento que autoriza',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      formData.append('archivo', this.fileLicencia?.nativeElement.files[0]);
      this.licenciaService.postLicencia(formData).subscribe(
        (data) => {
          Swal.fire('Registrado!', data.msg, 'success');
          this.cancelardos();
          this.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  editarLicencia(){
    const tipo = this.licenciaEditarForm.get('tipodocumento')?.value;
    console.log(tipo);

    const areauno = this.licenciaEditarForm.get('areauno')?.value;
    const areados = this.licenciaEditarForm.get('areados')?.value;
    const formData = new FormData();
    formData.append(
      'tipo_documento',
      this.licenciaEditarForm.get('tipodocumento')?.value
    );
    formData.append('numero', this.licenciaEditarForm.get('numero')?.value);
    formData.append('ano', this.licenciaEditarForm.get('ano')?.value);
    formData.append('id_personal', `${this.idpersonal}`);
    formData.append(
      'id_detalle_licencia',
      this.licenciaEditarForm.get('detallelicencia')?.value
    );
    formData.append('inicio', this.licenciaEditarForm.get('inicio')?.value);
    formData.append('fin', this.licenciaEditarForm.get('fin')?.value);
    if (tipo === '1') {
      if (areauno === '') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Falta seleccionar el area que genera el documento',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      } else {
        formData.append('area', this.licenciaEditarForm.get('areauno')?.value);
        console.log(areauno);

      }
    }
    if (tipo === '2') {
      if (areados === '') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Falta seleccionar el area que genera el documento',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      } else {
        formData.append('area', this.licenciaEditarForm.get('areados')?.value);
        console.log(areados);

      }
    }

      this.licenciaService.putLicencia(formData,this.idLicencia).subscribe(
        (data) => {
          Swal.fire('Registrado!', data.msg, 'success');
          console.log(data);

        },
        (error) => {
          console.log(error);
        }
      );
  }
  editarDocumentoLicencia(){
    if (this.loadDocumentoLicencia==='') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Falta seleccionar el documento a actualizar',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
      const formData = new FormData();
      formData.append('archivo', this.fileDocumentoLicencia?.nativeElement.files[0]);
      this.licenciaService.putDocumentoLicencia(formData, this.idDocumentoLicencia).subscribe(
        (data)=>{
          Swal.fire('Registrado!', data.msg, 'success');
        }, (error)=>{
          console.log(error);

        }
      )
    }
  }
  eliminarLicencia(id:number){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Este registro sera eliminado de la base de datos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.licenciaService.deleteLicencia(id).subscribe(
          (data)=>{
            Swal.fire(
              'Eliminar!',
              'Registro eliminado de la base de datos.',
              'success'
            )
          },(error)=>{
            console.log(error);
          }
        )
      }
    })
  }
  obtenerIdDocumentoLicencia(id:number){
    this.idDocumentoLicencia = `${id}`;
  }
  obtenerLicenciaId(id:number){
    this.idLicencia=`${id}`;
    this.licenciaService.getLicenciaId(id).subscribe(
      (data)=>{
        console.log(data);
        this.licenciaEditarForm.setValue({
          tipodocumento: `${data.resp.tipo_documento}`,
          areauno: (data.resp.tipo_documento===1)?`${data.resp.area}`:'',
          areados: (data.resp.tipo_documento===2)?`${data.resp.area}`:'',
          numero: data.resp.numero,
          ano: data.resp.ano,
          inicio: data.resp.inicio,
          fin: data.resp.fin,
          detallelicencia: `${data.resp.id_detalle_licencia}`,
          tipo_licencia:`${data.resp.DetalleLicencium.TipoLicencium.id}`
        });
        this.mostrarDetalleLicenciaDos(`${data.resp.DetalleLicencium.TipoLicencium.id}`);
        this.mostrarProveidoTres(`${data.resp.tipo_documento}`);

      },(error)=>{
        console.log(error);
      }
    )
  }
  mostrarProveido(event: any) {
    const valor = event.target.value;
    console.log(valor);
    if (valor === '1') {
      document.getElementById('selectLiUno')?.classList.remove('invi');
      document.getElementById('selectLiDos')?.classList.add('invi');
    } else if (valor === '2') {
      document.getElementById('selectLiUno')?.classList.add('invi');
      document.getElementById('selectLiDos')?.classList.remove('invi');
    } else {
      document.getElementById('selectLiDos')?.classList.add('invi');
      document.getElementById('selectLiUno')?.classList.add('invi');
    }
  }
  mostrarProveidoDos(event: any) {
    const valor = event.target.value;
    console.log(valor);
    if (valor === '1') {
      document.getElementById('selectLiUnoProv')?.classList.remove('invi');
      document.getElementById('selectLiDosProv')?.classList.add('invi');
    } else if (valor === '2') {
      document.getElementById('selectLiUnoProv')?.classList.add('invi');
      document.getElementById('selectLiDosProv')?.classList.remove('invi');
    } else {
      document.getElementById('selectLiDosProv')?.classList.add('invi');
      document.getElementById('selectLiUnoProv')?.classList.add('invi');
    }
  }
  mostrarProveidoTres(id: string) {
    const valor = id;
    console.log(valor);
    if (valor === '1') {
      document.getElementById('selectLiUnoProv')?.classList.remove('invi');
      document.getElementById('selectLiDosProv')?.classList.add('invi');
    } else if (valor === '2') {
      document.getElementById('selectLiUnoProv')?.classList.add('invi');
      document.getElementById('selectLiDosProv')?.classList.remove('invi');
    } else {
      document.getElementById('selectLiDosProv')?.classList.add('invi');
      document.getElementById('selectLiUnoProv')?.classList.add('invi');
    }
  }
  mostrarDetalleLicencia(event: any) {
    const valor = event.target.value;
    if (valor !== '') {
      this.detalleLicenciaService.getDetalleTipo(valor).subscribe(
        (data) => {
          this.listDetalleLicencia = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.detalleLicenciaService.getDetalleTipo('0').subscribe(
        (data) => {
          this.listDetalleLicencia = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  mostrarDetalleLicenciaDos(id:string) {
    const valor = id;
    if (valor !== '') {
      this.detalleLicenciaService.getDetalleTipo(valor).subscribe(
        (data) => {
          this.listDetalleLicencia = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.detalleLicenciaService.getDetalleTipo('0').subscribe(
        (data) => {
          this.listDetalleLicencia = data.resp;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  capturarFileLicencia(event: any) {
    this.uploadLicencia = event.target.files[0];

    if (this.uploadLicencia!.size > 2500000) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El tamaño maximo es de 20MB',
        showConfirmButton: false,
        timer: 1500,
      });
      this.reset();
      this.loadLicencia = '';
    } else {
      this.loadLicencia = 'cargado';
    }
  }
  capturarDocumentoLicencia(event: any) {
    this.uploadLicencia = event.target.files[0];
    if (this.uploadLicencia!.size > 2500000) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El tamaño maximo es de 20MB',
        showConfirmButton: false,
        timer: 1500,
      });
      this.reset();
      this.loadDocumentoLicencia = '';
    } else {
      this.loadDocumentoLicencia = 'cargado';
    }
  }

  /* Seccion crear Record Vacacional */

  registrarVacacional() {
    const tipoDoc = this.vacacionalForm.get('tipodocumento')?.value;
    const areauno = this.vacacionalForm.get('areauno')?.value;
    const areados = this.vacacionalForm.get('areados')?.value;
    const formData = new FormData();
    formData.append('tipo_documento', tipoDoc);
    formData.append('inicio', this.vacacionalForm.get('inicio')?.value);
    formData.append('fin', this.vacacionalForm.get('fin')?.value);
    formData.append('periodo', this.vacacionalForm.get('periodo')?.value);
    formData.append('numero', this.vacacionalForm.get('numero')?.value);
    formData.append('ano', this.vacacionalForm.get('ano')?.value);
    formData.append('id_personal', `${this.idpersonal}`);
    if (tipoDoc === '1') {
      if (areauno === '') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Falta seleccionar el area que genera el documento',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      } else {
        formData.append('area', this.vacacionalForm.get('areauno')?.value);
      }
    }
    if (tipoDoc === '2') {
      if (areados === '') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Falta seleccionar el area que genera el documento',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      } else {
        formData.append('area', this.vacacionalForm.get('areados')?.value);
      }
    }
    if (this.loadVacacional === '') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Seleccione el documento que autoriza',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      formData.append('archivo', this.fileVacacional?.nativeElement.files[0]);
      this.vacacionalService.postVacacional(formData).subscribe(
        (data) => {
          Swal.fire('Registrado!', data.msg, 'success');
          this.cancelartres();
          this.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  editarVacacional(){
    const tipoDoc = this.vacacionalEditarForm.get('tipodocumento')?.value;
    const areauno = this.vacacionalEditarForm.get('areauno')?.value;
    const areados = this.vacacionalEditarForm.get('areados')?.value;
    const formData = new FormData();
    formData.append('tipo_documento',this.vacacionalEditarForm.get('tipodocumento')?.value);
    formData.append('inicio', this.vacacionalEditarForm.get('inicio')?.value);
    formData.append('fin', this.vacacionalEditarForm.get('fin')?.value);
    formData.append('periodo', this.vacacionalEditarForm.get('periodo')?.value);
    formData.append('numero', this.vacacionalEditarForm.get('numero')?.value);
    formData.append('ano', this.vacacionalEditarForm.get('ano')?.value);
    formData.append('id_personal', `${this.idpersonal}`);
    if (tipoDoc === '1') {
      if (areauno === '') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Falta seleccionar el area que genera el documento',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      } else {
        formData.append('area', this.vacacionalEditarForm.get('areauno')?.value);
      }
    }
    if (tipoDoc === '2') {
      if (areados === '') {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Falta seleccionar el area que genera el documento',
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      } else {
        formData.append('area', this.vacacionalEditarForm.get('areados')?.value);
      }
    }
      this.vacacionalService.putVacacional(formData,this.idVacacional).subscribe(
        (data) => {
          console.log(data);

          Swal.fire('Editado!', data.msg, 'success');
        },
        (error) => {
          console.log(error);
        }
      );
  }
  editarDocumentoVacacional(){
    if (this.loadDocumentoVacacional==='') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Falta seleccionar el documento actualizar',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
      const formData = new FormData();
      formData.append('archivo',this.fileDocumentoVacacional?.nativeElement.files[0]);
      this.vacacionalService.putDocumentoVacacional(formData,this.idDocumentoVacacional).subscribe(
        (data)=>{
          Swal.fire('Registrado!', data.msg, 'success');
        },
        (error)=>{
          console.log(error);

        }
      )
    }
  }

  eliminarVacacional(id:number){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Este registro sera eliminado de la base de datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText:  'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vacacionalService.deleteVacacional(id).subscribe(
          (data)=>{
            Swal.fire(
              'Eliminar!',
              'Registro eliminado de la base de datos.',
              'success'
            )
          }, (error)=>{
            console.log(error);

          }
        )
      }
    })
  }
  obtenerIdDocumentoVacacional(id:number){
    this.idDocumentoVacacional = `${id}`;
  }
  obtenerVacacionalId(id:number){
    this.idVacacional = `${id}`;
    this.vacacionalService.getVacacionalId(id).subscribe(
      (data)=>{
        console.log(data);
        this.vacacionalEditarForm.setValue({
          tipodocumento: `${data.resp.tipo_documento}`,
          areauno: (data.resp.tipo_documento===1)?`${data.resp.area}`:'',
          areados: (data.resp.tipo_documento===2)?`${data.resp.area}`:'',
          numero: data.resp.numero,
          ano: data.resp.ano,
          inicio: data.resp.termino,
          fin: data.resp.termino,
          periodo: data.resp.periodo,
        });
        this.mostrarTipoDocVacionalTres(`${data.resp.tipodocumento}`);
      }, (error)=>{
        console.log(error);
      }
    )
  }
  mostrarTipoDocVacional(event: any) {
    const valor = event.target.value;
    console.log(valor);
    if (valor === '1') {
      document.getElementById('selectAreaUno')?.classList.remove('invi');
      document.getElementById('selectAreaDos')?.classList.add('invi');
    } else if (valor === '2') {
      document.getElementById('selectAreaUno')?.classList.add('invi');
      document.getElementById('selectAreaDos')?.classList.remove('invi');
    } else {
      document.getElementById('selectAreaUno')?.classList.add('invi');
      document.getElementById('selectAreaDos')?.classList.add('invi');
    }
  }

  mostrarTipoDocVacionalDos(event: any) {
    const valor = event.target.value;
    console.log(valor);
    if (valor === '1') {
      document.getElementById('selectAreaUnoProv')?.classList.remove('invi');
      document.getElementById('selectAreaDosProv')?.classList.add('invi');
    } else if (valor === '2') {
      document.getElementById('selectAreaUnoProv')?.classList.add('invi');
      document.getElementById('selectAreaDosProv')?.classList.remove('invi');
    } else {
      document.getElementById('selectAreaUnoProv')?.classList.add('invi');
      document.getElementById('selectAreaDosPRov')?.classList.add('invi');
    }
  }

  mostrarTipoDocVacionalTres(id: string) {
    const valor = id;
    console.log(valor);
    if (valor === '1') {
      document.getElementById('selectAreaUnoProv')?.classList.remove('invi');
      document.getElementById('selectAreaDosProv')?.classList.add('invi');
    } else if (valor === '2') {
      document.getElementById('selectAreaUnoProv')?.classList.add('invi');
      document.getElementById('selectAreaDosProv')?.classList.remove('invi');
    } else {
      document.getElementById('selectAreaUnoProv')?.classList.add('invi');
      document.getElementById('selectAreaDosPRov')?.classList.add('invi');
    }
  }

  capturarFileVacacional(event: any) {
    this.uploadVacacional = event.target.files[0];

    if (this.uploadVacacional!.size > 2500000) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El tamaño maximo es de 20MB',
        showConfirmButton: false,
        timer: 1500,
      });
      this.reset();
      this.loadVacacional = '';
    } else {
      this.loadVacacional = 'cargado';
    }
  }
  capturarDocumentoVacacional(event: any) {
    this.uploadVacacional = event.target.files[0];
    if (this.uploadVacacional!.size > 2500000) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'El tamaño maximo es de 20MB',
        showConfirmButton: false,
        timer: 1500,
      });
      this.reset();
      this.loadDocumentoVacacional = '';
    } else {
      this.loadDocumentoVacacional = 'cargado';
    }
  }

  /* Seccion Merito */

  registrarMerito(){
    const formData = new FormData();
    formData.append('tipo_documento',this.meritoForm.get('tipodocumento')?.value);
    formData.append('tipo_instancia',this.meritoForm.get('tipoinstancia')?.value);
    formData.append('id_instancia',this.meritoForm.get('id_instancia')?.value);
    formData.append('id_sancion',this.meritoForm.get('id_sancion')?.value);
    formData.append('id_estado',this.meritoForm.get('id_estado')?.value);
    formData.append('fecha',this.meritoForm.get('fecha')?.value);
    formData.append('cod_documento',this.meritoForm.get('cod_documento')?.value);
    formData.append('observacion',this.meritoForm.get('observacion')?.value);
    formData.append('id_personal',`${this.idpersonal}`);
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
          this.cancelarcuatro();
          this.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  EditarMerito(){
    const formData = new FormData();
    formData.append('tipo_documento',this.meritoEditarForm.get('tipodocumento')?.value);
    formData.append('tipo_instancia',this.meritoEditarForm.get('tipoinstancia')?.value);
    formData.append('id_instancia',this.meritoEditarForm.get('id_instancia')?.value);
    formData.append('id_sancion',this.meritoEditarForm.get('id_sancion')?.value);
    formData.append('id_estado',this.meritoEditarForm.get('id_estado')?.value);
    formData.append('fecha',this.meritoEditarForm.get('fecha')?.value);
    formData.append('cod_documento',this.meritoEditarForm.get('cod_documento')?.value);
    formData.append('observacion',this.meritoEditarForm.get('observacion')?.value);

      this.meritoService.putMerito(formData,`${this.idpersonal}`).subscribe(
        (data) => {
          Swal.fire('Editado!', data.msg, 'success');
        },
        (error) => {
          console.log(error);
        }
      );

  }
  editarDocumentoMerito(){
    if (this.loadDocumentoMerito==='') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Falta seleccionar el documento actualizar',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
      const formData = new FormData();
      formData.append('archivo',this.fileDocumentoMerito?.nativeElement.files[0]);
      this.meritoService.putDocumentoMerito(formData,this.idDocumentoMerito).subscribe(
        (data)=>{
          Swal.fire('Actualizado!', data.msg, 'success');
        },
        (error)=>{
          console.log(error);

        }
      )
    }
  }
  eliminarMerito(id:number){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Este registro sera eliminado de la base de datos",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText:  'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.meritoService.deleteMerito(id).subscribe(
          (data)=>{
            Swal.fire(
              'Eliminado!',
              'Registro eliminado de la base de datos.',
              'success'
            )
          }, (error)=>{
            console.log(error);

          }
        )
      }
    })
  }

  obtenerMeritoId(id:number){
    this.meritoService.getMeritoId(id).subscribe(
      (data)=>{
        this.buscarSiglaMeritoDos(`${data.resp.tipo_instancia}`)
        this.meritoEditarForm.setValue({
          tipodocumento:`${data.resp.tipo_documento}`,
          tipoinstancia:`${data.resp.tipo_instancia}`,
          id_instancia:`${data.resp.id_instancia}`,
          id_sancion:`${data.resp.id_sancion}`,
          id_estado:`${data.resp.id_estado}`,
          fecha:data.resp.fecha,
          cod_documento:data.cod_documento,
          observacion:data.resp.observacion
        });

      },(error)=>{
        console.log(error);

      }
    )
  }
  obtenerIdDocumentoMerito(id:number){
    this.idDocumentoMerito=`${id}`;
  }
  mostrarEstado(){
    this.estadoService.getEstados().subscribe(
      (data)=>{
        console.log(data);
        this.listEstado=data.resp;
      },
      (error)=>{
        console.log(error);

      }
    )
  }
  mostrarSancion(){
    this.sancionService.getSancion().subscribe(
      (data)=>{
        console.log(data);
        this.listSancion=data.resp;
      },
      (error)=>{
        console.log(error);

      }
    )
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
    this.fileInput!.nativeElement.value = '';
    this.fileLicencia!.nativeElement.value = '';
    this.fileVacacional!.nativeElement.value = '';
    this.fileDocumentoVacacional!.nativeElement.value='';
    this.fileDocumentoLaboral!.nativeElement.value='';
    this.fileDocumentoLicencia!.nativeElement.value='';
    this.fileMerito!.nativeElement.value='';
    this.fileDocumentoMerito!.nativeElement.value='';
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
  cancelaruno() {
    this.generalForm.setValue({
      periodo: '',
      tipodocumento: '',
      numero: '',
      ano: '',
      tiposigla: '0',
      autoriza: '0',
      tipodependencia: '',
      dependencia: '',
      cargo: '',
      desde: '',
      hasta: '',
    });
    this.recordEditarForm.setValue({
      periodo: '',
      tipodocumento: '',
      numero: '',
      ano: '',
      tiposigla: '0',
      autoriza: '0',
      tipodependencia: '',
      dependencia: '',
      cargo: '',
      desde: '',
      hasta: '',
      tipo_personal: '',
    });
    this.loadImage = '';
    this.reset();
    this.loadDocumentoImage ='';
  }
  cancelardos() {
    this.licenciaForm.setValue({
      tipodocumento: '',
      areauno: '',
      areados: '',
      numero: '',
      ano: '',
      inicio: '',
      fin: '',
      detallelicencia: '',
    });
    this.licenciaEditarForm.setValue({
      tipodocumento: '',
      areauno: '',
      areados: '',
      numero: '',
      ano: '',
      inicio: '',
      fin: '',
      detallelicencia: '',
      tipo_licencia:''
    });
    this.loadLicencia = '';
    this.reset();
    this.loadDocumentoLicencia='';
  }
  cancelartres() {
    this.vacacionalForm.setValue({
      tipodocumento: '',
      areauno: '',
      areados: '',
      numero: '',
      ano: '',
      inicio: '',
      fin: '',
      periodo: '',
    });
    this.vacacionalEditarForm.setValue({
      tipodocumento: '',
      areauno: '',
      areados: '',
      numero: '',
      ano: '',
      inicio: '',
      fin: '',
      periodo: '',
    });
    this.loadVacacional = '';
    this.reset();
    this.loadDocumentoVacacional='';
  }
  cancelarcuatro(){
    this.meritoForm.setValue({
      tipodocumento:'',
      tipoinstancia:'',
      id_instancia:'',
      id_sancion:'',
      id_estado:'',
      fecha:'',
      cod_documento:'',
      observacion:''
    });
    this.meritoEditarForm.setValue({
      tipodocumento:'',
      tipoinstancia:'',
      id_instancia:'',
      id_sancion:'',
      id_estado:'',
      fecha:'',
      cod_documento:'',
      observacion:''
    });
    this.loadMerito='';
    this.reset();

  }
}
