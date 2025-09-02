import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { JefeComponent } from './jefe.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { JefeGuard } from '../guards/jefe.guard';


const routes: Routes = [
  {
    path: 'jefe',
    component: JefeComponent,
    children:[
      {path:'',component:SolicitudComponent}
    ],
    canActivateChild: [
      JefeGuard
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JefeRoutingModule {}
