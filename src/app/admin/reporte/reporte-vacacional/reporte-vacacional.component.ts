import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { VacacionalService } from '../../../servicios/vacacional.service';
import { ReporteService } from '../../../servicios/reporte.service';
import { RegimenLaboralService } from '../../../servicios/regimen-laboral.service';
import { pathUrl } from 'src/app/api/api';

@Component({
  selector: 'app-reporte-vacacional',
  templateUrl: './reporte-vacacional.component.html',
  styleUrls: ['./reporte-vacacional.component.css'],
})
export class ReporteVacacionalComponent implements OnInit {
  idpersonal?: string | number;
  personal = '';
  listVacacional?: Array<any>;
  vacacionalForm: FormGroup;
  regimenForm: FormGroup;
  vacacionalEditarForm: FormGroup;
  loadVacacional: string = '';
  loadDocumentoVacacional: string = '';
  idVacacional: string = '';
  idDocumentoVacacional: string = '';
  carga: boolean = true;

  @ViewChild('fileVacacional', { static: false }) fileVacacional?: ElementRef;
  @ViewChild('fileDocumentoVacacional', { static: false })
  fileDocumentoVacacional?: ElementRef;
  url3 = `${pathUrl}/reporte`;
  url4 = `${pathUrl}/uploadgeneral/vacacional`;
  uploadVacacional?: File;
  uploadDocumentoVacacional?: File;
  listRegimenLaboral?: Array<any>;
  constructor(
    private rutaActiva: ActivatedRoute,
    private vacacionalService: VacacionalService,
    private reporteService: ReporteService,
    private regimenService: RegimenLaboralService,
    private fb: FormBuilder
  ) {
    this.vacacionalForm = this.fb.group({
      regimen: ['', Validators.required],
      tipodocumento: ['', Validators.required],
      areauno: [''],
      areados: [''],
      numero: [Number, Validators.required],
      ano: [Number, Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      periodo: ['', Validators.required],
    });
    this.vacacionalEditarForm = this.fb.group({
      regimen: ['', Validators.required],
      tipodocumento: ['', Validators.required],
      areauno: [''],
      areados: [''],
      numero: [Number, Validators.required],
      ano: [Number, Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      periodo: ['', Validators.required],
    });
    this.regimenForm = this.fb.group({
      regimen: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.idpersonal = this.rutaActiva.snapshot.params.id;
    this.personal = this.rutaActiva.snapshot.params.personal;
    this.mostrarTablas();
    this.mostrarRegimenLaboral();
  }

  mostrarTablas() {
    if (this.carga) {
      Swal.fire({
        title: 'Generando reporte',
        html: 'Por favor espere',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    this.vacacionalService
      .getVacacionalPersonal(`${this.idpersonal}`)
      .subscribe(
        (data) => {
          console.log(data);
          this.listVacacional = data.resp;
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

  mostrarRegimenLaboral() {
    this.regimenService.getRegimenPersonalId(this.idpersonal!).subscribe(
      (data) => {
        this.listRegimenLaboral = data.resp;
        console.log(data);
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
    const id_regimen_laboral = this.regimenForm.get('regimen')?.value;
    if (id_regimen_laboral !== '') {
      this.reporteService
        .postReporteVacacionalId(`${this.idpersonal}`, { id_regimen_laboral })
        .subscribe(
          (data) => {
            console.log(data);
            const urlreport = `${this.url3}/vacacional/${data.nombre}`;
            window.open(urlreport, '_blank');
            this.carga = false;
            if (!this.carga) {
              Swal.close();
            }
          },
          (error) => {
            if (!this.carga) {
              Swal.close();
            }
            console.log(error);
          }
        );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Seleccionar el tipo de regimen',
      });
    }
  }

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
    formData.append('id_regimen_laboral',this.vacacionalForm.get('regimen')?.value);
    formData.append('personal', this.personal);
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
          this.carga=false;
          this.cancelartres();
          this.reset();
          this.mostrarTablas();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  editarVacacional() {
    const tipoDoc = this.vacacionalEditarForm.get('tipodocumento')?.value;
    const areauno = this.vacacionalEditarForm.get('areauno')?.value;
    const areados = this.vacacionalEditarForm.get('areados')?.value;
    const formData = new FormData();
    formData.append(
      'tipo_documento',
      this.vacacionalEditarForm.get('tipodocumento')?.value
    );
    formData.append('inicio', this.vacacionalEditarForm.get('inicio')?.value);
    formData.append('fin', this.vacacionalEditarForm.get('fin')?.value);
    formData.append('periodo', this.vacacionalEditarForm.get('periodo')?.value);
    formData.append('numero', this.vacacionalEditarForm.get('numero')?.value);
    formData.append('ano', this.vacacionalEditarForm.get('ano')?.value);
    formData.append('id_personal', `${this.idpersonal}`);
    formData.append('personal', this.personal);
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
        formData.append(
          'area',
          this.vacacionalEditarForm.get('areauno')?.value
        );
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
        formData.append(
          'area',
          this.vacacionalEditarForm.get('areados')?.value
        );
      }
    }
    this.vacacionalService.putVacacional(formData, this.idVacacional).subscribe(
      (data) => {
        Swal.fire('Editado!', data.msg, 'success');
        this.carga=false;
        this.mostrarTablas();
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarDocumentoVacacional() {
    if (this.loadDocumentoVacacional === '') {
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
        this.fileDocumentoVacacional?.nativeElement.files[0]
      );
      formData.append('personal', this.personal);
      this.vacacionalService
        .putDocumentoVacacional(formData, this.idDocumentoVacacional)
        .subscribe(
          (data) => {
            Swal.fire('Registrado!', data.msg, 'success');
            this.carga=false;
            this.mostrarTablas();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  eliminarVacacional(id: number) {
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
        this.vacacionalService.deleteVacacional(id, this.personal).subscribe(
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
  obtenerIdDocumentoVacacional(id: number) {
    this.idDocumentoVacacional = `${id}`;
  }
  obtenerVacacionalId(id: number) {
    this.idVacacional = `${id}`;
    this.vacacionalService.getVacacionalId(id).subscribe(
      (data) => {
        console.log(data);
        this.vacacionalEditarForm.setValue({
          tipodocumento: `${data.resp.tipo_documento}`,
          areauno: data.resp.tipo_documento === 1 ? `${data.resp.area}` : '',
          areados: data.resp.tipo_documento === 2 ? `${data.resp.area}` : '',
          numero: data.resp.numero,
          ano: data.resp.ano,
          inicio: data.resp.inicio,
          fin: data.resp.termino,
          periodo: data.resp.periodo,
          regimen: `${data.resp.id_regimen_laboral}`,
        });
        this.mostrarTipoDocVacionalTres(`${data.resp.tipo_documento}`);
      },
      (error) => {
        console.log(error);
      }
    );
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
    console.log(id);
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

  reset() {
    this.fileVacacional!.nativeElement.value = '';
    this.fileDocumentoVacacional!.nativeElement.value = '';
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
      regimen: '',
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
      regimen: '',
    });
    this.loadVacacional = '';
    this.reset();
    this.loadDocumentoVacacional = '';
  }
}
