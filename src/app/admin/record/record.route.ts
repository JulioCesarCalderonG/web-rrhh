import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecordComponent } from './record.component';
import { RecordLaboralComponent } from './record-laboral/record-laboral.component';
import { RecordLicenciasComponent } from './record-licencias/record-licencias.component';
import { RecordMeritoComponent } from './record-merito/record-merito.component';
import { RecordVacacionalComponent } from './record-vacacional/record-vacacional.component';


const routes: Routes = [
    { 
        path: '', 
        component: RecordComponent,
        children:[
            {path:'laboral',component:RecordLaboralComponent},
            {path:'licencia',component:RecordLicenciasComponent},
            {path:'merito',component:RecordMeritoComponent},
            {path:'vacacional',component:RecordVacacionalComponent},
        ] 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecordRoutingModule {}
