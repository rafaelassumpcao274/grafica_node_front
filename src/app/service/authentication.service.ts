import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, Observable, pipe, retry, tap, throwError } from 'rxjs';
import { User } from 'src/models/user';
import { BaseClass } from './base.service';
import { Token } from 'src/models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseClass {


  constructor(private httpClient: HttpClient,
    private router: Router,
    ) {
    super();
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  obterUsuario(user: User): Observable<User> {

    return this.httpClient.get<User>(this.API_URL+'/login',this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  registrar(user: User): Observable<User> {
    return this.httpClient.post<User>(this.API_URL+'/login/registrar',user,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  logar(usuario: User) : Observable<any> {
    return this.httpClient.post<Token>(this.API_URL+'/auth/signin', usuario).pipe(
      tap((resposta:Token) => {
        if(!resposta.accessToken) return;
        localStorage.setItem('token', btoa(JSON.stringify(resposta)));
        localStorage.setItem('nomeUsuario',resposta.username);
      }));

  }

  deslogar() {
    localStorage.clear();

}
 obterUsuarioLogado(): User {
  return localStorage.getItem('usuario')
    ? JSON.parse(atob(localStorage.getItem('usuario') ?? ''))
    : '';
}

obterNomeUsuarioLogado(): string {
  return localStorage.getItem('nomeUsuario') ?? '';
}
//  obterIdUsuarioLogado(): string {
//   return localStorage.getItem('usuario')
//     ? (JSON.parse(atob(localStorage.getItem('usuario'))) as User).id
//     : null;
// }
obterTokenUsuario(): string {
  if(localStorage.getItem('token')){
    let token =  JSON.parse(atob(localStorage.getItem('token')?? '')) as Token
    return token.accessToken;
  }
  return ''
}


 logado(): boolean {
  return localStorage.getItem('token') ? true : false;
}
}

