export interface ResultAuth {
    ok:      boolean;
    msg:     string;
    usuario: Usuario;
    token:   string;
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
}
