import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GeneralesComponent } from './generales.component';
import { GeneralComponent } from './general/general.component';


const routes: Routes = [
    { 
        path: '', 
        component: GeneralesComponent,
        children:[
            {path:'general',component:GeneralComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeneralesRoutingModule {}