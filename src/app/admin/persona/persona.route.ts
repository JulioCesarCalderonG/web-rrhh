import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PersonaComponent } from './persona.component';
import { PersonalComponent } from './personal/personal.component';
import { RegimenLaboralComponent } from './regimen-laboral/regimen-laboral.component';


const routes: Routes = [
    { 
        path: '', 
        component: PersonaComponent,
        children:[
            {path:'personal',component:PersonalComponent},
            {path:'regimen',component:RegimenLaboralComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonaRoutingModule {}
