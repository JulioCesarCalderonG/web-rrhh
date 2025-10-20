import { Injectable } from '@angular/core';
import { pathUrl } from '../api/api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterSubPerfil } from '../interfaces/register.subperfil';


@Injectable({
  providedIn: 'root'
})
export class PerfilSubmenuService {
url = `${pathUrl}/perfilsubmenu`;
  constructor(
    private http: HttpClient
  ) { }
  postPerfilSubMenu(data:RegisterSubPerfil):Observable<any>{
    return this.http.post(this.url,data)
  }
  deletePerfilSubMenu(data:RegisterSubPerfil):Observable<any>{
    return this.http.post(`${this.url}/eliminar/perfil`,data)
  }
}
