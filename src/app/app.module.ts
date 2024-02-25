import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CesComponent } from './ces/ces.component';
import { TabelaCesComponent } from './ces/tabela-ces/tabela-ces.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from '../material.module';
import { AdicionarClienteComponent } from './cliente/adicionar-cliente/adicionar-cliente.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './core/loading/loading.component';
import { LoginModule } from './login/login.module';
import { AdicionarOrdemServicoComponent } from './ordem-servico/adicionar-ordem-servico/adicionar-ordem-servico.component';
import { OrdemServicoComponent } from './ordem-servico/ordem-servico.component';
import { RegistroComponent } from './registro/registro.component';
import { TokenInterceptor } from './service/interceptors/token.interceptor';
import { AcabamentosModule } from './util/componnent/acabamentos/acabamentos.module';
import { AutoCompleteComponent } from './util/componnent/auto-complete/auto-complete.component';
import { AutocompleteComponent } from './util/componnent/loading/autocomplete/autocomplete.component';
import { AcabamentosChipsComponent } from './util/componnent/acabamentos-chips/acabamentos-chips.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    NavBarComponent,
    CesComponent,
    TabelaCesComponent,
    ClienteComponent,
    AdicionarClienteComponent,
    LoadingComponent,
    OrdemServicoComponent,
    RegistroComponent,
    AdicionarOrdemServicoComponent,
    AutocompleteComponent,
    AutoCompleteComponent,


  ],
  imports: [
    LoginModule,
    AcabamentosModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    AcabamentosChipsComponent,
    RouterModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
