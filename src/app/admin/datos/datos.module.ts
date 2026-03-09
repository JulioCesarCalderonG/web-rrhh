import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './datos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AreaComponent } from './area/area.component';
import { DependenciaComponent } from './dependencia/dependencia.component';
import { CargoComponent } from './cargo/cargo.component';
import { SedeComponent } from './sede/sede.component';
import { OrganoComponent } from './organo/organo.component';
import { DatosRoutingModule } from './datos.route';



@NgModule({
  declarations: [
    AreaComponent,
    DependenciaComponent,
    CargoComponent,
    SedeComponent,
    OrganoComponent,
    DatosComponent
  ],
  imports: [
     CommonModule,
     RouterModule,
     SharedModule,
     ReactiveFormsModule,
     FormsModule,
     DatosRoutingModule
  ]
})
export class DatosModule { }
