import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioNaoAutenticadoGuard {
    constructor(
      private usuarioService: AuthenticationService) { }
    canActivate(){
      if (this.usuarioService.logado()) {

        return false;
      }
      return true;
    }
}
