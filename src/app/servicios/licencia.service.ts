import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class LicenciaService {
  url=`${pathUrl}/licencia`
  url2=`${pathUrl}/uploadgeneral/licencias`;
  constructor(private http:HttpClient, private router:Router) { }

  getLicenciaPersonal(id:string):Observable<any>{
    return this.http.get(`${this.url}/personal/${id}`)
  }
  //getLicenciaPersonalEscalafon(escalafon:string):Observable<any>{
    //return this.http.get(`${this.url}/personal/escalafon/${escalafon}`)
  //}

  getLicenciaPersonalDni(dni:string):Observable<any>{
    return this.http.get(`${this.url}/personal/dni/${dni}`)
  }

  getLicenciaId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  postLicencia(body:FormData):Observable<any>{
    return this.http.post(this.url,body)
  }
  putLicencia(body:FormData,id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,body)
  }
  deleteLicencia(id:string|number,personal:string=''):Observable<any>{
    return this.http.delete(`${this.url}/${id}`,{params:{personal}});
  }

  putDocumentoLicencia(body:FormData, id:string):Observable<any>{
    return this.http.put(`${this.url2}/${id}`, body)
  }
}
