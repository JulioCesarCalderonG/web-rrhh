import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DocumentoComponent } from './documento.component';
import { TipodocumentoComponent } from './tipodocumento/tipodocumento.component';



const routes: Routes = [
    { 
        path: '', 
        component: DocumentoComponent,
        children:[
            {path:'tipodocumento',component:TipodocumentoComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentoRoutingModule {}
