import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  constructor(private http: HttpClient) { }

  listarPermisos() {
    return this.http.get('http://localhost:9093/AccessManagement-ms/permisos');
  }

  obtenerPermisosPorUsuario(idUsuario: string) {
    return this.http.get('http://localhost:9093/AccessManagement-ms/permisos/usuario/' + idUsuario + '/permisos');
  }
}
