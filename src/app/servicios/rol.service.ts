import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  url=`${pathUrl}/rol`
  constructor(private http:HttpClient, private router:Router) { }

  getRoles():Observable<any>{
    return this.http.get(this.url);
  }
}
