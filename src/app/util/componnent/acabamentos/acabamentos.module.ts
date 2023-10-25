import { EventEmitter, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcabamentosComponent } from './acabamentos.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatselectModule } from '../loading/matselect/matselect.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AcabamentosComponent,
    MatselectModule,
    MatProgressSpinnerModule
  ],exports:[
    AcabamentosComponent
  ]
})
export class AcabamentosModule { }
