export interface ResultSubPerfil {
    ok:   boolean;
    msg:  string;
    menu: ListMenu[];
}

export interface ListMenu {
    idMenu:  number;
    nomMenu: string;
    submenu: ListSubmenu[];
}

export interface ListSubmenu {
    idSubMenu: number;
    subMenu:   string;
    selected?: boolean;
}
