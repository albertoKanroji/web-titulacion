import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  selectedTheme: string | undefined;

  isLoggedIn = localStorage.getItem('isLoggedIn');
  buttonText!: string;
  constructor(private router: Router) {
    // Verificar si hay un token almacenado en el localStorage
    const token = localStorage.getItem('token');
    //const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Verificar si hay un token
    if (token != null) {
      // Si hay un token, el usuario ha iniciado sesión
      this.isLoggedIn = 'true';
    } else {
      // Si no hay un token, el usuario no ha iniciado sesión
      this.isLoggedIn = 'false';
    }
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
    // Limpiar datos del localStorage
    localStorage.removeItem('isLoggedIn');
    // Cambiar el estado de inicio de sesión a 'false'
    this.isLoggedIn = 'false';
    localStorage.clear();
    this.isLoggedIn = 'false';
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
