import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  constructor(private http: HttpClient) { }

  registrarAcceso(idUsuario: string) {
    const acceso = {
      idAcceso: null,
      usuario: {
        idUsuario: idUsuario,
        nombreCompleto: '', 
        email: '', 
        contrasena: '' 
      },
      fecha: new Date()
    };
  
    return this.http.post('http://localhost:9093/AccessManagement-ms/accesos', acceso);
  }

  obtenerUltimoAcceso(idUsuario: string) {
    return this.http.get('http://localhost:9093/AccessManagement-ms/accesos/ultimo/' + idUsuario);
  }

}
