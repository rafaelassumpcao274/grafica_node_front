import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CesComponent } from './ces/ces.component';
import { AdicionarClienteComponent } from './cliente/adicionar-cliente/adicionar-cliente.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdicionarOrdemServicoComponent } from './ordem-servico/adicionar-ordem-servico/adicionar-ordem-servico.component';
import { OrdemServicoComponent } from './ordem-servico/ordem-servico.component';
import { RegistroComponent } from './registro/registro.component';
import { UsuarioAutenticadoGuard } from './service/guards/usuario-autenticado.guard';
import { UsuarioNaoAutenticadoGuard } from './service/guards/usuario-nao-autenticado.guard';

const routes: Routes = [
    { 'path':'', component:HomeComponent},
    { 'path':'ces', component:CesComponent,canActivate: [UsuarioAutenticadoGuard]},
    { 'path':'clientes', component:ClienteComponent,canActivate: [UsuarioAutenticadoGuard]},
    { 'path':'cliente', component:AdicionarClienteComponent,canActivate: [UsuarioAutenticadoGuard]},
    { 'path':'cliente/:id', component:AdicionarClienteComponent,canActivate: [UsuarioAutenticadoGuard]},
    { 'path':'ordem-servico/:id', component:AdicionarOrdemServicoComponent,canActivate: [UsuarioAutenticadoGuard]},
    { 'path':'ordens-servicos', component:OrdemServicoComponent,canActivate: [UsuarioAutenticadoGuard]},
    { 'path':'registro', component:RegistroComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
