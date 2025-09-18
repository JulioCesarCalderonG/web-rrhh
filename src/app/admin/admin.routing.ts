
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AreaComponent } from './persona/area/area.component';
import { CargoComponent } from './persona/cargo/cargo.component';
import { DependenciaComponent } from './persona/dependencia/dependencia.component';
import { TipodocumentoComponent } from './tipodocumento/tipodocumento.component';
import { GeneralComponent } from './general/general.component';
import { TipoLicenciaComponent } from './tipo-licencia/tipo-licencia.component';
import { DetalleLicenciaComponent } from './detalle-licencia/detalle-licencia.component';
import { HistorialComponent } from './historial/historial.component';
import { RegimenLaboralComponent } from './persona/regimen-laboral/regimen-laboral.component';
import { AdministradorGuard } from '../guards/administrador.guard';
import { AdminComponent } from './admin.component';
import { AdministradorComponent } from './administrador/administrador.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: '', component: DashboardComponent },
             {
                    path: 'administrador',
                    loadChildren: () =>
                    import('./administrador/administrador.module').then(m => m.AdministradorModule)
                },
            {
                    path: 'personal',
                    loadChildren: () =>
                    import('./persona/persona.module').then(m => m.PersonaModule)
                },
                {
                    path: 'reporte',
                    loadChildren: () =>
                    import('./reporte/reporte.module').then(m => m.ReporteModule)
                },
                {
                    path: 'record',
                    loadChildren: () =>
                    import('./record/record.module').then(m => m.RecordModule)
                },
                { path: 'general', component: GeneralComponent },
                { path: 'detalle-licencia', component: DetalleLicenciaComponent},
                { path: 'tipodocumento', component: TipodocumentoComponent },
            /* { path: 'progress', component: ProgressComponent },
            { path: 'grafica1', component: Grafica1Component },
            { path: 'area', component: AreaComponent },
            { path: 'cargo', component: CargoComponent },
            { path: 'unidadorganica', component: DependenciaComponent },
            { path: 'tipodocumento', component: TipodocumentoComponent },
            { path: 'personal', component: PersonalComponent },
            //{ path: 'administrador', component: AdministradorComponent },
            
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
            { path: 'historial', component:HistorialComponent}, */
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
