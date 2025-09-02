import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pathUrl } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${pathUrl}/auth`;
  constructor(
    private http: HttpClient,
    private router:Router,
  ) { }
  login(data:FormData):Observable<any>{
    return this.http.post(this.url, data);
  }
  getToken(){
    return sessionStorage.getItem('x-token');
  }
  loggoud(){
    sessionStorage.removeItem('x-token');
    this.router.navigate(['/login']);

  }
  resetPassword(body:FormData):Observable<any>{
    return this.http.put(`${this.url}/password`,body);
  }
}
