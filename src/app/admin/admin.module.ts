import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';

import { TipoPersonalComponent } from './tipo-personal/tipo-personal.component';
import { HistorialComponent } from './historial/historial.component';
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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    TipoPersonalComponent,
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
    MatTableModule, 
    MatPaginatorModule,
    MatCardModule, 
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule
  ],
  providers:[
    provideSweetAlert2()
  ]
})
export class AdminModule { }
