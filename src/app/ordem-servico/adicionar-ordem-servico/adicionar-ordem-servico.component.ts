import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AutoCompleteService } from 'src/app/service/auto-complete.service';
import { FormatoService } from 'src/app/service/formato.service';
import { OrdemServicoService } from 'src/app/service/ordem-servico.service';
import { SnackBars } from 'src/app/util/snack-bars';
import { Cliente } from 'src/models/cliente';
import { FiltroCliente } from 'src/models/filtros/filtro-cliente';
import { FiltroFormato } from 'src/models/filtros/filtro-formato';
import { FiltroPapel } from 'src/models/filtros/filtro-papel';
import { Formato } from 'src/models/formato';
import { OrdemDeServico } from 'src/models/ordem-de-servico';
import { Paginator } from 'src/models/Paginator';
import { Papel } from 'src/models/papel';

@Component({
  selector: 'app-adicionar-ordem-servico',
  templateUrl: './adicionar-ordem-servico.component.html',
  styleUrls: ['./adicionar-ordem-servico.component.scss']
})
export class AdicionarOrdemServicoComponent implements OnInit {

  loading: boolean = false;
  loadingAuto: boolean = false;


  listaOrdemServico: OrdemDeServico[] = [];


  listaCliente: Observable<Cliente[]> | undefined;
  listaFormato: Observable<Formato[]> | undefined;
  listaPapel: Observable<Papel[]> | undefined;

  form!: FormGroup;

  id: number = 0;

  clienteForm: FormGroup = Cliente.formCliente();
  data: Date = new Date();


  constructor(private service: OrdemServicoService,
    private autoCompleteService: AutoCompleteService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  info: SnackBars = new SnackBars(this.snackBar);
  pagina: Paginator = new Paginator();


  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id'])
    this.obterform()
    if (this.id > 0) {
      this.service.obterPorId(this.id).subscribe((info) => {
        console.log(info)
        if (info) {
          this.setarForm(info as OrdemDeServico)
        }
      })

    }

  }

  obterFormCliente() {
    this.clienteForm = Cliente.formCliente();
  }

  obterform() {
    this.form = OrdemDeServico.getForm();
  }

  setarForm(os: OrdemDeServico) {
    console.log(this.form)
    this.form.patchValue(os);
    this.form.get('dataPedido')?.patchValue(os.createdAt ?? this.data)
  }


  salvar() {



    this.service.salvar(this.obterOrdemServico()).subscribe(msg => {
      this.info.showSuccess("Salvo com sucesso !! ");
      console.info(msg);
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.info.showMessageError(error)
    });



  }


  obterOrdemServico(): OrdemDeServico {


    let formOrdem: OrdemDeServico = this.form.value



    return formOrdem;
  }

  autoCompleteCliente(evento: any) {
    let obj = evento.target as HTMLInputElement
    if (obj.value.length > 2) {
      let filtro: FiltroCliente = new FiltroCliente();
      filtro.nome_empresa = obj.value
      filtro.paginacao = new Paginator();
            this.listaCliente = this.autoCompleteService.listarCliente(filtro);


    }
  }


  autoCompleteFormato(evento: any) {
    let obj = evento.target as HTMLInputElement
    if (obj.value.length > 0) {
      let filtro: FiltroFormato = new FiltroFormato();
      filtro.descricao_formato = obj.value
      filtro.paginacao = new Paginator();


      this.listaFormato = this.autoCompleteService.listarFormato(filtro);

    }

  }

  autoCompletePapel(evento: any) {
    let obj = evento.target as HTMLInputElement
    if (obj.value.length > 2) {
      let filtro: FiltroPapel = new FiltroPapel();
      filtro.descricao = obj.value
      filtro.paginacao = new Paginator();


      this.listaPapel = this.autoCompleteService.listarPapel(filtro);

    }

  }

}

