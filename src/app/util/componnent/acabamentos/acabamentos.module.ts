import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatselectModule } from '../loading/matselect/matselect.module';
import { AcabamentosComponent } from './acabamentos.component';




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
