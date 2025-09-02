import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConsultaComponent } from './consulta.component';



const routes: Routes = [
 {
  path:'consulta',
  component:ConsultaComponent,
  children:[
    {path:'',component:ConsultaComponent}
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule {}
