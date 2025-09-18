import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../servicios/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ResultAuth } from 'src/app/interfaces/result.auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {
  dataLogin: FormGroup;
  constructor(
    private loginService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.dataLogin = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }
  login() {
    const formData = new FormData();
    formData.append('user',this.dataLogin.get('usuario')?.value);
    formData.append('password',this.dataLogin.get('password')?.value);
    this.loginService.login2(formData).subscribe(
      (data:ResultAuth)=>{
        console.log(data);
        
         sessionStorage.setItem('carga','0');
        sessionStorage.setItem('x-token', data.token);
        sessionStorage.setItem('usuario', data.usuario.user);
        sessionStorage.setItem('cargo',`${data.usuario.idPerfil}`)
        sessionStorage.setItem('personal',`${data.usuario.nombre} ${data.usuario.apellido}`);
        this.router.navigateByUrl('/admin');
     /*   if (data.ok === false) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Usuario o contraseña incorrecto',
          showConfirmButton: false,
          timer: 1500,
        });
       }else if(data.ok===true){
        const cargo = data.user.Rol.sigla;
        console.log(cargo);

        sessionStorage.setItem('carga','0');
        sessionStorage.setItem('x-token', data.token);
        sessionStorage.setItem('usuario', data.user.usuario);
        sessionStorage.setItem('cargo',data.user.Rol.sigla)
        sessionStorage.setItem('personal',`${data.user.nombre}`);
        if (cargo==='UA') {
          this.router.navigateByUrl('/admin');
        }
        else if (cargo==='D') {
          this.router.navigateByUrl('/admin');
        }
        else if (cargo ==='UJ') {
          this.router.navigateByUrl('/jefe');
        }
       } */
      },
      (error)=>{
        console.log(error.error.msg);
        this.toastr.warning(error.error.msg,"Aviso!");
      }
    )
  }
}
