import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { closeAlert } from 'src/app/alerts/close';
import { loadData } from 'src/app/alerts/load';
import { Perfil, ResultPerfil } from 'src/app/interfaces/result.perfil';
import { ResultUsuario, Usuario } from 'src/app/interfaces/result.usuario';
import { PerfilService } from 'src/app/servicios/perfil.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  estado: number = 1;
  //TABLE
  displayedColumns: string[] = ['nombre', 'apellido', 'user', 'perfil', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  //listado
  listPerfil: Perfil[] = [];
  //form
  usuarioForm: FormGroup;
  usuarioEditForm: FormGroup;
  usuarioPassForm:FormGroup
  constructor(
    private userServ: UsuarioService,
    private perServ: PerfilService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      user: ["", Validators.required],
      password: ["", Validators.required],
      idPerfil: ["", Validators.required]
    });
    this.usuarioEditForm = this.fb.group({
      idUsuario: [0, Validators.required],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      user: ["", Validators.required],
      idPerfil: ["", Validators.required]
    });
    this.usuarioPassForm = this.fb.group({
      idUsuario: [0, Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarPerfil();
    this.mostrarUsuario(true);

  }
  mostrarUsuario(carga: boolean) {
    if (carga) {
      loadData('Cargando Informacion!', 'Espere....');
    }
    this.userServ.getUsuario(this.estado).subscribe({
      next: (data: ResultUsuario) => {
        this.dataSource.data = data.usuario;
        this.dataSource.paginator = this.paginator!;
        setTimeout(() => {
          closeAlert();
        }, 1000);
      },
      error: err => {
        console.log(err);
        setTimeout(() => {
          closeAlert();
        }, 1000);
      }
    })
  }
  mostrarPerfil() {
    this.perServ.getPerfil(1).subscribe({
      next: (data: ResultPerfil) => {
        this.listPerfil = data.perfil;
        setTimeout(() => {
          closeAlert();
        }, 1000);
      },
      error: err => {
        console.log(err);
        setTimeout(() => {
          closeAlert();
        }, 1000);
      }
    })
  }
  registrarUsuario() {
    const data = new FormData();
    data.append('nombre', this.usuarioForm.get('nombre')?.value);
    data.append('apellido', this.usuarioForm.get('apellido')?.value);
    data.append('user', this.usuarioForm.get('user')?.value);
    data.append('password', this.usuarioForm.get('password')?.value);
    data.append('idPerfil', this.usuarioForm.get('idPerfil')?.value);
    this.userServ.postUsuario(data).subscribe({
      next: (data) => {
        this.toastr.success(data.msg, 'Registrado');
        this.mostrarUsuario(false);
        this.cancelar();
      },
      error: err => {
        console.log(err);

      }
    })
  }
  editarUsuario() {
  const data = new FormData();
    data.append('nombre', this.usuarioEditForm.get('nombre')?.value);
    data.append('apellido', this.usuarioEditForm.get('apellido')?.value);
    data.append('user', this.usuarioEditForm.get('user')?.value);
    data.append('idPerfil', this.usuarioEditForm.get('idPerfil')?.value);
    const id = this.usuarioEditForm.get('idUsuario')?.value;
    this.userServ.putUsuario(data,id).subscribe({
      next: (data) => {
        this.toastr.success(data.msg, 'Editado');
        this.mostrarUsuario(false);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  editarUsuarioPassword(){
     const data = new FormData();
      data.append('password', this.usuarioPassForm.get('password')?.value);
      const id = this.usuarioPassForm.get('idUsuario')?.value;
      this.userServ.putUsuarioPass(data,id).subscribe({
      next: (data) => {
        this.toastr.success(data.msg, 'Editado');
        this.mostrarUsuario(false);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  eliminar(idMenu: number, estado: number) {
    Swal.fire({
      title: "Estas seguro?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userServ.deleteUsuario(estado, idMenu).subscribe({
          next: (data) => {
            this.mostrarUsuario(false);
            Swal.fire(data.msg, "", "success");
          },
          error: err => {
            console.log(err);
          }
        })
      }
    });
  }
  mostrarTipo(event: any) {
    this.estado = event.target.value;
    this.mostrarUsuario(true);

  }
  obtenerDatos(element: Usuario) {
    this.usuarioEditForm.setValue({
      nombre: element.nombre,
      apellido: element.apellido,
      user: element.user,
      idPerfil: element.idPerfil,
      idUsuario: element.idUsuario
    });
  }
  obtenerDatosPass(element: Usuario) {    
    this.usuarioPassForm.setValue({
      password: "",
      idUsuario: element.idUsuario
    });
  }
  cancelar() {
    this.usuarioForm.setValue({
      nombre: '',
      apellido: '',
      user: '',
      password: '',
      idPerfil: ''
    });
    this.usuarioEditForm.setValue({
      nombre: '',
      apellido: '',
      user: '',
      idPerfil: '',
      idUsuario: 0
    });
    this.usuarioPassForm.setValue({
      password: "",
      idUsuario: ""
    });
  }
}
