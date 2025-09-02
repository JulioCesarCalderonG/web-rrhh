import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  url=`${pathUrl}/sede`
  constructor(private http:HttpClient, private router:Router) { }

  getSedes(estado:string='1'):Observable<any>{
    return this.http.get(this.url,{params:{estado}});
  }

  getSedeId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postSede(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }

  putSede(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,body);
  }

  deleteSede(id:number, estado:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {params:{estado:String(estado)}});
  }

}
