import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdministradorComponent } from './administrador.component';
import { MenuComponent } from './menu/menu.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioComponent } from './usuario/usuario.component';


const routes: Routes = [
    { 
        path: '', 
        component: AdministradorComponent,
        children:[
            {path:'menu',component:MenuComponent},
            {path:'submenu',component:SubMenuComponent},
            {path:'perfil',component:PerfilComponent},
            {path:'usuario',component:UsuarioComponent},
        ] 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministradorRoutingModule {}
