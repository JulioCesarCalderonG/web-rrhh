import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class CondicionService {
  private url = `${pathUrl}/condicion`
  constructor(private http:HttpClient, private router:Router) { }
  getCondicion(id:number|string):Observable<any>{
    return this.http.get(`${this.url}`, {params:{id:String(id)}});
  }
}
