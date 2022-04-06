import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs';
import { Cliente } from 'src/models/cliente';
import { BaseClass } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService extends BaseClass {


  constructor(private http: HttpClient) {
    super();
  }


  salvar(cliente: Cliente) {
    return this.http.get(this.API_URL + '/',)

  }


}
