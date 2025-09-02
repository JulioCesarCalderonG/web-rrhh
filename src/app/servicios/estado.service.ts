import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private url=`${pathUrl}/estado`
  constructor(private http:HttpClient, private router:Router) { }

  getEstados(estado:string='1'):Observable<any>{
    return this.http.get(this.url,{params:{estado}});
  }
}
