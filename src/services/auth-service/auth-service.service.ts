import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  showSuccess() {
    this.toastr.info('Completado', 'Sesion Borrada');
  }
  constructor(private router: Router,private toastr: ToastrService) {
    // Comprobar si el usuario está logueado al iniciar la aplicación
    this.checkLoginStatus();
  }
  // Función para comprobar el estado de inicio de sesión al iniciar la aplicación
  private checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.setLoggedIn(true);
    } else {
      this.setLoggedIn(false);
    }
  }
  setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
  }
  logout(): void {
    localStorage.removeItem('token');
    this.showSuccess()
    this.router.navigate(['/']);
    this.setLoggedIn(false);
  }
  getUserId(): number | null {
    const userId = localStorage.getItem('clienteId');
    return userId ? parseInt(userId, 10) : null;
  }

  // Función para guardar el ID del usuario en el local storage
  setUserId(userId: number): void {
    localStorage.setItem('userId', userId.toString());
  }

  // Función para eliminar el ID del usuario del local storage
  clearUserId(): void {
    localStorage.removeItem('userId');
  }

}
