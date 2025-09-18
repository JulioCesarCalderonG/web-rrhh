import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteLaboralComponent } from './reporte-laboral/reporte-laboral.component';
import { ReporteLicenciasComponent } from './reporte-licencias/reporte-licencias.component';
import { ReporteVacacionalComponent } from './reporte-vacacional/reporte-vacacional.component';
import { ReporteMeritoComponent } from './reporte-merito/reporte-merito.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ReporteComponent } from './reporte.component';
import { ReporteRoutingModule } from './reporte.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ReporteLaboralComponent,
        ReporteLicenciasComponent,
        ReporteVacacionalComponent,
        ReporteMeritoComponent,
        ReportesComponent,
        ReporteComponent
    ],
    imports: [ 
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ReporteRoutingModule
    ],
    exports: [

    ],
    providers: [],
})
export class ReporteModule {}