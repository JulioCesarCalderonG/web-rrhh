
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultaComponent } from './consulta.component';
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    ConsultaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[
    provideSweetAlert2()
  ]
})
export class ConsultaModule { }
