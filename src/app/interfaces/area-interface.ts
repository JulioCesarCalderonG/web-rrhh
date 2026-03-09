export interface ResultArea {
    ok:             boolean;
    msg:            string;
    totalRegistros: number;
    totalPaginas:   number;
    paginaActual:   number;
    resp:           Resp[];
}

export interface Resp {
    id:                 number;
    nombre:             string;
    sigla:              string;
    id_unidad_organica: number;
    estado:             number;
    UnidadOrganica:     UnidadOrganica;
}

export interface UnidadOrganica {
    id:        number;
    nombre:    string;
    sigla:     string;
    id_organo: number;
    estado:    number;
}
