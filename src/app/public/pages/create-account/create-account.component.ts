import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private router: Router) {
    // Verificar si hay un token almacenado en el localStorage


  }
  login(){
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
