import { Observable } from "rxjs";
import { FiltroGeral } from "src/models/filtros/filtro-geral";

export interface Iservice {

    listarAutoComplete<T>(evento:any): Observable<Array<T>>
}

