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
    private http: HttpClient
  ) { }

  getMenuUsuario():Observable<any>{
    return this.http.get(`${this.url}/mostrar/menu`)
  }
  getMenu(estado:number):Observable<any>{
    return this.http.get(`${this.url}`,{params:{estado}});
  }
  postMenu(data:FormData):Observable<any>{
    return this.http.post(this.url,data);
  }
  putMenu(data:FormData,id:number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,data);
  }
  deleteMenu(estado:number, id:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`,{params:{estado}})
  }
}
