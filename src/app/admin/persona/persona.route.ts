import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PersonaComponent } from './persona.component';
import { PersonalComponent } from './personal/personal.component';
import { AreaComponent } from './area/area.component';
import { CargoComponent } from './cargo/cargo.component';
import { DependenciaComponent } from './dependencia/dependencia.component';
import { OrganoComponent } from './organo/organo.component';
import { SedeComponent } from './sede/sede.component';
import { RegimenLaboralComponent } from './regimen-laboral/regimen-laboral.component';


const routes: Routes = [
    { 
        path: '', 
        component: PersonaComponent,
        children:[
            {path:'personal',component:PersonalComponent},
            {path:'area',component:AreaComponent},
            {path:'cargo',component:CargoComponent},
            {path:'depedencia',component:DependenciaComponent},
            {path:'organo',component:OrganoComponent},
            {path:'sede',component:SedeComponent},
            {path:'regimen-laboral',component:RegimenLaboralComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonaRoutingModule {}
