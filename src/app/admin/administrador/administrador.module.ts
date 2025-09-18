import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AdministradorComponent } from './administrador.component';
import { AdministradorRoutingModule } from "./administrador.route";
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        MenuComponent,
        SubMenuComponent,
        PerfilComponent,
        UsuarioComponent,
        AdministradorComponent
    ],
    imports: [
    CommonModule,
    RouterModule,
    AdministradorRoutingModule
    ],
    exports: [     
    ],
    providers: [],
})
export class AdministradorModule {}