import { Component, Input, OnInit } from '@angular/core';
import { ListaOrdemDeServico } from 'src/models/listaOrdemServico';
import { TabelaCesService } from '../../service/tabela-ces.service';

@Component({
  selector: 'app-tabela-ces',
  templateUrl: './tabela-ces.component.html',
  styleUrls: ['./tabela-ces.component.scss']
})
export class TabelaCesComponent implements OnInit {

  @Input()
  mesEscolhido!: number;

  listaOrdemServicos!: ListaOrdemDeServico;

  constructor(private service: TabelaCesService) {}

  ngOnInit(): void {
    this.service.listarCesPorMes(this.mesEscolhido).subscribe((lista: ListaOrdemDeServico) => {
      this.listaOrdemServicos = lista as ListaOrdemDeServico;
      console.log(this.listaOrdemServicos)
    });


  }

}
