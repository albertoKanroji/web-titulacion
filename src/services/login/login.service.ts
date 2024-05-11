import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(usuarioEmail: string, usuarioPassword: string) {
    const formData = {
      correo: usuarioEmail,
      password: usuarioPassword
    };

    return this.http.post<any>(`${environment.apiUrlProd}/usuarios/login`, formData);
  }

  handleLoginResponse(response: any) {
    // Guarda la sesión en el localStorage
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('clienteNombre', response.data.cliente.nombre);
    localStorage.setItem('clienteEmail', response.data.cliente.correo);
    localStorage.setItem('clienteId', response.data.cliente.id.toString());
    localStorage.setItem('clienteApellidoPaterno', response.data.cliente.apellido);
    // Redirige al usuario a la página de noticias después del inicio de sesión exitoso
    this.router.navigate(['/classes']);
  }

  handleError(error: any) {
    console.error('Error al iniciar sesión:', error);
    // Aquí puedes mostrar un mensaje de error al usuario si el inicio de sesión falla
  }
}
