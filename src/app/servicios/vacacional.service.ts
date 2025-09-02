import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class VacacionalService {
  url=`${pathUrl}/vacacional`
  url2= `${pathUrl}/uploadgeneral/vacacional`;
  constructor(private http:HttpClient, private router:Router) { }

  getVacacionalPersonal(id:string):Observable<any>{
    return this.http.get(`${this.url}/personal/${id}`)
  }
  //getVacacionalPersonalEscalafon(escalafon:string):Observable<any>{
    //return this.http.get(`${this.url}/personal/escalafon/${escalafon}`)
  //}

  getVacacionalPersonalDni(dni:string):Observable<any>{
    return this.http.get(`${this.url}/personal/dni/${dni}`)
  }

  getVacacionalId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`)
  }

  postVacacional(body:FormData):Observable<any>{
    return this.http.post(this.url,body)
  }

  putVacacional(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,body)
  }

  deleteVacacional(id:string|number, personal:string=''):Observable<any>{
    return this.http.delete(`${this.url}/${id}`,{params:{personal}});
  }

  putDocumentoVacacional(body:FormData,id:string):Observable<any>{
    return this.http.put(`${this.url2}/${id}`,body);
  }
}
