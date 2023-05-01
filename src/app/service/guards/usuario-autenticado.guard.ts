import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate{
    constructor(
      private usuarioService: AuthenticationService,
      private router: Router) { }
    canActivate(){
      if (this.usuarioService.logado()) {
        return true;
      }
      return false;
    }
}