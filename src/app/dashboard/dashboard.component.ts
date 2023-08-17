import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccesoService } from '../acceso.service';
import { PermisoService } from '../permiso.service';
import { UsuarioService } from '../usuario.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  ultimoAcceso: any = {};
  permisos: any[] = [];
  usuario: any = {};
  private routeSubscription: Subscription | undefined;
  private accesoSubscription: Subscription | undefined;
  private permisosSubscription: Subscription | undefined;
  private usuarioSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private accesoService: AccesoService,
    private permisoService: PermisoService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      const idUsuario = params['idUsuario'];
      this.obtenerUltimoAcceso(idUsuario);
      this.obtenerPermisos(idUsuario);
      this.obtenerUsuario(idUsuario);
    });
  }

  obtenerUltimoAcceso(idUsuario: string) {
    this.accesoSubscription = this.accesoService.obtenerUltimoAcceso(idUsuario).subscribe({
      next: (data: any) => {
        this.ultimoAcceso = data;
      },
      error: error => {
        console.error('Error al obtener último acceso:', error);
      }
    });
  }

  obtenerPermisos(idUsuario: string) {
    this.permisosSubscription = this.permisoService.obtenerPermisosPorUsuario(idUsuario).subscribe({
      next: (data: any) => {
        this.permisos = data;
      },
      error: error => {
        console.error('Error al obtener permisos:', error);
      }
    });
  }
  
  obtenerUsuario(idUsuario: string) {
    this.usuarioSubscription = this.usuarioService.obtenerUsuarioPorId(idUsuario).subscribe({
      next: (data: any) => {
        this.usuario = data;
      },
      error: error => {
        console.error('Error al obtener usuario:', error);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.accesoSubscription) {
      this.accesoSubscription.unsubscribe();
    }
    if (this.permisosSubscription) {
      this.permisosSubscription.unsubscribe();
    }
    if (this.usuarioSubscription) {
      this.usuarioSubscription.unsubscribe();
    }
  }
}
