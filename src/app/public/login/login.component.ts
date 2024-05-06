import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  usuarioEmail: string = '';
  usuarioPassword: string = '';

  constructor(private loginService: LoginService) {}

  login() {
    this.loginService.login(this.usuarioEmail, this.usuarioPassword)
      .subscribe(
        response => {
          this.loginService.handleLoginResponse(response);
        },
        error => {
          this.loginService.handleError(error);
        }
      );
  }

}
