import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { closeAlert } from 'src/app/alerts/close';
import { loadData } from 'src/app/alerts/load';
import { RegisterSubPerfil } from 'src/app/interfaces/register.subperfil';
import { Perfil, ResultPerfil } from 'src/app/interfaces/result.perfil';
import { ListMenu, ResultSubPerfil } from 'src/app/interfaces/result.subperfil';
import { PerfilSubmenuService } from 'src/app/servicios/perfil-submenu.service';
import { PerfilService } from 'src/app/servicios/perfil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  estado: number = 1;
  //TABLE
  displayedColumns: string[] = ['nombre', 'estado', 'submenu', 'acciones'];
  dataSource = new MatTableDataSource<Perfil>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  //Form
  perfilForm: FormGroup;
  perfilEditForm: FormGroup;
  //lista de opciones
  listSubInclude: ListMenu[] = [];
  listSubNotInclude: ListMenu[] = [];
  idPerfil:number=0;
  constructor(
    private perfServ: PerfilService,
    private subPerServ:PerfilSubmenuService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required]
    });
    this.perfilEditForm = this.fb.group({
      idPerfil: [0, Validators.required],
      nombre: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.mostrarPerfil(true);
  }
  mostrarPerfil(carga: boolean) {
    if (carga) {
      loadData('Cargando Informacion!', 'Espere....');
    }
    this.perfServ.getPerfil(this.estado).subscribe({
      next: (data: ResultPerfil) => {
        this.dataSource.data = data.perfil;
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
  registrarPerfil() {
    const data = new FormData();
    data.append('nombre', this.perfilForm.get('nombre')?.value);
    this.perfServ.postPerfil(data).subscribe({
      next: (data) => {
        this.toastr.success(data.msg, 'Registrado');
        this.mostrarPerfil(false);
        this.cancelar();
      },
      error: err => {
        console.log(err);

      }
    })
  }
  editarPerfil() {
    const data = new FormData();
    data.append('nombre', this.perfilEditForm.get('nombre')?.value);
    const id = this.perfilEditForm.get('idPerfil')?.value;
    this.perfServ.putPerfil(data, id).subscribe({
      next: (data) => {
        this.toastr.success(data.msg, 'Editado');
        this.mostrarPerfil(false);
      },
      error: err => {
        console.log(err);

      }
    })
  }
  eliminar(idPerfil: number, estado: number) {
    Swal.fire({
      title: "Estas seguro?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.perfServ.deletePerfil(estado, idPerfil).subscribe({
          next: (data) => {
            this.mostrarPerfil(false);
            Swal.fire(data.msg, "", "success");
          },
          error: err => {
            console.log(err);

          }
        })
      }
    });
  }
  mostrarInclude(id: number) {
    this.idPerfil=id;
    this.perfServ.getMenuInclude(id).subscribe({
      next: (data: ResultSubPerfil) => {
        this.listSubInclude = data.menu.map(menu => ({
          ...menu,
          submenu: menu.submenu.map(sub => ({ ...sub, selected: false }))
        }));
        console.log(this.listSubInclude);
        
      }, error: err => {
        console.log(err);

      }
    });
  }
  mostrarNotInclude(id: number) {
     this.idPerfil=id;
    this.perfServ.getMenuNotInclude(id).subscribe({
      next: (data: ResultSubPerfil) => {
        this.listSubNotInclude = data.menu.map(menu => ({
          ...menu,
          submenu: menu.submenu.map(sub => ({ ...sub, selected: false }))
        }));
      }, error: err => {
        console.log(err);

      }
    });
  }
  getSeleccionadosInclude() {
    const seleccionados:number[] = this.listSubInclude.map((menu: any) =>
      menu.submenu.filter((sub: any) => sub.selected)
      .map((sub: any) => sub.idSubMenu)
    ).reduce((acc: number[], ids: number[]) => acc.concat(ids), []);
    //validamos que haya seleccionado algun submenu
    if (seleccionados.length==0 || this.idPerfil==0) {
      this.toastr.warning("Debe seleccionar al menos un submenu","Aviso")
    }else{
      const data:RegisterSubPerfil={
        idPerfil:this.idPerfil,
        idSubMenu:seleccionados
      }
      this.subPerServ.deletePerfilSubMenu(data).subscribe({
        next:(data:any)=>{
          this.toastr.success(data.msg,"Eliminado");
          this.mostrarInclude(this.idPerfil);
          this.mostrarNotInclude(this.idPerfil);
        },
        error:err=>{
          console.log(err);
        }
      })
    }
    
  }
  getSeleccionadosNotInclude(){
    const seleccionados:number[] = this.listSubNotInclude.map((menu: any) =>
      menu.submenu.filter((sub: any) => sub.selected)
      .map((sub: any) => sub.idSubMenu)
    ).reduce((acc: number[], ids: number[]) => acc.concat(ids), []);
     //validamos que haya seleccionado algun submenu
    if (seleccionados.length==0 || this.idPerfil==0) {
      this.toastr.warning("Debe seleccionar al menos un submenu","Aviso")
    }else{
      const data:RegisterSubPerfil={
        idPerfil:this.idPerfil,
        idSubMenu:seleccionados
      }
      this.subPerServ.postPerfilSubMenu(data).subscribe({
        next:(data:any)=>{
          this.toastr.success(data.msg,"Registrado");
          this.mostrarInclude(this.idPerfil);
          this.mostrarNotInclude(this.idPerfil);
        },
        error:err=>{
          console.log(err);
        }
      })
    }
  }
  mostrarTipo(event: any) {
    this.estado = event.target.value;
    this.mostrarPerfil(true);

  }
  obtenerDatos(element: Perfil) {
    this.perfilEditForm.setValue({
      idPerfil: element.idPerfil,
      nombre: element.nombre,
    });
  }
  obtenerIdPerfil(idPerfil: number) {
    this.mostrarInclude(idPerfil);
    this.mostrarNotInclude(idPerfil);
  }
  cancelar() {
     this.idPerfil=0;
    this.perfilEditForm.setValue({
      idPerfil: 0,
      nombre: '',
    });
    this.perfilForm.setValue({
      nombre: '',
    });
  }
}
