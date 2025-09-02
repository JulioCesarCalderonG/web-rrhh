import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JefeComponent } from './jefe.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    JefeComponent,
    SolicitudComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class JefeModule { }
