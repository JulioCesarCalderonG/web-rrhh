import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentoComponent } from './documento.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentoRoutingModule } from './documento.route';
import { TipodocumentoComponent } from './tipodocumento/tipodocumento.component';



@NgModule({
  declarations: [
    TipodocumentoComponent,
    DocumentoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    DocumentoRoutingModule
  ]
})
export class DocumentoModule { }
