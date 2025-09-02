import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private url = `${pathUrl}/cargo`
  constructor(private http:HttpClient, private router:Router) { }

  getCargos(estado:string='1'):Observable<any>{
    return this.http.get(this.url,{params:{estado}});
  }

  getCargoId(id:number|string):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }

  getCargoPersonal(id:number | string):Observable<any>{
    return this.http.get(`${this.url}/tipopersonal/${id}`);
  }

  postCargos(body:FormData):Observable<any>{
    return this.http.post(this.url,body);
  }

  putCargo(body:FormData, id:string|number):Observable<any>{
    return this.http.put(`${this.url}/${id}`, body);
  }

  deleteCargo(id:number, estado:number):Observable<any>{
    return this.http.delete(`${this.url}/${id}`, {params:{estado:String(estado)}})

  }

}
