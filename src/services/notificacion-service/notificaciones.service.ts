import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {


  constructor(private http: HttpClient) { }

  obtenerNotificaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/notificaciones`);
  }


}
