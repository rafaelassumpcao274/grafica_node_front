import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ces',
  templateUrl: './ces.component.html',
  styleUrls: ['./ces.component.scss']
})
export class CesComponent implements OnInit {

  meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
  mes:number= 0;
  constructor() { }

  ngOnInit(): void {

  }


mesEscolhido(obj:String){
  let teste =  this.meses.findIndex(item=>{ return item === obj})
  console.log(teste);
  this.mes = this.meses.findIndex(item=>{ return item === obj}) +1;
}

}
