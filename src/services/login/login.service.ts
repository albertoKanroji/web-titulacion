import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth-service/auth-service.service';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  getCustomerData(clienteId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/usuarios/customer-data?clienteId=${clienteId}`);
  }
  login(usuarioEmail: string, usuarioPassword: string) {
    const formData = {
      correo: usuarioEmail,
      password: usuarioPassword,
    };

    return this.http.post<any>(
      `${environment.apiUrl}/usuarios/login`,
      formData
    );
  }

  handleLoginResponse(response: any) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('clienteNombre', response.data.cliente.nombre);
    localStorage.setItem('clienteEmail', response.data.cliente.correo);
    localStorage.setItem('clienteId', response.data.cliente.id.toString());
    localStorage.setItem('profileIsComplete', response.data.cliente.profileIsComplete);
    localStorage.setItem(
      'clienteApellidoPaterno',
      response.data.cliente.apellido
    );
    this.authService.setLoggedIn(true);
    this.router.navigate(['/']);
  }

  handleError(error: any) {
    console.error('Error al iniciar sesión:', error);
  }

  logout() {
    this.authService.logout();

  }
}
