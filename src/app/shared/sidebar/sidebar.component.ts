import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../servicios/auth.service';
import { MenuService } from 'src/app/servicios/menu.service';
import { MenuUsuario, ResultMenuUsuario } from 'src/app/interfaces/menu.usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  resetForm:FormGroup;
  personal:string='';
  menu:MenuUsuario[]=[
    {
      nomMenu:'',
      submenu:[{
        titulo:'',
        subMenu:''
      }],
      titulo:''
    }
  ];
  constructor(
    private authService:AuthService,
    private fb:FormBuilder,
    private menuServ:MenuService
  ) {
    this.resetForm = this.fb.group({
      passworduno:['',Validators.required],
      passworddos:['',Validators.required]
    });
    this.personal = sessionStorage.getItem('personal')!;
  }

  ngOnInit(): void {
    this.mostrarMenu();
  }
  logout(){
    this.authService.loggoud();
  }
  resetPassword(){
    const formData = new FormData();
    formData.append('passworduno',this.resetForm.get('passworduno')?.value);
    formData.append('passworddos',this.resetForm.get('passworddos')?.value);
    this.authService.resetPassword(formData).subscribe(
      (data)=>{
        if (data.ok) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.msg,
            showConfirmButton: false,
            timer: 1500
          });
          this.cancelar();
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: data.msg,
            showConfirmButton: false,
            timer: 1500
          });
        }
      },(error)=>{
        console.log(error);

      }
    )
  }
  cancelar(){
    this.resetForm.setValue({
      passworduno:'',
      passworddos:''
    })
  }
   mostrarMenu(){
    this.menuServ.getMenuUsuario().subscribe({
      next:(data:ResultMenuUsuario)=>{
        console.log(data);
        this.menu=data.menu;
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }
}
