import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordLaboralComponent } from './record-laboral/record-laboral.component';
import { RecordMeritoComponent } from './record-merito/record-merito.component';
import { RecordLicenciasComponent } from './record-licencias/record-licencias.component';
import { RecordComponent } from './record.component';
import { RecordRoutingModule } from './record.route';
import { RecordVacacionalComponent } from './record-vacacional/record-vacacional.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        RecordLaboralComponent,
        RecordVacacionalComponent,
        RecordMeritoComponent,
        RecordLicenciasComponent,
        RecordComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        RecordRoutingModule
    ],
    exports: [],
    providers: [],
})
export class RecordModule { }