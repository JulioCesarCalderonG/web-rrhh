import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralesComponent } from './generales.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralesRoutingModule } from './generales.route';
import { GeneralComponent } from './general/general.component';



@NgModule({
  declarations: [
    GeneralComponent,
    GeneralesComponent
  ],
  imports: [
   CommonModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        GeneralesRoutingModule
  ]
})
export class GeneralesModule { }
