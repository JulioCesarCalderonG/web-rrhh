import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AdminRoutingModule } from './admin/admin.routing';
import { AuthRoutingModule } from './auth/auth.routing';
import { ConsultaRoutingModule } from './consulta/consulta.routing';
import { PruebaRoutingModule } from './prueba/prueba.routing';
import { JefeRoutingModule } from './jefe/jefe.routing';




const routes: Routes=[
  {path:'**', component:NopagefoundComponent},
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AdminRoutingModule,
    AuthRoutingModule,
    ConsultaRoutingModule,
    PruebaRoutingModule,
    JefeRoutingModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
