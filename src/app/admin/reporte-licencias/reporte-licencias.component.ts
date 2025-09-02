import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.prod';
import { TipoLicenciaService } from '../../servicios/tipo-licencia.service';
import { DetalleLicenciaService } from '../../servicios/detalle-licencia.service';
import { LicenciaService } from '../../servicios/licencia.service';
import { ReporteService } from '../../servicios/reporte.service';
@Component({
  selector: 'app-reporte-licencias',
  templateUrl: './reporte-licencias.component.html',
  styleUrls: ['./reporte-licencias.component.css'],
})
export class ReporteLicenciasComponent implements OnInit {
  idpersonal?: string | number;
  personal = '';
  listLicencia?: Array<any>;
  listTipoLicencia?: Array<any>;
  listDetalleLicencia?: Array<any>;
  licenciaForm: FormGroup;
  licenciaEditarForm: FormGroup;
  loadLicencia: string = '';
  loadDocumentoLicencia: string = '';
  idLicencia: string = '';
  idDocumentoLicencia: string = '';
  carga: boolean = true;
  @ViewChild('fileLicencia', { static: false }) fileLicencia?: ElementRef;
  @ViewChild('fileDocumentoLicencia', { static: false })
  fileDocumentoLicencia?: ElementRef;
  url2 = `${environment.backendUrl}/uploadgeneral/licencia`;
  url3 = `${environment.backendUrl}/reporte`;
  uploadLicencia?: File;
  uploadDocumentoLicencia?: File;
  constructor(
    private rutaActiva: ActivatedRoute,
    private tipoLicenciaService: TipoLicenciaService,
    private detalleLicenciaService: DetalleLicenciaService,
    private licenciaService: LicenciaService,
    private reporteService: ReporteService,
    private fb: FormBuilder
  ) {
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
    this.licenciaEditarForm = this.fb.group({
      tipodocumento: ['', Validators.required],
      areauno: [''],
      areados: [''],
      numero: [Number, Validators.required],
      ano: [Number, Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      detallelicencia: ['', Validators.required],
      tipo_licencia: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.idpersonal = this.rutaActiva.snapshot.params.id;
    this.personal = this.rutaActiva.snapshot.params.personal;
    this.mostrarTipoLicencia();
    this.mostrarTablas();
  }

  /*  Seccion Crear Licencias */
  mostrarTablas() {
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
    document.getElementById('tableRecord')?.classList.add('invi');
    document.getElementById('tableLicencia')?.classList.remove('invi');
    document.getElementById('tableVacacional')?.classList.add('invi');
    document.getElementById('tableMerito')?.classList.add('invi');
    this.licenciaService.getLicenciaPersonal(`${this.idpersonal}`).subscribe(
      (data) => {
        console.log(data);
        this.listLicencia = data.resp;
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
        this.carga=true
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
    this.reporteService.postReporteLicenciaId(`${this.idpersonal}`).subscribe(
      (data) => {
        const urlreport = `${this.url3}/licencia/${data.nombre}`;
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
    formData.append('personal',`${this.personal}`);
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
          this.carga=false;
          this.cancelardos();
          this.reset();
          this.mostrarTablas();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  editarLicencia() {
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
    formData.append('personal',`${this.personal}`);
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

    this.licenciaService.putLicencia(formData, this.idLicencia).subscribe(
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
  editarDocumentoLicencia() {
    if (this.loadDocumentoLicencia === '') {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Falta seleccionar el documento a actualizar',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const formData = new FormData();
      formData.append(
        'archivo',
        this.fileDocumentoLicencia?.nativeElement.files[0]
      );
      formData.append('personal',`${this.personal}`);
      this.licenciaService
        .putDocumentoLicencia(formData, this.idDocumentoLicencia)
        .subscribe(
          (data) => {

            this.mostrarTablas();
            Swal.fire('Registrado!', data.msg, 'success');
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  eliminarLicencia(id: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Este registro sera eliminado de la base de datos!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.licenciaService.deleteLicencia(id,this.personal).subscribe(
          (data) => {
            Swal.fire(
              'Eliminar!',
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
  obtenerIdDocumentoLicencia(id: number) {
    this.idDocumentoLicencia = `${id}`;
  }
  obtenerLicenciaId(id: number) {
    this.idLicencia = `${id}`;
    this.licenciaService.getLicenciaId(id).subscribe(
      (data) => {
        this.licenciaEditarForm.setValue({
          tipodocumento: `${data.resp.tipo_documento}`,
          areauno: data.resp.tipo_documento === 1 ? `${data.resp.area}` : '',
          areados: data.resp.tipo_documento === 2 ? `${data.resp.area}` : '',
          numero: data.resp.numero,
          ano: data.resp.ano,
          inicio: data.resp.inicio,
          fin: data.resp.fin,
          detallelicencia: `${data.resp.id_detalle_licencia}`,
          tipo_licencia: `${data.resp.DetalleLicencium.TipoLicencium.id}`,
        });
        this.mostrarDetalleLicenciaDos(
          `${data.resp.DetalleLicencium.TipoLicencium.id}`
        );
        this.mostrarProveidoTres(`${data.resp.tipo_documento}`);
      },
      (error) => {
        console.log(error);
      }
    );
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
  mostrarDetalleLicenciaDos(id: string) {
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

  /* Funciones Secundarias */
  reset() {
    this.fileLicencia!.nativeElement.value = '';
    this.fileDocumentoLicencia!.nativeElement.value = '';
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
      tipo_licencia: '',
    });
    this.loadLicencia = '';
    this.reset();
    this.loadDocumentoLicencia = '';
  }
}
