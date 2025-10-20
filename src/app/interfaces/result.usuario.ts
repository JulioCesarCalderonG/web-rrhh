export interface ResultUsuario {
    ok:      boolean;
    msg:     string;
    usuario: Usuario[];
}

export interface Usuario {
    idUsuario: number;
    idPerfil:  number;
    nombre:    string;
    apellido:  string;
    user:      string;
    password:  string;
    estado:    boolean;
    createdAt: Date;
    updatedAt: Date;
    perfil:    Perfil;
}

export interface Perfil {
    idPerfil: number;
    nombre:   string;
}
