import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AcabamentosService } from 'src/app/service/acabamentos.service';
import { BaseClass } from 'src/app/service/base.service';
import { Acabamentos } from 'src/models/acabamentos';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgForOf, NgIf } from '@angular/common';
import { MatselectComponent } from "../loading/matselect/matselect.component";

@Component({
    selector: 'app-acabamentos',
    templateUrl: './acabamentos.component.html',
    styleUrls: ['./acabamentos.component.scss'],
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule, NgIf, NgForOf, FormsModule, ReactiveFormsModule, MatselectComponent]
})
export class AcabamentosComponent extends BaseClass {
  loading: boolean = false;

  _formAcabamentos = Acabamentos.formAcabamentos();
  _listaAcabamentos: Acabamentos[] = new Array<Acabamentos>;
  _listaAcabamentosSelecionados: Acabamentos[] = new Array<Acabamentos>;

  @Input()
  public set acabamentos(listaAcabamentos: Array<Acabamentos> | null) {
    this.loading = true;
    this.obterTodosAcabamentos();
    if (listaAcabamentos && listaAcabamentos.length > 0) {
      this._listaAcabamentos = listaAcabamentos;
      //  this._formAcabamentos.setValue(this._listaAcabamentos);
    }
    this.loading = false;
  }

  constructor(private _acabamentoService:AcabamentosService) {
    super();
  }


  obterTodosAcabamentos() {
    this.loading = true

    this._acabamentoService.listarPaginado().subscribe((info) => {
      this._listaAcabamentos = info as Acabamentos[];
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.handleError(error);
      return null;
    });

  }
}
