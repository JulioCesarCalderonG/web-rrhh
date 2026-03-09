import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal/personal.component';
import { PersonaComponent } from './persona.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonaRoutingModule } from './persona.route';
import { RouterModule } from '@angular/router';

import { RegimenLaboralComponent } from './regimen-laboral/regimen-laboral.component';

@NgModule({
    declarations: [
        PersonalComponent,
        RegimenLaboralComponent,
        PersonaComponent
    ],
    imports: [ 
        CommonModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        PersonaRoutingModule
    ],
    exports: [

    ],
    providers: [],
})
export class PersonaModule {}