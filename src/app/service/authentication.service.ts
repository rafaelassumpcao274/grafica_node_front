import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, Observable, pipe, retry, tap, throwError } from 'rxjs';
import { User } from 'src/models/user';
import { BaseClass } from './base.service';
import { DateUtils } from '../util/dateUtils';
import { Token } from 'src/models/token';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseClass {

  storage:LocalStorageService =  new LocalStorageService(window.sessionStorage)
  constructor(private httpClient: HttpClient,
    private router: Router,
    ) {
    super();

    this.storage = this.setStorage(localStorage.getItem('token') !== null)
  }

  local:boolean = false;
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

  setStorage(rememberMe:boolean,clear?:boolean){
    if(clear){
      this.storage.clear()
    }
    if(rememberMe){
      return new LocalStorageService(window.localStorage)
    }
    return new LocalStorageService(window.sessionStorage)
 
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

      this.storage = this.setStorage(usuario.rememberMe,true)

      if(!resposta.accessToken) return;
      this.storage.set('token', resposta);
      this.storage.set('nomeUsuario',resposta.username);
      }));


  }

  deslogar() {
    this.storage.clear();

}
 obterUsuarioLogado(): User {
  return this.storage.get('usuario') ?? ""
}

obterNomeUsuarioLogado(): string {
  return this.storage.get('nomeUsuario') ?? '';
}
//  obterIdUsuarioLogado(): string {
//   return this.storage.getItem('usuario')
//     ? (JSON.parse(atob(this.storage.getItem('usuario'))) as User).id
//     : null;
// }
obterTokenUsuario() {

  if(this.storage.get('token')){
    let token =  this.storage.get('token') as Token
    if(token.expiration < new Date()){
      return token.accessToken;
    }
    let dataUtil:DateUtils = new DateUtils();
    
    if(dataUtil.addHora(token.expiration,1) > new Date()){
      return token.refreshToken
  
    }
    this.deslogar()
  }
  return null;
}



 logado(): boolean {
  return this.storage.get('token') ? true : false;
}


}

