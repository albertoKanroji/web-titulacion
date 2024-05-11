import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrearCuentaService } from 'src/services/crear-cuenta/crear-cuenta.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  loading = false;
  nombre: string = '';
  apellido1: string = '';
  apellido2: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';

  constructor(private crearCuentaService: CrearCuentaService, private router: Router) {}

  login() {
    this.router.navigate(['/login']);
  }

  crearCuenta() {
    if (this.contrasena !== this.confirmarContrasena) {
      // Manejar la situación donde las contraseñas no coinciden
      return;
    }
    
    this.loading = true;
    this.crearCuentaService.crearCuenta(this.nombre, this.apellido1, this.apellido2, this.correo, this.contrasena)
      .subscribe(
        response => {
          this.crearCuentaService.handleCrearCuentaResponse(response);
          this.loading = false;
          this.router.navigate(['/login']);
        },
        error => {
          this.crearCuentaService.handleError(error);
          this.loading = false;
        }
      );
  }

}
