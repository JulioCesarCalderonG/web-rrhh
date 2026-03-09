import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CargoService } from '../../../servicios/cargo.service';
import { TipoPersonalService } from '../../../servicios/tipo-personal.service';
import { Cargo, ResultCargo } from 'src/app/interfaces/cargo-interface';
import { TableMaterialComponent } from 'src/app/shared/table-material/table-material.component';
import { ColumnaTabla } from 'src/app/interfaces/columna-tabla';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css'],
})
export class CargoComponent implements OnInit {
  listCargo?: Array<any>;
  listTipoPersonal?: Array<any>;
  cargoForm: FormGroup;
  cargoEditarForm: FormGroup;
  ids?: string | number;
  estado: string = '1';
  carga: boolean = false;
  p: number = 1;

  //SHARED TABLA GENERAL
  columnasPersonal:ColumnaTabla[] = [
    { campo: 'descripcion', titulo: 'Descripcion' },
    { campo: 'TipoPersonal.titulo', titulo: 'Tipo personal' }
  ];
  page: number = 1;
  total:number = 0;
  pageSize:number = 30;

  @ViewChild(TableMaterialComponent) tabla!: TableMaterialComponent;

  constructor(
    private cargoService: CargoService,
    private tipoPersonal: TipoPersonalService,
    private fb: FormBuilder
  ) {
    this.cargoForm = this.fb.group({
      descripcion: ['', Validators.required],
      tipo_personal: ['', Validators.required],
    });
    this.cargoEditarForm = this.fb.group({
      descripcion: ['', Validators.required],
      tipo_personal: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarCargos(0, this.pageSize);
    this.mostrarTipoPersonal();
  }

  mostrarCargos(page:number,limit:number) {
    this.carga = true;
    if (this.carga) {
      Swal.fire({
        title: 'Cargando datos!',
        html: 'Por favor espere.',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }
    this.cargoService.getCargos(this.estado, page,limit).subscribe(
      (data:ResultCargo) => {
        //this.listCargo = data.resp;
        this.carga = false;
        this.total = data.totalRegistros;
        //this.pageSize = data.totalPaginas;
        this.tabla.setData(data.resp);
        if (!this.carga) {
          Swal.close();
        }
      },
      (error) => {
        this.carga = false;
        if (!this.carga) {
          Swal.close();
        }
        console.log(error);
      }
    );
  }

  editar(event:Cargo){
     this.cargoEditarForm.setValue({
          descripcion: event.descripcion,
          tipo_personal: event.id_tipo_personal,
        });
        this.ids = event.id;
  }
  eliminar(event:Cargo){
     Swal.fire({
      title: 'Estas seguro?',
      text: 'El cargo sera eliminado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargoService.deleteCargo(event.id, 0).subscribe(
          (data) => {
            this.mostrarCargos(0,this.pageSize);
            Swal.fire(
              'Elimimado',
              'Correcto',
              'success'
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
    
  }
  cambiarPagina(event:PageEvent){
  this.page = event.pageIndex + 1;
  this.pageSize = event.pageSize;
  console.log(this.page,this.pageSize);
  this.mostrarCargos(this.page,this.pageSize);  
  
  }

  mostrarTipoPersonal() {
    this.tipoPersonal.getTipoPersonal('1').subscribe(
      (data) => {
        this.listTipoPersonal = data.resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registrarCargo() {
    const formData = new FormData();
    formData.append('descripcion', this.cargoForm.get('descripcion')?.value);
    formData.append(
      'id_tipo_personal',
      this.cargoForm.get('tipo_personal')?.value
    );

    this.cargoService.postCargos(formData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Registrado!', 'Se registro el cargo con exito', 'success');
        this.mostrarCargos(0,this.pageSize);
        this.cancelar();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  modificarCargo() {
    const formData = new FormData();
    formData.append(
      'descripcion',
      this.cargoEditarForm.get('descripcion')?.value
    );
    formData.append(
      'id_tipo_personal',
      this.cargoEditarForm.get('tipo_personal')?.value
    );
    this.cargoService.putCargo(formData, this.ids!).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Editado!', 'Se edito el cargo con exito', 'success');
        this.mostrarCargos(0,this.pageSize);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminarCargo(id: number, estado: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text:
        estado === 1
          ? 'El cargo sera habilitado'
          : 'El cargo sera deshabilitado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargoService.deleteCargo(id, estado).subscribe(
          (data) => {
            this.mostrarCargos(0,this.pageSize);
            Swal.fire(
              estado === 1 ? 'Habilitado' : 'Deshabilitado',
              'Correcto',
              'success'
            );
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  mostrarCargoTipo(event: any) {
    console.log(event.target.value);
    this.estado = event.target.value;
    this.mostrarCargos(0,this.pageSize);
  }

  obtenerDatosId(id: number) {
    this.cargoService.getCargoId(id).subscribe(
      (data) => {
        console.log(data);

        this.cargoEditarForm.setValue({
          descripcion: data.resp.descripcion,
          tipo_personal: data.resp.id_tipo_personal,
        });
        this.ids = data.resp.id;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelar() {
    this.cargoForm.setValue({
      descripcion: '',
      tipo_personal: '',
    });
    this.cargoEditarForm.setValue({
      descripcion: '',
      tipo_personal: '',
    });
  }
}
