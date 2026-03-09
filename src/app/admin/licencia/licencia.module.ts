import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenciaComponent } from './licencia.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LicenciaRoutingModule } from './licencia.route';
import { TipoLicenciaComponent } from './tipo-licencia/tipo-licencia.component';
import { DetalleLicenciaComponent } from './detalle-licencia/detalle-licencia.component';



@NgModule({
  declarations: [
    TipoLicenciaComponent,
    DetalleLicenciaComponent,
    LicenciaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    LicenciaRoutingModule
  ]
})
export class LicenciaModule { }
