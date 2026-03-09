export interface PersonalResult {
    ok:             boolean;
    msg:            string;
    totalRegistros: number;
    totalPaginas:   number;
    paginaActual:   number;
    resp:           Personal[];
}

export interface Personal {
    id:           number;
    dni:          string;
    nombre:       string;
    apellido:     string;
    escalafon:    string;
    fecha_inicio: Date;
    estado:       number;
}
