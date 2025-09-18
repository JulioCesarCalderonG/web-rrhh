import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReporteComponent } from './reporte.component';
import { ReporteLicenciasComponent } from './reporte-licencias/reporte-licencias.component';
import { ReporteVacacionalComponent } from './reporte-vacacional/reporte-vacacional.component';
import { ReporteMeritoComponent } from './reporte-merito/reporte-merito.component';
import { ReporteLaboralComponent } from './reporte-laboral/reporte-laboral.component';
import { ReportesComponent } from './reportes/reportes.component';


const routes: Routes = [
    { 
        path: '', 
        component: ReporteComponent,
        children:[
            {path:'licencias',component:ReporteLicenciasComponent},
            {path:'vacaciones',component:ReporteVacacionalComponent},
            {path:'merito',component:ReporteMeritoComponent},
            {path:'laboral',component:ReporteLaboralComponent},
            {path:'reporte',component:ReportesComponent},
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
export class ReporteRoutingModule {}
