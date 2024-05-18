import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth-service/auth-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  selectedTheme: string | undefined;

  isLoggedIn = false;
  buttonText!: string;
  userImage: string | null = null;
  userName: string | null = null;
  profileStatusIcon: string | null = null;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (this.isLoggedIn) {
        this.updateUserData();
      } else {
        this.userImage = null;
        this.userName = null;
        this.profileStatusIcon = null;
      }
    });

    // Suscribirse a los cambios en el estado del perfil
    this.authService.profileStatus$.subscribe(() => {
      this.updateProfileStatusIcon();
    });
  }
  private updateUserData() {
    const userData = this.authService.getUserData();
    this.userName = `${userData.nombre}`;
    this.userImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(this.userName)}`;
    this.updateProfileStatusIcon();
  }

  private updateProfileStatusIcon():void {
    const profileIsComplete = localStorage.getItem('profileIsComplete') || 'no';
    this.profileStatusIcon = profileIsComplete === 'si'
      ? 'fa-check-circle' // Icono de check
      : 'fa-exclamation-circle'; // Icono de admiración
  }
  ngOnInit() {
    // Obtener el tema seleccionado del localStorage al cargar la aplicación
    this.selectedTheme = localStorage.getItem('selectedTheme') || 'light'; // Establecer el tema predeterminado como 'light' si no hay ningún tema seleccionado
    this.updateButtonText(this.selectedTheme); // Actualizar el texto del botón al cargar la aplicación
    this.applyTheme(this.selectedTheme); // Aplicar el tema al cargar la aplicación
  }

  changeTheme(theme: string) {
    this.selectedTheme = theme; // Actualizar el tema seleccionado
    localStorage.setItem('selectedTheme', theme); // Guardar el tema seleccionado en localStorage
    this.updateButtonText(theme); // Actualizar el texto del botón al cambiar de tema
    this.applyTheme(theme); // Aplicar el nuevo tema
  }

  private updateButtonText(theme: string) {
    this.buttonText = theme === 'light' ? 'Cambiar a Dark' : 'Cambiar a Light'; // Definir el texto del botón según el tema actual
  }

  private applyTheme(theme: string) {
    const body = document.body as HTMLElement;
    body.setAttribute('data-bs-theme', theme); // Aplicar el tema
  }
  closeDropdowns() {
    // Cerrar todos los dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-menu.show');
    dropdowns.forEach((dropdown: any) => {
      dropdown.classList.remove('show');
    });
  }

  logout(): void {
    // Llamar al método logout() del servicio AuthService
    this.authService.logout();
  }
}
