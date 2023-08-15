import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { throwError } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBars } from "../util/snack-bars";
import { FiltroGeral } from "src/models/filtros/filtro-geral";

export class BaseClass{
  API_URL = 'http://localhost:8080';
  constructor( ){}

  Params(obj: FiltroGeral):HttpParams{


  return new HttpParams({
  fromObject: {
    page:0,
    totalItens:0,
    descricao: obj.descricaoGr ?? ""
  }
});


  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    console.error(error);
    
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do cliente
      errorMessage = error.error.message;
      
    } else {
      // Erro ocorreu no lado do servidor

      switch(error.status){

        case 403:{
          errorMessage = "Usuario não Autenticado !!!"
          break
        }
        case 404: {
          errorMessage = "Endereco especificado não encontrado !!!"
          break;
        }
        case 500: {
          errorMessage = "Ocorreu um erro ao acessar o servidor !!"
          break;
        }
      }
     
      // errorMessage = error.error ?? error.message;
      // errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;

    }
      return throwError(errorMessage);
  };


}
