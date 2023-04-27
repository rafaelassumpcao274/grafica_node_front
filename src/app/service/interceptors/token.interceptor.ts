import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { AuthenticationService } from '../authentication.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private usuarioService : AuthenticationService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.usuarioService.obterTokenUsuario;
        const requestUrl: Array<any> = request.url.split('/');
        // const apiUrl: Array<any> = "http://127.0.0.1:3000/".split('/');
        const apiUrl: Array<any> = "http://127.0.0.1:8080/".split('/');

        if (token && requestUrl[2] === apiUrl[2]) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    token: `${token}`
                }
            });
            return next.handle(request).pipe(
              retry(2),
           );
        }
        else {
            return next.handle(request);
        }
    }
}
