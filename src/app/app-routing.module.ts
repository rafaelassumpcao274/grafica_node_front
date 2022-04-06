import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CesComponent } from './ces/ces.component';
import { AdicionarClienteComponent } from './cliente/adicionar-cliente/adicionar-cliente.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const routes: Routes = [
    { 'path':'', component:HomeComponent},
    { 'path':'ces', component:CesComponent},
    { 'path':'cliente', component:ClienteComponent},
    { 'path':'cliente/adicionar-cliente', component:AdicionarClienteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
