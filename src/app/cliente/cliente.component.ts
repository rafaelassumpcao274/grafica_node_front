import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { Cliente } from 'src/models/cliente';
import { Paginator } from 'src/models/Paginator';
import { ClienteService } from '../service/cliente.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  loading = false;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  listaEmpresas:Cliente[] = []
  dataSource = ELEMENT_DATA;
  teste :MatPaginator | undefined;

   pagina:Paginator = new Paginator();
  constructor(private service: ClienteService) { }

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


    this.loading = true
    this.service.listarEmpresas(this.pagina).subscribe((obj) =>{
      this.listaEmpresas = obj.lista as Cliente[];
      this.pagina = obj;
      this.loading = false;
    })
  }



}

