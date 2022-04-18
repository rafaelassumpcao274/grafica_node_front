import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CesComponent } from './ces/ces.component';
import { TabelaCesComponent } from './ces/tabela-ces/tabela-ces.component';
import { ClienteComponent } from './cliente/cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialExampleModule} from '../material.module';
import {MatNativeDateModule} from '@angular/material/core';
import { AdicionarClienteComponent } from './cliente/adicionar-cliente/adicionar-cliente.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { LoadingComponent } from './core/loading/loading.component';



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
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }