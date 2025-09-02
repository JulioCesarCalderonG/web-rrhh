import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class TipodocumentoService {

  private url = `${pathUrl}/tipodocumento`
  constructor(private http:HttpClient, private router:Router) { }

  getTipodocumento(estado:string='1'):Observable<any>{
    return this.http.get(this.url, {params:{estado}});
  }

  getTipodocumentoId(id:string|number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  postTipodocumento(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }

  putTipodocumento(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,body);
  }

  deleteTipodocumento(id:number, estado:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {params:{estado:String(estado)}})
  }
}
