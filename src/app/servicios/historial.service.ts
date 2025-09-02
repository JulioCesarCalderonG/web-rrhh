import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  private url = `${pathUrl}/historial`
  constructor(private http:HttpClient, private router:Router) { }

  getHistorialAdmin(id:string):Observable<any>{
    return this.http.get(`${this.url}/personal/${id}`);
  }

  getHistorial(id:string | number):Observable<any>{
    return this.http.get(this.url,{params:{id}});
  }

}
