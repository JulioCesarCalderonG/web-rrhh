export interface ResultMenu {
    ok:   boolean;
    msg:  string;
    menu: Menu[];
}

export interface Menu {
    idMenu:    number;
    nomMenu:   string;
    titulo:    string;
    estado:    boolean;
    createdAt: Date | null;
    updatedAt: Date;
}
