import { Injectable } from '@angular/core';
import { pathUrl } from '../api/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = `${pathUrl}/usuario`;
  constructor(
    private http: HttpClient
  ) { }
  getUsuario(estado: number): Observable<any> {
    return this.http.get(`${this.url}`, { params: { estado } });
  }
  postUsuario(data: FormData): Observable<any> {
    return this.http.post(this.url, data);
  }
  putUsuario(data: FormData, id: number): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }
  putUsuarioPass(data: FormData, id: number): Observable<any> {
    return this.http.put(`${this.url}/password/${id}`, data);
  }
  deleteUsuario(estado: number, id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { params: { estado } })
  }
}
