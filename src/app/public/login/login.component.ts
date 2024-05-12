import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  loading = false;
  usuarioEmail: string = '';
  usuarioPassword: string = '';

  constructor(private loginService: LoginService) {}

  login() {
    this.loading = true;
    this.loginService.login(this.usuarioEmail, this.usuarioPassword)
      .subscribe(
        response => {
          
          this.loginService.handleLoginResponse(response);
          this.loading = false;
        },
        error => {
          this.loginService.handleError(error);
          this.loading = false;
        }
      );
  }

}
