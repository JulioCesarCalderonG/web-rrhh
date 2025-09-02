import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.prod';
import { SolicitudService } from '../../servicios/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  listSolicitud?:Array<any>;
  atendido:string='0';
  url=`${environment.backendUrl}/solicitud/imagen`
  constructor(
    private solicitudService:SolicitudService
  ) { }

  ngOnInit(): void {
    this.mostrarSolicitudes();
  }
  mostrarSolicitudes(){
    this.solicitudService.getSolicitudes(this.atendido).subscribe(
      (data)=>{
        this.listSolicitud = data.resp;
        console.log(this.listSolicitud);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  firmarDocumento(id:number,id_personal:number,tipo_reporte:number,fecha:string){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Este documento sera firmado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, firmar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = new FormData();
        data.append('id_personal',`${id_personal}`);
        data.append('tipo_reporte',`${tipo_reporte}`);
        data.append('fechareporte',`${fecha}`);
        this.solicitudService.putFirmar(data,id).subscribe(
          (data)=>{
            console.log(data);
            Swal.fire(
              'Firmado!',
              'Documento ha sido firmado con exito.',
              'success'
            );
            this.mostrarSolicitudes();
          },(error)=>{
            console.log(error);
          }
        )


      }
    })
  }
  enviarReporte(id:string,nombre:string,correo:string){
    Swal.fire({
      title: 'Estas seguro?',
      text: "Se enviara el reporte al correo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, enviar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          nombre,
          correo,
        }
        this.solicitudService.putEnviarCorreo(data,id).subscribe(
          (data)=>{
            console.log(data);
            Swal.fire(
              'Enviado al correo!',
              'Se ha enviado el reporte con exito.',
              'success'
            );
            this.mostrarSolicitudes();
          },(error)=>{
            console.log(error);
          }
        )


      }
    })
  }
  mostrarSolicitud(event:any){
    console.log(event.target.value);
    this.atendido = event.target.value;
    this.mostrarSolicitudes();
  }
}
