import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { ClienteService } from 'src/app/service/cliente.service';
import { ClientesService } from 'src/app/service/clientes.service';
import { Cliente } from 'src/models/cliente';
import { Endereco } from 'src/models/endereco';
import { ClienteComponent } from '../cliente.component';

@Component({
  selector: 'app-adicionar-cliente',
  templateUrl: './adicionar-cliente.component.html',
  styleUrls: ['./adicionar-cliente.component.scss'],
})
export class AdicionarClienteComponent implements OnInit {
  loading = false;

  formCliente!: FormGroup;

  testeCliente!: FormGroup;

  fb!: FormBuilder;
  temCpf = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ClientesService
  ) {}

  ngOnInit(): void {
    this.formCliente = Cliente.formCliente();

    /* this.createForm(new Cliente()); */
  }

  /*   createForm(cliente:Cliente) {

      this.formCliente = this.formBuilder.group({
        nome_empresa: [cliente.nome_empresa],
        razao_social:[cliente.razao_social],
        cnpj:[cliente.cnpj],
        email:[cliente.email],
        temCpf: [this.temCpf],
        contato:[cliente.contato],
        telefone:[cliente.telefone],
        aliases: this.fb.array([
          this.fb.control('')
        ])
      })
    }
    get aliases() {
      return this.formCliente.get('aliases') as FormArray;
    }

    addAlias() {
      this.aliases.push(this.fb.control(''));
    }

   */
  onSubmit() {
    // aqui você pode implementar a logica para fazer seu formulário salvar
    let cliente = this.formCliente.value as Cliente;
    cliente.telefone = 0;
    console.info(cliente);
    this.loading = true;
    this.service.salvar(cliente).subscribe();
    // Usar o método reset para limpar os controles na tela
    //this.formCliente.reset(new Cliente());
  }
}
