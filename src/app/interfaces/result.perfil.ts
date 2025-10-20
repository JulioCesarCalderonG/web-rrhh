export interface ResultPerfil {
    ok:     boolean;
    msg:    string;
    perfil: Perfil[];
}

export interface Perfil {
    idPerfil:  number;
    nombre:    string;
    estado:    boolean;
    createdAt: Date;
    updatedAt: Date;
}
