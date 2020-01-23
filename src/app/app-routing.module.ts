import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { HomeComponent } from './components/home/home.component';
import { CrearClientesComponent } from './components/clientes/crear-clientes/crear-clientes.component';
import { DetalleClienteComponent } from './components/clientes/detalle-cliente/detalle-cliente.component';


const routes: Routes = [ 
{path: 'home', component: HomeComponent},
{path: 'clientes', component: ClientesComponent},
{path: 'clientes/page/:page', component: ClientesComponent},
{path: 'clientes/form', component: CrearClientesComponent},
{path: 'clientes/form/:id', component: CrearClientesComponent},
{path: 'clientes/detalle/:id', component: DetalleClienteComponent},

{path: '', pathMatch: 'full', redirectTo: 'home'},
{path: '**', pathMatch: 'full', redirectTo: 'home'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
