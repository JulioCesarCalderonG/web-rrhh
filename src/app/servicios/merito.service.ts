import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class MeritoService {
  private url=`${pathUrl}/merito`;
  url2=`${pathUrl}/uploadgeneral/merito`;
  constructor(private http:HttpClient, private router:Router) { }

  getMeritoPersonal(id:string):Observable<any>{
    return this.http.get(`${this.url}/personal/${id}`)
  }
  //getMeritoPersonalEscalafon(escalafon:string):Observable<any>{
    //return this.http.get(`${this.url}/personal/escalafon/${escalafon}`)
  //}

  getMeritoPersonalDni(dni:string):Observable<any>{
    return this.http.get(`${this.url}/personal/dni/${dni}`)
  }

  getMeritoId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  postMerito(body:FormData):Observable<any>{
    return this.http.post(this.url,body)
  }
  putMerito(body:FormData,id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,body)
  }
  deleteMerito(id:string|number, personal:string=''):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {params:{personal}});
  }

  putDocumentoMerito(body:FormData, id:string):Observable<any>{
    return this.http.put(`${this.url2}/${id}`, body);
  }
}
