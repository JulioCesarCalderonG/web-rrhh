import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { closeAlert } from 'src/app/alerts/close';
import { loadData } from 'src/app/alerts/load';
import { Menu, ResultMenu } from 'src/app/interfaces/result.menu';
import { ResultSubMenu, SubMenu } from 'src/app/interfaces/result.submenu';
import { MenuService } from 'src/app/servicios/menu.service';
import { SubMenuService } from 'src/app/servicios/sub-menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css']
})
export class SubMenuComponent implements OnInit {
  estado: number = 1;
  //LISTADO MENU
  listMenu: Menu[] = [];
  //TABLE
  displayedColumns: string[] = ['titulo', 'submenu', 'nommenu', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<SubMenu>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  //Form
  subMenuForm: FormGroup;
  subMenuEditForm: FormGroup;
  constructor(
    private subMenServ: SubMenuService,
    private menServ: MenuService,
    private fb: FormBuilder,
    private toastr:ToastrService
  ) {
    this.subMenuForm = this.fb.group({
      idMenu: ["", Validators.required],
      subMenu: ['', Validators.required],
      titulo: ['', Validators.required]
    });
    this.subMenuEditForm = this.fb.group({
      idSubMenu: [0, Validators.required],
      idMenu: ["0", Validators.required],
      subMenu: ['', Validators.required],
      titulo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.mostrarMenus(false);
    this.mostrarSubMenus(true);
  }
  mostrarMenus(carga: boolean) {
    if (carga) {
      loadData('Cargando Informacion!', 'Espere....');
    }
    this.menServ.getMenu(this.estado).subscribe({
      next: (data: ResultMenu) => {
        this.listMenu = data.menu;
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
  mostrarSubMenus(carga: boolean) {
    if (carga) {
      loadData('Cargando Informacion!', 'Espere....');
    }
    this.subMenServ.getSubMenu(this.estado).subscribe({
      next: (data: ResultSubMenu) => {
        this.dataSource.data = data.subMenu;
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
  registrarSubMenu() {
    const data = new FormData();
    data.append('subMenu', this.subMenuForm.get('subMenu')?.value);
    data.append('titulo', this.subMenuForm.get('titulo')?.value);
    data.append('idMenu', this.subMenuForm.get('idMenu')?.value);
    this.subMenServ.postSubMenu(data).subscribe({
      next: (data) => {
        this.toastr.success(data.msg,'Registrado');
        this.mostrarSubMenus(false);
        this.cancelar();
      },
      error: err => {
        console.log(err);

      }
    })
  }
  editarSubMenu() {
    const data = new FormData();
    data.append('subMenu', this.subMenuEditForm.get('subMenu')?.value);
    data.append('titulo', this.subMenuEditForm.get('titulo')?.value);
    data.append('idMenu', this.subMenuEditForm.get('idMenu')?.value);
    const id = this.subMenuEditForm.get('idSubMenu')?.value;
    this.subMenServ.putSubMenu(data, id).subscribe({
      next: (data:any) => {
        this.mostrarSubMenus(false);
        this.toastr.success(data.msg,'Editado');
      },
      error: err => {
        console.log(err);
      }
    })
  }

  mostrarTipo(event: any) {
    this.estado = event.target.value;
    this.mostrarSubMenus(true);
  }
  obtenerDatos(element: SubMenu) {
    this.subMenuEditForm.setValue({
      idMenu: element.idMenu,
      subMenu: element.subMenu,
      titulo: element.titulo,
      idSubMenu: element.idSubMenu
    });
  }
  eliminar(idSubMenu: number, estado: number) {
    Swal.fire({
      title: "Estas seguro?",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.subMenServ.deleteSubMenu(estado, idSubMenu).subscribe({
          next: (data) => {
            this.mostrarSubMenus(false);
            Swal.fire(data.msg, "", "success");
          },
          error: err => {
            console.log(err);
          }
        })
      }
    });
  }
  cancelar() {
    this.subMenuForm.setValue({
      idMenu: 0,
      subMenu: '',
      titulo: ''
    });
    this.subMenuEditForm.setValue({
      idMenu: 0,
      subMenu: '',
      titulo: '',
      idSubMenu: 0
    });
  }
}
