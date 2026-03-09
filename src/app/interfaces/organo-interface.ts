export interface ResultOrgano {
  ok:             boolean;
  msg:            string;
  totalRegistros: number;
  totalPaginas:   number;
  paginaActual:   number;
  resp:           Organo[];
}

export interface Organo {
  id:      number;
  nombre:  string;
  sigla:   string;
  id_sede: number;
  estado:  number;
  Sede:    Sede;
}

export interface Sede {
  id:     number;
  nombre: string;
  estado: number;
}
