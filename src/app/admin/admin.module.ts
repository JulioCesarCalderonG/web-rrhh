import { NgModule } from '@angular/core';

import {RouterModule} from '@angular/router'



import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AdminComponent } from './admin.component';
import { AreaComponent } from './area/area.component';
import { CargoComponent } from './cargo/cargo.component';
import { DependenciaComponent } from './dependencia/dependencia.component';
import { TipodocumentoComponent } from './tipodocumento/tipodocumento.component';
import { PersonalComponent } from './personal/personal.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { GeneralComponent } from './general/general.component';
import { OrganoComponent } from './organo/organo.component';
import { SedeComponent } from './sede/sede.component';
import { RecordLaboralComponent } from './record-laboral/record-laboral.component';
import { ReportesComponent } from './reportes/reportes.component';
import { TipoLicenciaComponent } from './tipo-licencia/tipo-licencia.component';
import { TipoPersonalComponent } from './tipo-personal/tipo-personal.component';
import { DetalleLicenciaComponent } from './detalle-licencia/detalle-licencia.component';
import { RecordLicenciasComponent } from './record-licencias/record-licencias.component';
import { RecordVacacionalComponent } from './record-vacacional/record-vacacional.component';
import { RecordMeritoComponent } from './record-merito/record-merito.component';
import { ReporteLaboralComponent } from './reporte-laboral/reporte-laboral.component';
import { ReporteLicenciasComponent } from './reporte-licencias/reporte-licencias.component';
import { ReporteMeritoComponent } from './reporte-merito/reporte-merito.component';
import { HistorialComponent } from './historial/historial.component';
import { RegimenLaboralComponent } from './regimen-laboral/regimen-laboral.component';
import { ReporteVacacionalComponent } from './reporte-vacacional/reporte-vacacional.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    AdminComponent,
    AreaComponent,
    CargoComponent,
    DependenciaComponent,
    TipodocumentoComponent,
    PersonalComponent,
    AdministradorComponent,
    GeneralComponent,
    OrganoComponent,
    SedeComponent,
    RecordLaboralComponent,
    ReportesComponent,
    TipoLicenciaComponent,
    TipoPersonalComponent,
    DetalleLicenciaComponent,
    RecordLicenciasComponent,
    RecordVacacionalComponent,
    RecordMeritoComponent,
    ReporteLaboralComponent,
    ReporteLicenciasComponent,
    ReporteMeritoComponent,
    ReporteVacacionalComponent,
    RegimenLaboralComponent,
    HistorialComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers:[
    provideSweetAlert2()
  ]
})
export class AdminModule { }
