import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogadoComponent } from './logado/logado.component';
import { LogarComponent } from './logar/logar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { LoginComponent } from './login.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginRoutingModule } from './login-routing.module';





@NgModule({
  declarations: [
    LoginComponent,
    LogadoComponent,
    LogarComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  exports:[
    LoginComponent
  ]
})
export class LoginModule { }
