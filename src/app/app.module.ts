import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CesComponent } from './ces/ces.component';
import { TabelaCesComponent } from './ces/tabela-ces/tabela-ces.component';
import { ClienteComponent } from './cliente/cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { AdicionarClienteComponent } from './cliente/adicionar-cliente/adicionar-cliente.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MAT_LEGACY_RADIO_DEFAULT_OPTIONS as MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/legacy-radio';
import { LoadingComponent } from './core/loading/loading.component';
import { SnackBars } from './util/snack-bars';
import { OrdemServicoComponent } from './ordem-servico/ordem-servico.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AdicionarOrdemServicoComponent } from './ordem-servico/adicionar-ordem-servico/adicionar-ordem-servico.component';
import { TokenInterceptor } from './service/interceptors/token.interceptor';
import { LogadoComponent } from './login/logado/logado.component';
import { LogarComponent } from './login/logar/logar.component';
import { LoginModule } from './login/login.module';
import { AcabamentosComponent } from './util/componnent/acabamentos/acabamentos.component';
import { AutocompleteComponent } from './util/componnent/loading/autocomplete/autocomplete.component';
import { AcabamentosModule } from './util/componnent/acabamentos/acabamentos.module';
import { AutoCompleteComponent } from './util/componnent/auto-complete/auto-complete.component';



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
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
