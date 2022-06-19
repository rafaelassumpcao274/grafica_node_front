import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Formato } from 'src/models/formato';
import { OrdemDeServico } from 'src/models/ordem-de-servico';
import { Paginator } from 'src/models/Paginator';
import { FormatoService } from '../service/formato.service';
import { OrdemServicoService } from '../service/ordem-servico.service';
import { SnackBars } from '../util/snack-bars';

@Component({
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.component.html',
  styleUrls: ['./ordem-servico.component.scss']
})
export class OrdemServicoComponent implements OnInit {


  loading:boolean = false;
  listaOrdemServico:OrdemDeServico[] =[];
  listaFormatos: Formato[] = [];
  

  displayedColumns: string[] = ['position','empresa', 'name', 'dataCadastro', 'editar'];

  constructor(private service: OrdemServicoService,
    private serviceFormato: FormatoService,
    private snackBar: MatSnackBar) { }

    info:SnackBars = new SnackBars(this.snackBar);
    pagina:Paginator = new Paginator();


   ngOnInit(): void {

     this.listar()
   }

   listar(event?:any){

     if(event){
       this.pagina.currentPage = event.pageIndex
       this.pagina.lista = this.listaOrdemServico
       this.pagina.totalItems = event.length
       this.pagina.totalPages = event.pageSize
     }else{
       this.pagina.currentPage = 0
     }


     this.loading = true
     this.service.listarPaginado(this.pagina).subscribe((obj) =>{
       this.listaOrdemServico = obj.lista as OrdemDeServico[];
       this.pagina = obj;
       this.loading = false;
     }, (error) =>{
       this.loading = false;
       this.info.showMessageError(error)

     })
   }

   obterformato(){
    this.loading = true
    this.serviceFormato.listarPaginado(new Paginator()).subscribe((obj)=>{
      this.listaFormatos = obj.lista as Formato[];
      this.loading = false;
    },(error)=>{
      this.loading = false;
      this.info.showMessageError(error)
    });
   }

}
