import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';
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
  formEmpresa!:FormGroup;
  formEndereco!:FormGroup;
  formBairro!:FormGroup;
  formCidade!:FormGroup;
  formUf!:FormGroup;

  testeCliente!: FormGroup;
  cliente:Cliente = new Cliente();

  id?: number;

  fb!: FormBuilder;
  temCpf = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ClienteService,
    private snackBar:MatSnackBar,
    private route: ActivatedRoute,
  ) {}

    info:SnackBars = new SnackBars(this.snackBar);

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      console.info(params);
      this.id = params['id'];
      if(this.id && this.id>0){

        this.service.obterPorId(this.id).subscribe((msg) =>{
            this.createForm(msg as Cliente)
            this.loading = false;
        },(error)=>{
          this.loading = false;
          this.info.showMessageError(error)
        });

      }
    });

    this.formCliente = Cliente.formCliente();
    this.formEndereco = Endereco.formEndereco();
    this.formBairro = Bairro.formBairro();
    this.formCidade = Cidade.formCidade();
    this.formUf = Uf.formUf();

    /* this.createForm(new Cliente()); */
  }

     createForm(cliente:Cliente) {
        this.formCliente.patchValue(cliente)
        this.formEndereco.patchValue(cliente.endereco as Endereco);
        this.formBairro.patchValue(cliente.endereco?.bairro as Bairro);
        this.formCidade.patchValue(cliente.endereco?.bairro?.cidade as Cidade);
        this.formUf.patchValue(cliente.endereco?.bairro?.cidade?.uf as Uf);

    }

  obterCliente(): Cliente{
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


  excluir(){
    

  }

  onSubmit() {
    // aqui você pode implementar a logica para fazer seu formulário salvar

    let cliente:Cliente = this.obterCliente();

    cliente.telefone = 0;
    this.loading = true;

    this.service.salvar(cliente).subscribe((msg) =>{
      this.info.showSuccess("Salvo com sucesso !! ");
        console.info(msg);
        this.loading = false;
    },(error)=>{
      this.loading = false;
      this.info.showMessageError(error)
    });

    // Usar o método reset para limpar os controles na tela
    //this.formCliente.reset(new Cliente());
  }
}
