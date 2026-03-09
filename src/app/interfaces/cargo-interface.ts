export interface ResultCargo {
    ok:             boolean;
    msg:            string;
    totalRegistros: number;
    totalPaginas:   number;
    paginaActual:   number;
    resp:           Cargo[];
}

export interface Cargo {
    id:               number;
    descripcion:      string;
    id_tipo_personal: number;
    estado:           number;
    TipoPersonal:     TipoPersonal;
}

export interface TipoPersonal {
    id:     number;
    titulo: Titulo;
    estado: number;
}

export enum Titulo {
    Funcionarios = "FUNCIONARIOS",
    PersonalAdministrativo = "PERSONAL ADMINISTRATIVO",
    PersonalJurisdiccional = "PERSONAL JURISDICCIONAL",
}
