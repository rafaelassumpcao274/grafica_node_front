import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, inject, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AcabamentosService } from 'src/app/service/acabamentos.service';
import { BaseClass } from 'src/app/service/base.service';
import { Acabamentos } from 'src/models/acabamentos';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { TypeChipsEnum } from './type-chips.enum';

@Component({
  selector: 'app-acabamentos-chips',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe],
  templateUrl: './acabamentos-chips.component.html',
  styleUrl: './acabamentos-chips.component.scss',
})
export class AcabamentosChipsComponent extends BaseClass implements OnInit {


  _listaAcabamentos: Array<Acabamentos> = []
  private _announcer = inject(LiveAnnouncer);


  @Input() tiposChip:TypeChipsEnum | undefined;

  @Input() listaAcabamentosAtual: Array<Acabamentos> = []
  @Output() changeListaAcabamentosAtual: EventEmitter<Array<Acabamentos>> = new EventEmitter()

  @Input() listaAcabamentosForm: FormControl = new FormControl("")
  @Output() changelistaAcabamentosForm = new EventEmitter<FormControl>()

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private _acabamentoService: AcabamentosService) {
    super();
  }
  ngOnInit(): void {
    this.obterTodosAcabamentos()
  }


  obterTodosAcabamentos() {

    this._acabamentoService.listarPaginado().subscribe((info: Acabamentos[]) => {
      this._listaAcabamentos = info as Acabamentos[];

    }, (error: any) => {

      this.handleError(error);
      return null;
    });

  }

  remove(acabamento: Acabamentos) {
    const index = this._listaAcabamentos.indexOf(acabamento);

    if (index >= 0) {
      this.listaAcabamentosAtual.splice(index, 1);

      this._announcer.announce(`Removed ${acabamento}`);
    }
  }

  private _ObterIndexAcabamento(acabamento: string): Acabamentos {
    return this._listaAcabamentos.find(it => it.descricao == acabamento) ?? new Acabamentos;
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.listaAcabamentosAtual.push(this._ObterIndexAcabamento(event.option.viewValue));
    // this.fruitInput.nativeElement.value = '';
    this.listaAcabamentosForm.setValue(null);
  }
  add(event: MatChipInputEvent) {
    const value = this._ObterIndexAcabamento(event.value)

    // Add our fruit
    if (value) {
      this.listaAcabamentosAtual.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.listaAcabamentosForm.setValue(null);
  }

}
