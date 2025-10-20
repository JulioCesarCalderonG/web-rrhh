import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AdministradorComponent } from './administrador.component';
import { AdministradorRoutingModule } from "./administrador.route";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioPerfilComponent } from './usuario-perfil/usuario-perfil.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
    declarations: [
        MenuComponent,
        SubMenuComponent,
        PerfilComponent,
        UsuarioComponent,
        UsuarioPerfilComponent,
        AdministradorComponent        
    ],
    imports: [
    CommonModule,
    RouterModule,
    AdministradorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule, 
    MatPaginatorModule,
    MatCardModule, 
    MatButtonModule,
    MatCheckboxModule,
        MatDividerModule
    ],
    exports: [     
    ],
    providers: [],
})
export class AdministradorModule {}