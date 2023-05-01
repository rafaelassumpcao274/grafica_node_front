import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
import { MyMaskUtil } from 'src/app/util/my-mask';
import { SnackBars } from 'src/app/util/snack-bars';
import { Bairro } from 'src/models/bairro';
import { Cidade } from 'src/models/cidade';
import { Cliente } from 'src/models/cliente';
import { Endereco } from 'src/models/endereco';
import { Uf } from 'src/models/uf';

@Component({
  selector: 'app-adicionar-cliente',
  templateUrl: './adicionar-cliente.component.html',
  styleUrls: ['./adicionar-cliente.component.scss'],
})

export class AdicionarClienteComponent implements OnInit {
  loading = false;


  formCliente!: FormGroup;
  formEmpresa!: FormGroup;
  formEndereco!: FormGroup;
  formBairro!: FormGroup;
  formCidade!: FormGroup;
  formUf!: FormGroup;

  testeCliente!: FormGroup;
  cliente: Cliente = new Cliente();

  id?: number;

  fb!: FormBuilder;
  temCpf = false;

  public phoneValue01: string = '1231234567';
  public phoneValue02: string = '';
  public phoneMask01 = MyMaskUtil.PHONE_MASK_GENERATOR;
  public phoneMask02 = MyMaskUtil.DYNAMIC_PHONE_MASK_GENERATOR;

  constructor(
    private formBuilder: FormBuilder,
    private service: ClienteService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) { }

  info: SnackBars = new SnackBars(this.snackBar);

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.loading = true;
      this.id = params['id'];
      if (this.id && this.id > 0) {

        this.service.obterPorId(this.id).subscribe((msg) => {
          this.inicializarForms();
          this.createForm(msg as Cliente)


          this.loading = false;
        }, (error) => {
          this.loading = false;
          this.info.showMessageError(error)
        });

      } else {

        this.inicializarForms();
        this.loading = false;
      }
    }
    );

    /* this.createForm(new Cliente()); */
  }

  inicializarForms():void{
    this.formCliente = Cliente.formCliente();
    this.formEndereco = Endereco.formEndereco();
    this.formBairro = Bairro.formBairro();
    this.formCidade = Cidade.formCidade();
    this.formUf = Uf.formUf();
  }

  createForm(cliente: Cliente) {
    this.formCliente = this.converterEmForm(cliente, this.formCliente)
    this.formEndereco = this.converterEmForm(cliente.endereco, this.formEndereco)
    this.formBairro = this.converterEmForm(cliente.endereco?.bairro, this.formBairro)
    this.formCidade = this.converterEmForm(cliente.endereco?.bairro?.cidade, this.formCidade)
    this.formUf = this.converterEmForm(cliente.endereco?.bairro?.cidade?.uf, this.formUf)

  }

  converterEmForm(valor: any, form: FormGroup): FormGroup {

    for (const key in valor) {
      if (Object.prototype.hasOwnProperty.call(form.controls, key)) {
        form.controls[key].patchValue(valor[key]);
      }
    }


    return form;
  }

  obterCliente(): Cliente {
    let cliente = this.formCliente.value as Cliente;
    let endereco = this.formEndereco.value as Endereco;
    let bairro = this.formBairro.value as Bairro;
    let cidade = this.formCidade.value as Cidade;
    let uf = this.formUf.value as Uf;

    cidade.uf = uf;
    bairro.cidade = cidade;
    endereco.bairro = bairro;
    cliente.endereco = endereco;

    return cliente;
  }


  excluir() {


  }

  onSubmit() {
    // aqui você pode implementar a logica para fazer seu formulário salvar

    let cliente: Cliente = this.obterCliente();

    this.loading = true;

    this.service.salvar(cliente).subscribe((msg) => {
      this.info.showSuccess("Salvo com sucesso !! ");
      console.info(msg);
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.info.showMessageError(error)
    });

    // Usar o método reset para limpar os controles na tela
    //this.formCliente.reset(new Cliente());
  }
}
