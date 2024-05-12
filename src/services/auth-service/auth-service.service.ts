import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private router: Router,) { }

  setLoggedIn(value: boolean): void {
    this.isLoggedInSubject.next(value);
  }
  logout(): void {
    localStorage.removeItem('token'); 
    this.router.navigate(['/']);
    this.setLoggedIn(false);
  }
 
}
