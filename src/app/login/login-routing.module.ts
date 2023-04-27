import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogarComponent } from './logar/logar.component';
import { LogadoComponent } from './logado/logado.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { 'path':'\logar', component:LogarComponent},
  { 'path':'\logado', component:LogadoComponent},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class LoginRoutingModule { }
