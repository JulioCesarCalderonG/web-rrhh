import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  resetForm:FormGroup;
  personal:string='';
  constructor(
    private authService:AuthService,
    private fb:FormBuilder
  ) {
    this.resetForm = this.fb.group({
      passworduno:['',Validators.required],
      passworddos:['',Validators.required]
    });
    this.personal = sessionStorage.getItem('personal')!;
  }

  ngOnInit(): void {
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
}
