import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PruebaComponent } from './prueba.component';


const routes: Routes = [
  {
    path:'prueba',
    component:PruebaComponent,
    children:[
      {path:'',component:PruebaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PruebaRoutingModule {}
