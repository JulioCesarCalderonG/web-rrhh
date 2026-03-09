import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DatosComponent } from './datos.component';
import { AreaComponent } from './area/area.component';
import { CargoComponent } from './cargo/cargo.component';
import { DependenciaComponent } from './dependencia/dependencia.component';
import { OrganoComponent } from './organo/organo.component';
import { SedeComponent } from './sede/sede.component';


const routes: Routes = [
    { 
        path: '', 
        component: DatosComponent,
        children:[
            {path:'area',component:AreaComponent},
            {path:'cargo',component:CargoComponent},
            {path:'unidad',component:DependenciaComponent},
            {path:'organo',component:OrganoComponent},
            {path:'sede',component:SedeComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DatosRoutingModule {}
