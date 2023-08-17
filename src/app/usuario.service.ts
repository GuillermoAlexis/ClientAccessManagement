import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  login(email: string, contrasena: string) {
    const params = new HttpParams()
      .set('email', email)
      .set('contrasena', contrasena);

    return this.http.post('http://localhost:9093/AccessManagement-ms/usuarios/login', params);
  }

  obtenerUsuarioPorId(idUsuario: string) {
    return this.http.get('http://localhost:9093/AccessManagement-ms/usuarios/' + idUsuario);
  }
}
