
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AreaComponent } from './area/area.component';
import { CargoComponent } from './cargo/cargo.component';
import { DependenciaComponent } from './dependencia/dependencia.component';
import { TipodocumentoComponent } from './tipodocumento/tipodocumento.component';
import { PersonalComponent } from './personal/personal.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { GeneralComponent } from './general/general.component';
import { OrganoComponent } from './organo/organo.component';
import { SedeComponent } from './sede/sede.component';
import { ReportesComponent } from './reportes/reportes.component';
import { TipoLicenciaComponent } from './tipo-licencia/tipo-licencia.component';
import { DetalleLicenciaComponent } from './detalle-licencia/detalle-licencia.component';
import { RecordLaboralComponent } from './record-laboral/record-laboral.component';
import { RecordLicenciasComponent } from './record-licencias/record-licencias.component';
import { RecordVacacionalComponent } from './record-vacacional/record-vacacional.component';
import { RecordMeritoComponent } from './record-merito/record-merito.component';
import { HistorialComponent } from './historial/historial.component';
import { RegimenLaboralComponent } from './regimen-laboral/regimen-laboral.component';
import { ReporteVacacionalComponent } from './reporte-vacacional/reporte-vacacional.component';
import { ReporteMeritoComponent } from './reporte-merito/reporte-merito.component';
import { ReporteLicenciasComponent } from './reporte-licencias/reporte-licencias.component';
import { ReporteLaboralComponent } from './reporte-laboral/reporte-laboral.component';
import { AdministradorGuard } from '../guards/administrador.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'grafica1', component: Grafica1Component },
            { path: 'area', component: AreaComponent },
            { path: 'cargo', component: CargoComponent },
            { path: 'unidadorganica', component: DependenciaComponent },
            { path: 'tipodocumento', component: TipodocumentoComponent },
            { path: 'personal', component: PersonalComponent },
            { path: 'administrador', component: AdministradorComponent },
            { path: 'general', component: GeneralComponent },
            { path: 'organojurisdiccional', component: OrganoComponent },
            { path: 'sede', component: SedeComponent },
            { path: 'reporte-personal/:id/:personal', component: ReportesComponent },
            { path: 'tipo-licencia', component: TipoLicenciaComponent},
            { path: 'detalle-licencia', component: DetalleLicenciaComponent},
            { path: 'record-laboral', component: RecordLaboralComponent },
            { path: 'record-licencias', component:RecordLicenciasComponent},
            { path: 'record-vacacional', component:RecordVacacionalComponent},
            { path: 'record-merito',component:RecordMeritoComponent},
            { path: 'reporte-laboral/:id/:personal',component:ReporteLaboralComponent},
            { path: 'reporte-licencias/:id/:personal',component:ReporteLicenciasComponent},
            { path: 'reporte-merito/:id/:personal',component:ReporteMeritoComponent},
            { path: 'reporte-vacacional/:id/:personal', component:ReporteVacacionalComponent},
            { path: 'regimen-laboral',component:RegimenLaboralComponent},
            { path: 'historial', component:HistorialComponent},
        ],
        canActivateChild: [
          AdministradorGuard
        ]
    },
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
