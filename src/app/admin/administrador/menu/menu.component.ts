import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { closeAlert } from 'src/app/alerts/close';
import { loadData } from 'src/app/alerts/load';
import { Menu, ResultMenu } from 'src/app/interfaces/result.menu';
import { MenuService } from 'src/app/servicios/menu.service';
import Swal from 'sweetalert2';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  estado: number = 1;
  //TABLE
  displayedColumns: string[] = ['titulo', 'nombre', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Menu>([]);
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  //Form
  menuForm: FormGroup;
  menuEditForm: FormGroup;
  idEliminar: number = 0;

  //FIN
  constructor(
    private menServ: MenuService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.menuForm = this.fb.group({
      nomMenu: ['', Validators.required],
      titulo: ['', Validators.required]
    });
    this.menuEditForm = this.fb.group({
      idMenu: [0, Validators.required],
      nomMenu: ['', Validators.required],
      titulo: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.mostrarMenus(true);
  }
  mostrarMenus(carga: boolean) {
    if (carga) {
      loadData('Cargando Informacion!', 'Espere....');
    }
    this.menServ.getMenu(this.estado).subscribe({
      next: (data: ResultMenu) => {
        this.dataSource.data = data.menu;
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
  registrarMenu() {
    const data = new FormData();
    data.append('nomMenu', this.menuForm.get('nomMenu')?.value);
    data.append('titulo', this.menuForm.get('titulo')?.value);
    this.menServ.postMenu(data).subscribe({
      next: (data) => {
        this.toastr.success(data.msg, 'Registrado');
        this.mostrarMenus(false);
        this.cancelar();
      },
      error: err => {
        console.log(err);

      }
    })
  }
  editarMenu() {
    const data = new FormData();
    data.append('nomMenu', this.menuEditForm.get('nomMenu')?.value);
    data.append('titulo', this.menuEditForm.get('titulo')?.value);
    const id = this.menuEditForm.get('idMenu')?.value;
    this.menServ.putMenu(data, id).subscribe({
      next: (data) => {
        this.mostrarMenus(false);
        this.toastr.success(data.msg, 'Editado');
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
        this.menServ.deleteMenu(estado, idMenu).subscribe({
          next: (data) => {
            this.mostrarMenus(false);
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
    this.mostrarMenus(true);

  }

  obtenerDatos(element: Menu) {
    this.menuEditForm.setValue({
      idMenu: element.idMenu,
      nomMenu: element.nomMenu,
      titulo: element.titulo
    });
  }

  cancelar() {
    this.menuEditForm.setValue({
      idMenu: 0,
      nomMenu: '',
      titulo: ''
    });
    this.menuForm.setValue({
      nomMenu: '',
      titulo: ''
    });
    this.idEliminar = 0;
  }
}
