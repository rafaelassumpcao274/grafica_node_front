import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { SnackBars } from "../util/snack-bars";

export class BaseClass{
  API_URL = 'http://localhost:8080';
  constructor( ){}



  handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do cliente
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = error.error ?? error.message;
      // errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;

    }
        console.error(errorMessage);
    return throwError(error);
  };

}
