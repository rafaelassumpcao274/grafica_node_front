import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { Cliente } from 'src/models/cliente';
import { FiltroCliente } from 'src/models/filtros/filtro-cliente';
import { Paginator } from 'src/models/Paginator';
import { ClienteService } from '../service/cliente.service';
import { SnackBars } from '../util/snack-bars';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  loading = false;
  displayedColumns: string[] = ['position', 'name', 'dataCadastro', 'editar'];
  listaEmpresas:Cliente[] = []

  filtroCliente:FiltroCliente = new FiltroCliente();

  info:SnackBars = new SnackBars(this.snackBar);
   pagina:Paginator = new Paginator();
  constructor(private service: ClienteService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.listar()
  }

  listar(event?:any){

    if(event){
      this.pagina.currentPage = event.pageIndex
      this.pagina.lista = this.listaEmpresas
      this.pagina.totalItems = event.length
      this.pagina.totalPages = event.pageSize
    }else{
      this.pagina.currentPage = 0
    }
    this.filtroCliente.paginacao= this.pagina

    this.loading = true
    this.service.listar(this.filtroCliente).subscribe((obj) =>{
      this.listaEmpresas = obj.lista as Cliente[];
      this.pagina = obj;
      this.loading = false;
    }, (error) =>{
      this.loading = false;
      this.info.showMessageError(error)

    })
  }



}

