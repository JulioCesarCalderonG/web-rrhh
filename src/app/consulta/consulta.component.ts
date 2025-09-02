
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from '../servicios/general.service';
import { VacacionalService } from '../servicios/vacacional.service';
import { LicenciaService } from '../servicios/licencia.service';
import { MeritoService } from '../servicios/merito.service';
import { SolicitudService } from '../servicios/solicitud.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  idpersonal?: string | number;
  consultaForm:FormGroup;
  reporteForm:FormGroup;
  listLaboral?:Array<any>;
  listVacacional?:Array<any>;
  listLicencia?:Array<any>;
  listMerito?:Array<any>;
  p1:number=1;
  p2:number=1;
  p3:number=1;
  p4:number=1;
  constructor(
    private fb:FormBuilder,
    private laboralService: GeneralService,
    private vacacionalService:VacacionalService,
    private licenciaService:LicenciaService,
    private meritoService:MeritoService,
    private solicitudService:SolicitudService
  ) {
    this.consultaForm = this.fb.group({
      dni:['', Validators.required],
      tipo:['',Validators.required]
    });
    this.reporteForm=this.fb.group({
      correo:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  mostrarLaboral(){
    const dni = this.consultaForm.get('dni')?.value;
    this.laboralService.getGeneralPersonalDni(dni).subscribe(
      (data)=>{
        this.listLaboral=data.resp
      }
    )
  }
  mostrarVacacional(){
    const dni = this.consultaForm.get('dni')?.value;
    this.vacacionalService.getVacacionalPersonalDni(dni).subscribe(
      (data)=>{
        this.listVacacional=data.resp
      }
    )
  }
  mostrarLicencia(){
    const dni = this.consultaForm.get('dni')?.value;
    this.licenciaService.getLicenciaPersonalDni(dni).subscribe(
      (data)=>{
        this.listLicencia=data.resp
      }
    )
  }
  mostrarMerito(){
    const dni = this.consultaForm.get('dni')?.value;
    this.meritoService.getMeritoPersonalDni(dni).subscribe(
      (data)=>{
        this.listMerito=data.resp
      }
    )
  }


  mostrarTabla(){
    const tipo = this.consultaForm.get('tipo')?.value;
    const tableLaboral = document.getElementById('tabla-laboral');
    const tableVacacional = document.getElementById('tabla-vacacional');
    const tableLicencia = document.getElementById('tabla-licencia');
    const tableMerito = document.getElementById('tabla-merito');
    switch (String(tipo)) {
      case '1':
            this.p1=1;
            this.mostrarLaboral();
            tableLaboral?.classList.remove('invi');
            tableVacacional?.classList.add('invi');
            tableLicencia?.classList.add('invi');
            tableMerito?.classList.add('invi');
            return;
        break;
      case '2':
            this.p1=1;
            this.mostrarVacacional();
            tableLaboral?.classList.add('invi');
            tableVacacional?.classList.remove('invi');
            tableLicencia?.classList.add('invi');
            tableMerito?.classList.add('invi');
            return;
        break;
      case '3':
            this.p1=1;
            this.mostrarLicencia();
            tableLaboral?.classList.add('invi');
            tableVacacional?.classList.add('invi');
            tableLicencia?.classList.remove('invi');
            tableMerito?.classList.add('invi');
            return;
        break;
      case '4':
            this.p1=1;
            this.mostrarMerito();
            tableLaboral?.classList.add('invi');
            tableVacacional?.classList.add('invi');
            tableLicencia?.classList.add('invi');
            tableMerito?.classList.remove('invi');
            return
        break;
      default:
            this.p1=1;
            tableLaboral?.classList.add('invi');
            tableVacacional?.classList.add('invi');
            tableLicencia?.classList.add('invi');
            tableMerito?.classList.add('invi');
            return;
        break;
    }
  }

  generarReporteLaborar(){
    const formData = new FormData();

    formData.append('tipo_reporte', this.consultaForm.get('tipo')?.value);
    formData.append('dni', this.consultaForm.get('dni')?.value);
    formData.append('correo', this.reporteForm.get('correo')?.value);

    this.solicitudService.postSolicitud(formData).subscribe(
      (data:any)=>{
        //Swal.fire('Solicitud enviada','Se ha enviado su solicitud con exito, se enviara el reporte a su correo','success');

      },(error)=>{
        console.log(error);
        //Swal.fire('Error de envio',`${error.error.msg}`,'error');
      }
    )

  }



}
