import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LicenciaComponent } from './licencia.component';
import { TipoLicenciaComponent } from './tipo-licencia/tipo-licencia.component';
import { DetalleLicenciaComponent } from './detalle-licencia/detalle-licencia.component';



const routes: Routes = [
    { 
        path: '', 
        component: LicenciaComponent,
        children:[
            {path:'tipolicencia',component:TipoLicenciaComponent},
            {path:'detallelicencia',component:DetalleLicenciaComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LicenciaRoutingModule {}
