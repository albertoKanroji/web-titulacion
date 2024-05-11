import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rutina } from 'src/interfaces/Rutinas';

@Injectable({
  providedIn: 'root'
})
export class MisRutinasService {

 

  constructor(private http: HttpClient) { }

  obtenerRutinas(): Observable<Rutina[]> {
    return this.http.get<Rutina[]>(`${environment.apiUrl}/rutinas/`);
  }
}
