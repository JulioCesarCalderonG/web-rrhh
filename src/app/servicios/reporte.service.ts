import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private url = `${pathUrl}/reporte`
  constructor(private http:HttpClient, private router:Router) { }

  postReporteRecord(formData:FormData):Observable<any>{
    return this.http.post(`${this.url}/recordlaboral`,formData);
  }
  postReporteRecordId(id:string):Observable<any>{
    return this.http.post(`${this.url}/recordlaboral/personal/${id}`,{});
  }
  postReporteLicenciaId(id:string):Observable<any>{
    return this.http.post(`${this.url}/licencia/personal/${id}`,{});
  }
  postReporteMeritoId(id:string):Observable<any>{
    return this.http.post(`${this.url}/merito/personal/${id}`,{});
  }
  postReporteVacacionalId(id:string,data={}):Observable<any>{
    return this.http.post(`${this.url}/vacacional/personal/${id}`,data);
  }
}
