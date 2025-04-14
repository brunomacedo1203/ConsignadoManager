import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClienteListComponent } from './clientes/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';
import { ClienteEditComponent } from './clientes/cliente-edit/cliente-edit.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'clientes', component: ClienteListComponent, canActivate: [authGuard] },
  { path: 'clientes/novo', component: ClienteFormComponent, canActivate: [authGuard] },
  { path: 'clientes/editar/:id', component: ClienteEditComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/dashboard' }
];
