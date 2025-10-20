import { Injectable } from '@angular/core';
import { pathUrl } from '../api/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
url = `${pathUrl}/perfil`;
  constructor(
    private http: HttpClient
  ) { }
   getPerfil(estado:number):Observable<any>{
    return this.http.get(`${this.url}`,{params:{estado}});
  }
  getMenuInclude(id:number):Observable<any>{
    return this.http.get(`${this.url}/menu/include/${id}`);
  }
  getMenuNotInclude(id:number):Observable<any>{
    return this.http.get(`${this.url}/menu/notinclude/${id}`);
  }
  postPerfil(data:FormData):Observable<any>{
    return this.http.post(this.url,data);
  }
  putPerfil(data:FormData,id:number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,data);
  }
  deletePerfil(estado:number, id:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`,{params:{estado}})
  }
}
