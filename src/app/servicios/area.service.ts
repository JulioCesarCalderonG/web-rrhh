import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private url = `${pathUrl}/area`
  constructor(private http:HttpClient, private router:Router) { }

  getAreas(estado:string="1"):Observable<any>{
    return this.http.get(this.url,{params:{estado}});
  }
  getAreaId(id:number|string):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  postAreas(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }
  putAreas(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,body)
  }
  deleteAreas(id:number,estado:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`,{params:{estado:String(estado)}})
  }
}
