import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Cliente } from 'src/models/cliente';
import { ListaOrdemDeServico } from 'src/models/listaOrdemServico';
import { BaseClass } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseClass {


  constructor(private httpClient: HttpClient) {
    super();
  }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  listarTodosProdutos() {
    this.httpClient.get<Cliente>(`${this.API_URL}/`)
      .subscribe(resultado => console.log(resultado));
  }

  listarClientePorId(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.API_URL + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  // alterar rota para post clientes padrao
  salvar(cliente: Cliente): Observable<Cliente> {

    return this.httpClient.post<Cliente>(this.API_URL+'/empresa/criar',cliente,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

}
