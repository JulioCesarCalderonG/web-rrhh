import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { TipodocumentoComponent } from './tipodocumento/tipodocumento.component';
import { GeneralComponent } from './general/general.component';
import { TipoLicenciaComponent } from './tipo-licencia/tipo-licencia.component';
import { TipoPersonalComponent } from './tipo-personal/tipo-personal.component';
import { DetalleLicenciaComponent } from './detalle-licencia/detalle-licencia.component';
import { HistorialComponent } from './historial/historial.component';
import { RegimenLaboralComponent } from './persona/regimen-laboral/regimen-laboral.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministradorRoutingModule } from './administrador/administrador.route';
import { PersonaRoutingModule } from './persona/persona.route';
import { ReporteRoutingModule } from './reporte/reporte.route';
import { RecordRoutingModule } from './record/record.route';



@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    TipodocumentoComponent,
    GeneralComponent,
    TipoLicenciaComponent,
    TipoPersonalComponent,
    DetalleLicenciaComponent,
    HistorialComponent,
    
  ],
  exports:[
    DashboardComponent,
    AdminComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AdministradorRoutingModule,
    PersonaRoutingModule,
    ReporteRoutingModule,
    RecordRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers:[
    provideSweetAlert2()
  ]
})
export class AdminModule { }
