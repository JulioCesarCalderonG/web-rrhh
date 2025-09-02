import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class SancionService {
  private url=`${pathUrl}/sancion`
  constructor(private http:HttpClient, private router:Router) { }

  getSancion(estado:string='1'):Observable<any>{
    return this.http.get(this.url,{params:{estado}});
  }
}
