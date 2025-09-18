export interface ResultMenuUsuario {
    ok:   boolean;
    msg:  string;
    menu: MenuUsuario[];
}

export interface MenuUsuario {
    nomMenu: string;
    titulo:  string;
    submenu: Submenu[];
}

export interface Submenu {
    subMenu: string;
    titulo:  string;
}
