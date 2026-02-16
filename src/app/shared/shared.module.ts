import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BuscarPersonasComponent } from './buscar-personas/buscar-personas.component';
import { SidebarJefeComponent } from './sidebar-jefe/sidebar-jefe.component';
import { TableMaterialComponent } from './table-material/table-material.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    BuscarPersonasComponent,
    SidebarJefeComponent,
    TableMaterialComponent
  ],
  exports:[
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    BuscarPersonasComponent,
    SidebarJefeComponent,
    TableMaterialComponent,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatCardModule
]
})
export class SharedModule { }
