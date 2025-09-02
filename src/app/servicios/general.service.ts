import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private url = `${pathUrl}/general`
  url2= `${pathUrl}/uploadgeneral/recordlaboral`;
  constructor(private http:HttpClient, private router:Router) { }

  getGeneralPersonal(id:string):Observable<any>{
    return this.http.get(`${this.url}/personal/${id}`);
  }
  getGeneralPersonalDni(dni:string):Observable<any>{
    return this.http.get(`${this.url}/personal/dni/${dni}`);
  }
  getGeneral(tipofiltro:string,dato:string):Observable<any>{
    return this.http.get(this.url,{params:{tipofiltro,dato}});
  }

  getGeneralId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postGeneral(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }

  putGeneral(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body);
  }
  deleteGeneral(id:string|number, personal:string=''):Observable<any>{
    return this.http.delete(`${this.url}/${id}`,{params:{personal}});
  }

  putDocumentoLaboral(body:FormData, id:string):Observable<any>{
    return this.http.put(`${this.url2}/${id}`, body);
  }
}
