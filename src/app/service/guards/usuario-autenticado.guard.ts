import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard {
    constructor(
      private usuarioService: AuthenticationService) { }
    canActivate(){
      if (this.usuarioService.logado()) {
        return true;
      }
      
      return false;
    }
}
