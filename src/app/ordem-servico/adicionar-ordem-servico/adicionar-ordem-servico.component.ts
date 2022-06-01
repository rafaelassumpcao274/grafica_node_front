import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FormatoService } from 'src/app/service/formato.service';
import { OrdemServicoService } from 'src/app/service/ordem-servico.service';
import { SnackBars } from 'src/app/util/snack-bars';
import { Formato } from 'src/models/formato';
import { OrdemDeServico } from 'src/models/ordem-de-servico';
import { Paginator } from 'src/models/Paginator';

@Component({
  selector: 'app-adicionar-ordem-servico',
  templateUrl: './adicionar-ordem-servico.component.html',
  styleUrls: ['./adicionar-ordem-servico.component.scss']
})
export class AdicionarOrdemServicoComponent implements OnInit {

  loading:boolean = false;
  listaOrdemServico:OrdemDeServico[] =[];
  listaFormatos: Formato[] = [];

  form!: FormGroup;

  id:number =0;


  constructor(private service: OrdemServicoService,
    private serviceFormato: FormatoService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

    info:SnackBars = new SnackBars(this.snackBar);
    pagina:Paginator = new Paginator();


   ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id'])
    this.obterform()


    if(this.id>0){
      this.service.obterPorId(this.id).subscribe((info) =>{
        console.log(info)
        if(info){
          this.setarForm(info as OrdemDeServico)
        }
      },
      (err)=>{

      })

    }

   }

   obterform(){
     this.form = OrdemDeServico.getForm();
   }

   setarForm(os:OrdemDeServico){
     console.log(this.form)
      this.form.patchValue(os);
      this.form.get('dataPedido')?.patchValue(os.createdAt ?? new Date())
   }

   listar(){

   }
}
