import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from 'src/models/user';
import { BaseClass } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseClass {


  constructor(private httpClient: HttpClient,
    ) {
    super();
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  obterUsuario(user: User): Observable<User> {

    return this.httpClient.get<User>(this.API_URL+'/',this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // alterar rota para post clientes padrao
  logar(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL+'/',user,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  registrar(user: User): Observable<User> {
    console.log(user)
    return this.httpClient.post<User>(this.API_URL+'/register',user,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}

