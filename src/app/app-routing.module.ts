import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CesComponent } from './ces/ces.component';
import { AdicionarClienteComponent } from './cliente/adicionar-cliente/adicionar-cliente.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HomeComponent } from './home/home.component';
import { AdicionarOrdemServicoComponent } from './ordem-servico/adicionar-ordem-servico/adicionar-ordem-servico.component';
import { OrdemServicoComponent } from './ordem-servico/ordem-servico.component';
import { RegistroComponent } from './registro/registro.component';
import { UsuarioAutenticadoGuard } from './service/guards/usuario-autenticado.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ces', component: CesComponent},
  { path: 'clientes', component: ClienteComponent },
  { path: 'cliente', component: AdicionarClienteComponent },
  { path: 'cliente/:id', component: AdicionarClienteComponent },
  { path: 'ordem-servico/:id', component: AdicionarOrdemServicoComponent },
  { path: 'ordens-servicos', component: OrdemServicoComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: '' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
