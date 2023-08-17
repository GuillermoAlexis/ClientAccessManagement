import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component'; // Asegúrate de que la ruta sea correcta


const routes: Routes = [
  { path: 'dashboard/:idUsuario', component: DashboardComponent },
  { path: 'login', component: LoginComponent }, // Agrega esta línea para la ruta de inicio de sesión
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
