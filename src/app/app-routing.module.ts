import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { HomeComponent } from './components/home/home.component';
import { CrearClientesComponent } from './components/clientes/crear-clientes/crear-clientes.component';
import { DetalleClienteComponent } from './components/clientes/detalle-cliente/detalle-cliente.component';
import { LoginComponent } from './components/usuarios/login/login.component';
import { AuthGuard } from './components/usuarios/guards/auth.guard';
import { RoleGuard } from './components/usuarios/guards/role.guard';


const routes: Routes = [ 
{path: 'home', component: HomeComponent},
{path: 'clientes', component: ClientesComponent},
{path: 'clientes/page/:page', component: ClientesComponent},
{path: 'clientes/form', component: CrearClientesComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
{path: 'clientes/form/:id', component: CrearClientesComponent, canActivate: [AuthGuard, RoleGuard] , data: {role: 'ROLE_ADMIN'}},
{path: 'clientes/detalle/:id', component: DetalleClienteComponent, canActivate: [AuthGuard]},
{path: 'login', component: LoginComponent},

{path: '', pathMatch: 'full', redirectTo: 'home'},
{path: '**', pathMatch: 'full', redirectTo: 'home'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
