import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class DetalleLicenciaService {
  private url=`${pathUrl}/detallelicencia`
  constructor(private http:HttpClient, private router:Router) { }

  getDetalleTipo(id:string):Observable<any>{
    return this.http.get(`${this.url}/tipo/${id}`);
  }

  getDetalleLicencia(estado:string='1'):Observable<any>{
    return this.http.get(this.url, {params:{estado}});
  }

  getDetalleLicenciaId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postDetalleLicencia(body:FormData):Observable<any>{
    return this.http.post(this.url, body);
  }

  putDetalleLicencia(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body);
  }

  deleteDetalleLicencia(id:number, estado:number){
    return this.http.delete(`${this.url}/${id}`, {params:{estado:String(estado)}});
  }
}
