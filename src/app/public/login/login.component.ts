import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  loading = false;
  usuarioEmail: string = '';
  usuarioPassword: string = '';

  constructor(private loginService: LoginService,private toastr: ToastrService) {}
  showSuccess() {
    this.toastr.success('Completado', 'Incio de sesion Exitoso');
  }
  showError() {
    this.toastr.error('Error', 'Credenciales incorrectas');
  }
  login() {
    this.loading = true;
    this.loginService.login(this.usuarioEmail, this.usuarioPassword)
      .subscribe(
        response => {
          this.loginService.handleLoginResponse(response);
          this.loading = false;
          this.showSuccess()
        },
        error => {
          this.loginService.handleError(error);
          this.loading = false;
          this.showError()
        }
      );
  }

}
