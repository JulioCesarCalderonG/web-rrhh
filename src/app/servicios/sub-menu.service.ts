import { Injectable } from '@angular/core';
import { pathUrl } from '../api/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubMenuService {
  url = `${pathUrl}/submenu`;
  constructor(
    private http: HttpClient,
  ) { }

  getSubMenu(estado: number): Observable<any> {
    return this.http.get(`${this.url}`, { params: { estado } });
  }
   postSubMenu(data:FormData):Observable<any>{
    return this.http.post(this.url,data);
  }
  putSubMenu(data:FormData,id:number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,data);
  }
   deleteSubMenu(estado:number, id:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`,{params:{estado}})
  }
}
