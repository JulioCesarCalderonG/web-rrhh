export interface ResultSubMenu {
    ok:      boolean;
    msg:     string;
    subMenu: SubMenu[];
}

export interface SubMenu {
    idSubMenu: number;
    idMenu:    number;
    subMenu:   string;
    titulo:    string;
    estado:    boolean;
    createdAt: Date | null;
    updatedAt: Date | null;
    menu:      Menu;
}

export interface Menu {
    idMenu:  number;
    nomMenu: string;
}
