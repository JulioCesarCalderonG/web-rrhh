import { Injectable } from '@angular/core';
import { pathUrl } from '../api/api';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
url = `${pathUrl}/menu`;
  constructor(
    private http: HttpClient,
    private router:Router,
  ) { }

  getMenuUsuario():Observable<any>{
    return this.http.get(`${this.url}/mostrar/menu`)
  }
}
