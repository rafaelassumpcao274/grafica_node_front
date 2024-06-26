import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AutoCompleteService } from 'src/app/service/auto-complete.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { FormatoService } from 'src/app/service/formato.service';
import { OrdemServicoService } from 'src/app/service/ordem-servico.service';
import { PapelService } from 'src/app/service/papel.service';
import { AcabamentosChipsComponent } from 'src/app/util/componnent/acabamentos-chips/acabamentos-chips.component';
import { SnackBars } from 'src/app/util/snack-bars';
import { Acabamentos } from 'src/models/acabamentos';
import { Cliente } from 'src/models/cliente';
import { Formato } from 'src/models/formato';
import { OrdemDeServico } from 'src/models/ordem-de-servico';
import { Paginator } from 'src/models/Paginator';
import { Papel } from 'src/models/papel';

@Component({
  selector: 'app-adicionar-ordem-servico',
  templateUrl: './adicionar-ordem-servico.component.html',
  styleUrls: ['./adicionar-ordem-servico.component.scss'],
})
export class AdicionarOrdemServicoComponent implements OnInit {

  loading: boolean = false;
  loadingAuto: boolean = false;


  listaOrdemServico: OrdemDeServico[] = [];

  listaAcabamentos: Acabamentos[] = [];


  listaCliente: Observable<Cliente[]> | undefined;
  listaFormato: Observable<Formato[]> | undefined;
  listaPapel: Observable<Papel[]> | undefined;

  form!: FormGroup;

  id: number = 0;

  clienteForm: FormGroup = Cliente.formCliente();
  data: Date = new Date();


  constructor(private service: OrdemServicoService,
    private autoCompleteService: AutoCompleteService,
    public clienteService: ClienteService,
    public formatoService: FormatoService,
    public papelService: PapelService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  info: SnackBars = new SnackBars(this.snackBar);
  pagina: Paginator = new Paginator();


  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params['id'])
    this.obterform()
    if (this.id > 0) {
      this.service.obterPorId(this.id).subscribe((info) => {
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

  setarAcabamentos(event: FormControl<Acabamentos[]>) {
    this.form.controls["listaAcabamentos"].patchValue(event)
  }


  obterOrdemServico(): OrdemDeServico {


    let formOrdem: OrdemDeServico = this.form.value
    return formOrdem;
  }




}

