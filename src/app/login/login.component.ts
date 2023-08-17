import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { AccesoService } from '../acceso.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  contrasena!: string;
  private loginSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private accesoService: AccesoService
  ) { }

  login() {
    this.loginSubscription = this.usuarioService.login(this.email, this.contrasena).subscribe({
      next: (data: any) => {
        console.log(data);

        if (data.idUsuario) {
          this.registrarAcceso(data.idUsuario);
        } else {
          console.error('No se pudo obtener el idUsuario.');
        }
      },
      error: error => {
        console.error(error);
      }
    });
  }

  registrarAcceso(idUsuario: string) {
    this.accesoService.registrarAcceso(idUsuario).subscribe({
      next: (data: any) => {
        console.log('Acceso registrado:', data);

        // Redirigir al dashboard
        this.router.navigate(['/dashboard', idUsuario]);
      },
      error: error => {
        console.error('Error al registrar acceso:', error);
      }
    });
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
