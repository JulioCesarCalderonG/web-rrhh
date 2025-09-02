import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class RegimenLaboralService {
  private url = `${pathUrl}/regimenlaboral`
  constructor(private http:HttpClient, private router:Router) { }


  getRegimenlaboral(estado:string='1',buscar:string=''):Observable<any>{
    return this.http.get(this.url, {params:{estado,buscar}});
  }

  getRegimenLaboralId(id:number|string):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postRegimenlaboral(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }

  putRegimenlaboral(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body);
  }
  getRegimenPersonalId(id:string| number):Observable<any>{
    return this.http.get(`${this.url}/personal/${id}`);
  }

}
